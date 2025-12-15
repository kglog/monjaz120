import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { OWNER_COOKIE, ownerVerifyToken } from "@/lib/owner/auth";
import { getAllFlags, setFlag } from "@/lib/owner/flags";

function requireOwner() {
  const token = cookies().get(OWNER_COOKIE)?.value || "";
  const ok = ownerVerifyToken(token);
  if (!ok) return null;
  return ok;
}

export async function GET() {
  if (!requireOwner()) return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  return NextResponse.json({ ok: true, flags: getAllFlags() });
}

export async function PATCH(req: Request) {
  if (!requireOwner()) return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const key = String(body?.key || "");
  const enabled = body?.enabled;
  const mode = body?.mode;

  const updated = setFlag(key, {
    ...(typeof enabled === "boolean" ? { enabled } : {}),
    ...(mode === "auto" || mode === "manual" ? { mode } : {}),
  });

  return NextResponse.json({ ok: true, updated });
}

// ASSISTANT_FINAL: true
