import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const storePath = path.join(process.cwd(), 'data', 'design-logos.json');
    const raw = await fs.readFile(storePath, 'utf8').catch(() => '[]');
    const arr = JSON.parse(raw || '[]');
    return NextResponse.json({ ok: true, items: arr });
  } catch (err) {
    console.error('gallery error', err);
    return NextResponse.json({ ok: false, items: [] }, { status: 500 });
  }
}

// ASSISTANT_FINAL: true
