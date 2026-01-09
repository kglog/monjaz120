import { NextResponse } from 'next/server';

// يشغّل عملية التحقق الآلي (OCR + face match) على جلسة معينة
export async function POST(req: Request) {
  // body: { sessionId }
  // enqueue job / call OCR service / face-match / update DB
  return NextResponse.json({ ok:true });
}