// src/app/api/owner/login/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";

const COOKIE_NAME = "monaza_owner";
const TTL_MS = 1000 * 60 * 60 * 24 * 7;

function b64url(buf: Buffer) {
  return buf.toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}
function sign(data: string, secret: string) {
  return b64url(crypto.createHmac("sha256", secret).update(data).digest());
}
function issueOwnerToken(username: string) {
  const secret = process.env.OWNER_SESSION_SECRET || "dev-secret";
  const session = { u: username, exp: Date.now() + TTL_MS };
  const payload = b64url(Buffer.from(JSON.stringify(session), "utf8"));
  const sig = sign(payload, secret);
  return `${payload}.${sig}`;
}

export async function POST(req: Request) {
  const ct = req.headers.get("content-type") || "";
  let username = "";
  let password = "";
  let returnTo = "/owner";

  if (ct.includes("application/json")) {
    const body = await req.json().catch(() => ({}));
    username = String(body?.username || "").trim();
    password = String(body?.password || "");
    returnTo = String(body?.returnTo || "/owner") || "/owner";
  } else {
    const fd = await req.formData().catch(() => null);
    username = String(fd?.get("username") || "").trim();
    password = String(fd?.get("password") || "");
    returnTo = String(fd?.get("returnTo") || "/owner") || "/owner";
  }

  const u = process.env.OWNER_USERNAME || "omar";
  const p = process.env.OWNER_PASSWORD || "Omar@12345";

  if (username !== u || password !== p) {
    const back = new URL("/owner/login", req.url);
    back.searchParams.set("e", "1");
    back.searchParams.set("returnTo", returnTo);
    return NextResponse.redirect(back);
  }

  const token = issueOwnerToken(username);
  const url = new URL(returnTo, req.url);
  const res = NextResponse.redirect(url);

  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: Math.floor(TTL_MS / 1000),
  });

  // ضع اسم المالك في كوكي منفصل لعرض الشارة داخل واجهة المالك
  if (username) {
    res.cookies.set("owner_name", String(username), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: Math.floor(TTL_MS / 1000),
    });
  }

  return res;
}

// ASSISTANT_FINAL: true

// ASSISTANT_FINAL: true
