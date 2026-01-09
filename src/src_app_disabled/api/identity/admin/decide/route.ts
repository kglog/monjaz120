import { NextResponse } from 'next/server';

// endpoint اداري لقبول/رفض جلسة بعد المراجعة اليدوية
export async function POST(req: Request) {
  // body: { sessionId, action: 'approve'|'reject', note }
  return NextResponse.json({ ok:true });
}