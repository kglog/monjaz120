import { NextResponse } from "next/server";
import { getUserVerificationStatus } from "@/lib/identity/status";

export async function GET(req: Request) {
  try {
    const uid = req.headers.get("x-user-id") || "";
    if (!uid) return NextResponse.json({ ok: false, error: "no_user_id" }, { status: 400 });

    const status = await getUserVerificationStatus(uid);

    return NextResponse.json({ ok: true, status });
  } catch (e) {
    console.error("from-identity error", e);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}

// ASSISTANT_FINAL: true
