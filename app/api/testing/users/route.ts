import { db } from "@/db";
import { users } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (req: NextRequest) => {
  try {
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json(
        { error: "This endpoint is not available in production" },
        { status: 403 },
      );
    }

    const body = await req.json();
    const { username, password, name } = body;

    if (!username || !password || !name) {
      return NextResponse.json(
        { error: "Username, name, and password are required" },
        { status: 400 },
      );
    }

    const hash = await bcrypt.hash(password, 10);

    const [user] = await db
      .insert(users)
      .values({
        username,
        name,
        passwordHash: hash,
      })
      .returning();

    return NextResponse.json(
      { user, message: "User has been added to database", success: true },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating test user:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create user" },
      { status: 500 },
    );
  }
};
