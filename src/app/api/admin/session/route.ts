// src/app/api/admin/session/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { pass } = await req.json().catch(() => ({}));
  if (!pass || pass !== process.env.ADMIN_PASS) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin_pass", pass, {
    httpOnly: false, // نخليها false عشان تقدر تشوفها في المتصفح لو احتجت
    path: "/",
    maxAge: 60 * 60 * 24 * 3, // 3 أيام
  });
  return res;
}
