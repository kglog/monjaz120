import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const gid = process.env.GOOGLE_CLIENT_ID || null;
    const msid = process.env.MICROSOFT_CLIENT_ID || null;
    return NextResponse.json({
      googleConfigured: !!gid,
      googleHint: gid ? `${gid.slice(0,6)}...` : null,
      microsoftConfigured: !!msid,
      microsoftHint: msid ? `${msid.slice(0,6)}...` : null,
    });
  } catch (e) {
    return NextResponse.json({ googleConfigured: false, microsoftConfigured: false });
  }
}
