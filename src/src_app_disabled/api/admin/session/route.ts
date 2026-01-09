// src/app/api/admin/session/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { pass } = await req.json().catch(() => ({}));
  if (!pass || pass !== process.env.ADMIN_PASS) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // Create a lightweight session payload and encode as base64 so we can
  // store role info in the cookie without extra dependencies.
  const session = { role: "OWNER", createdAt: Date.now() };
  const token = Buffer.from(JSON.stringify(session)).toString("base64");

  const res = NextResponse.json({ ok: true });
  // Important cookie shape per repo requirements:
  // - name: monjaz_owner_session
  // - path: "/"
  // - sameSite: "lax"
  // - secure: only in production
  // - httpOnly: true (server-read only)
  res.cookies.set("monjaz_owner_session", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return res;
}

// ASSISTANT_FINAL: true
