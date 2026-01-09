import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const MAX_SIZE = 8 * 1024 * 1024; // 8MB

async function ensureDir(p: string) { return fs.mkdir(p, { recursive: true }).catch(() => {}); }

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get('file') as any;
    const name = form.get('name') as string | null;
    if (!file) return NextResponse.json({ ok: false, error: 'NO_FILE' }, { status: 400 });

    if (!['image/jpeg', 'image/png'].includes(file.type)) return NextResponse.json({ ok: false, error: 'TYPE' }, { status: 400 });
    if (file.size > MAX_SIZE) return NextResponse.json({ ok: false, error: 'SIZE' }, { status: 400 });

    const buf = Buffer.from(await file.arrayBuffer());
    const upl = path.join(process.cwd(), 'data', 'uploads');
    await ensureDir(upl);
    const ext = file.type === 'image/png' ? 'png' : 'jpg';
    const fname = `logo_${Date.now()}.${ext}`;
    const full = path.join(upl, fname);
    await fs.writeFile(full, buf);

    // update gallery JSON
    const storePath = path.join(process.cwd(), 'data', 'design-logos.json');
    const raw = await fs.readFile(storePath, 'utf8').catch(() => '[]');
    const arr = JSON.parse(raw || '[]');
    const entry = { id: Date.now(), name: name || fname, url: `/data/uploads/${fname}`, createdAt: new Date().toISOString() };
    arr.unshift(entry);
    await fs.writeFile(storePath, JSON.stringify(arr, null, 2));

    return NextResponse.json({ ok: true, entry });
  } catch (err) {
    console.error('upload error', err);
    return NextResponse.json({ ok: false, error: 'server_error' }, { status: 500 });
  }
}

// ASSISTANT_FINAL: true
