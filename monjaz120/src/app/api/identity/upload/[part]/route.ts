import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// upload handler skeleton
export async function POST(req: Request, context: any) {
  try {
    // params.part => 'front' | 'back' | 'selfie'
    const part = context.params.part;
    // implement: validate sessionId, file, scan, store in S3, create DB record
    return NextResponse.json({ ok:true, part });
  } catch (e) {
    return NextResponse.json({ ok:false, message: (e as Error).message }, { status:500 });
  }
}