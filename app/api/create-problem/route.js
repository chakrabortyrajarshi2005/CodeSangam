import getJudge0LanguageID from "@/lib/judge0";
import { currentUserRole } from "@/modules/auth/actions";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default async function POST(request) {
  try {
    const userRole = await currentUserRole();
    const user = await currentUser();

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
    }
  } catch (error) {}
}
