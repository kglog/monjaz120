import { NextResponse } from 'next/server';

// استقبال نتائج OCR من خدمة خارجية (اختياري)
export async function POST(req: Request) {
  // body: { sessionId, ocrResult }
  return NextResponse.json({ ok:true });
}