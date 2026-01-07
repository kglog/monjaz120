import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const uid = req.headers.get('x-user-id') || null;
    const file = path.join(process.cwd(), 'data', 'verifications-state.json');
    const raw = await fs.promises.readFile(file, 'utf8').catch(()=> '{}');
    const state = JSON.parse(raw || '{}');
    if (!uid) return NextResponse.json({ ok:true, status: null });
    const entry = state[uid] || null;
    return NextResponse.json({ ok:true, status: entry });
  } catch (e) {
    console.error('verify-status error', e);
    return NextResponse.json({ ok:false, error: 'server_error' }, { status:500 });
  }
}

// ASSISTANT_FINAL: true
