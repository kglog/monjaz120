import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

// يبدأ جلسة توثيق بسيطة ويرجع sessionId
export async function POST(req: Request) {
  const sessionId = uuidv4();
  // هنا تسجل في DB: IdentitySession.create({ id: sessionId, userId, ... })
  return NextResponse.json({ ok:true, sessionId });
}