// src/app/api/owner/logout/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const COOKIE_NAME = process.env.OWNER_COOKIE_NAME || "owner_session";

function nuke(name: string) {
  const c = cookies();
  // تنظيف قوي (عشان اختلاف path يسبب “يطلع لك كأنك مو مسجل”)
  c.set(name, "", { path: "/", expires: new Date(0) });
  c.set(name, "", { path: "/owner", expires: new Date(0) });
}

export async function GET(req: Request) {
  nuke(COOKIE_NAME);
  nuke("owner_name");
  return NextResponse.redirect(new URL("/owner/login", req.url));
}

export async function POST() {
  nuke(COOKIE_NAME);
  nuke("owner_name");
  return NextResponse.json({ ok: true });
}

// ASSISTANT_FINAL: true
