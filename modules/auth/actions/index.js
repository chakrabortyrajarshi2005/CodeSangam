"use server";

import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export const userOnBoard = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return {
        success: false,
        error: "User is not authenticated",
      };
    }

    const { id, firstName, lastName, imageUrl, emailAddresses } = user;
    const email = emailAddresses[0]?.emailAddress || "";
    const newUser = await db.user.upsert({
      where: {
        clerkId: id,
      },
      update: {
        firstName: firstName || null,
        lastName: lastName || null,
        imageUrl: imageUrl || null,
        email,
      },
      create: {
        clerkId: id,
        firstName: firstName || null,
        lastName: lastName || null,
        imageUrl: imageUrl || null,
        email,
      },
    });
    return {
      success: true,
      user: newUser,
      message: "New user onboarded and inserted into DB",
    };
  } catch (error) {
    console.log("Error in user onboarding:", error);
    return {
      success: false,
      error: "Failed to onboard user",
    };
  }
};

export const currentUserRole = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return {
        success: false,
        error: "User is not authenticated",
      };
    }

    const { id } = user;
    const userRole = await db.user.findUnique({
      where: {
        clerkId: id,
      },
      select: {
        role: true,
      },
    });
    return userRole.role;
  } catch (error) {
    console.log("Error in user-admin switching between roles:", error);

    return {
      success: false,
      error: "Failed to switching roles between user and admin",
    };
  }
};
