import { NextResponse } from 'next/server';

// قراءة حالة جلسة التوثيق
export async function GET(req: Request, { params }: { params: any }) {
  const sessionId = params.sessionId;
  // read from DB IdentitySession where id = sessionId
  return NextResponse.json({ ok:true, sessionId, status:'pending' });
}