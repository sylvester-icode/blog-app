"use server";

import { auth } from "@/auth"; // Point to your centralized auth.ts configuration file
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import crypto from "crypto";


export async function generateApiToken() {
  // 1. Get the current active login session
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized access.");
  }

  const userId = parseInt(session.user.id, 10);

  // 2. Generate a sufficiently random string using crypto.randomUUID()
  const randomTokenString = crypto.randomUUID();

  // 3. Save the token string directly into your local database
  await db
    .update(users)
    .set({ token: randomTokenString })
    .where(eq(users.id, userId));

  // 4. Revalidate the profile page to clear any cached layout details
  revalidatePath("/me");
}
