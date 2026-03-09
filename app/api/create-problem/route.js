import getJudge0LanguageID, {
  pollBatchResults,
  submitBatch,
} from "@/lib/judge0";
import { currentUserRole, getCurrentUser } from "@/modules/auth/actions";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import {UserRole} from '@prisma/client'
export default async function POST(request) {
  try {
    const userRole = await currentUserRole();
    const user = await getCurrentUser();

    if (userRole !== UserRole.ADMIN) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      title,
      description,
      difficulty,
      tags,
      examples,
      constrains,
      testcases,
      codesnippets,
      referencesolutions,
    } = body;

    if (
      !title ||
      !description ||
      !difficulty ||
      !referencesolutions ||
      !testcases ||
      !codesnippets
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    if (!Array.isArray(testcases) || testcases.length === 0) {
      return NextResponse.json(
        { error: "Testcases are unavailable" },
        { status: 400 },
      );
    }

    if (!referencesolutions || typeof referencesolutions !== "object") {
      return NextResponse.json(
        {
          error:
            "Reference Solutions should be there with each supported languages",
        },
        { status: 400 },
      );
    }

    for (const [language, solutionCode] of object.entries(referencesolutions)) {
      const languageID = getJudge0LanguageID();
      if (!languageID) {
        return NextResponse.json(
          {
            error: `language ${language} is not supported in this system`,
          },
          { status: 400 },
        );
      }

      const submission = testcases.map((input, output) => ({
        source_code: solutionCode,
        language_id: languageID,
        stdin: input,
        expected_output: output,
      }));

      const submissionResult = await submitBatch(submission);
      const tokens = submissionResult.map((res) => {
        res.token;
      });

      const result = await pollBatchResults(tokens);
      for (let i = 0; i < result.length; i++) {
        const currentResult = result[i];
        if (currentResult.status.id !== 3) {
          return NextResponse.json(
            {
              error: `Validation failed for ${language}`,
              testCase: {
                input: submissions[i].stdin,
                expectedOutput: submissions[i].expected_output,
                actualOutput: result.stdout,
                error: result.stderr || result.compile_output,
              },
              details: result,
            },
            { status: 400 },
          );
        }
      }
    }

    const newlyCreatedProblem = await db.problem.create({
      data: {
        title,
        description,
        difficulty,
        tags,
        examples,
        constrains,
        testcases,
        codesnippets,
        referencesolutions,
        userId: user.id,
      },
    });
    return NextResponse.json(
      {
        success: true,
        message: "Problem created successfully",
        data: newlyCreatedProblem,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(
      `Database Problem to same the newly created problem --> ${error}`,
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create new problem to the postgres database",
      },
      { status: 500 },
    );
  }
}
