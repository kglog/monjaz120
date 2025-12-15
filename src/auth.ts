import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function auth() {
  try {
    const session = await getServerSession(authOptions as any);
    return session as any;
  } catch (e) {
    return null;
  }
}

// ASSISTANT_FINAL: true
