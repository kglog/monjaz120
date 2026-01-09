import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import fs from 'fs';
import { broadcast } from '@/lib/requestsStream';

const FALLBACK_PATH = process.cwd() + '/prisma/requests_fallback.json';

async function readFallback() {
  try {
    const txt = await fs.promises.readFile(FALLBACK_PATH, 'utf8');
    return JSON.parse(txt || '[]');
  } catch (e) {
    return [];
  }
}

async function writeFallback(arr: any[]) {
  try {
    await fs.promises.writeFile(FALLBACK_PATH, JSON.stringify(arr, null, 2), 'utf8');
  } catch (e) {
    console.error('writeFallback error', e);
  }
}

export async function GET() {
  try {
  const db: any = prisma as any;
  try {
    const requests = await db.request.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json({ data: requests });
  } catch (dbErr) {
    // fallback to file storage
    const fallback = await readFallback();
    return NextResponse.json({ data: fallback });
  }
  } catch (err: any) {
    console.error('GET /api/requests error', err);
    return new NextResponse('Server error', { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description } = body;
    // try to resolve server session (NextAuth)
  const session: any = await getServerSession(authOptions as any);
  const serverUserId = session?.user?.id ?? null;

    if (!title || typeof title !== 'string') {
      return new NextResponse('Invalid title', { status: 400 });
    }

    // server-side forbidden content filter (mirror client)
    const forbidden = [
      /\b(05\d{8}|\+9665\d{8}|\d{7,12})\b/,
      /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/,
      /(https?:\/\/|www\.)/i,
      /\b(واتس|واتساب|whatsapp|telegram|تليجرام|snap|discord|@)\b/i,
    ];
    const textToCheck = `${title}\n${description || ''}`;
    if (forbidden.some((r) => r.test(textToCheck))) {
      // log incident to incidents storage (try DB, otherwise append to fallback)
      try {
        const db: any = prisma as any;
        await db.incident.create({ data: { userId: serverUserId ?? null, type: 'forbidden_request', payload: JSON.stringify({ title, description }), message: 'forbidden content detected' } });
      } catch (e) {
        // fallback: append to incidents fallback file
        try {
          const p = process.cwd() + '/prisma/incidents_fallback.json';
          const cur = JSON.parse(await fs.promises.readFile(p, 'utf8') || '[]');
          cur.unshift({ id: `inc_${Date.now()}`, userId: serverUserId ?? null, type: 'forbidden_request', payload: { title, description }, message: 'forbidden content detected', createdAt: new Date().toISOString() });
          await fs.promises.writeFile(p, JSON.stringify(cur, null, 2), 'utf8');
        } catch (e) {}
      }
      return new NextResponse('Forbidden content detected', { status: 422 });
    }

  const db: any = prisma as any;
  try {
    const created = await db.request.create({
      data: {
        title: title.trim(),
        description: description ? description.trim() : null,
        createdBy: serverUserId ?? null,
      },
    });
    return NextResponse.json({ data: created }, { status: 201 });
  } catch (dbErr) {
    // fallback: persist to local file so UI works without DB
    const fallback = await readFallback();
    const id = `fb_${Date.now()}`;
    const item = {
      id,
      title: title.trim(),
      description: description ? description.trim() : null,
      createdBy: serverUserId ?? null,
      status: 'open',
      claimedBy: null,
      price: null,
      platformFee: 1000,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    fallback.unshift(item);
    await writeFallback(fallback);
    // notify SSE clients about fallback item as well
    try { broadcast(item); } catch(e){}
    return NextResponse.json({ data: item }, { status: 201 });
  }
  } catch (err: any) {
    console.error('POST /api/requests error', err);
    return new NextResponse('Server error', { status: 500 });
  }
}
