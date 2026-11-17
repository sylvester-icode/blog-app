import { NextResponse } from "next/server";
import { readingList, blogs, users } from "@/db/schema";
import { db } from "@/db";

export const DELETE = async () => {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is not available in production" },
      { status: 403 },
    );
  }

  try {
    await db.delete(readingList);
    await db.delete(blogs);
    await db.delete(users);

    return NextResponse.json({
      success: true,
      message: "The tables have been deleted",
    });
  } catch (error) {
    console.error("Reset database failed:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    );
  }
};
