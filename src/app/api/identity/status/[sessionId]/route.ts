import { NextResponse } from "next/server";

// قراءة حالة جلسة التوثيق
export async function GET(
  req: Request,
  { params }: { params: { sessionId: string } }
) {
  const sessionId = params.sessionId;
  return NextResponse.json({ ok: true, sessionId, status: "pending" });
}
