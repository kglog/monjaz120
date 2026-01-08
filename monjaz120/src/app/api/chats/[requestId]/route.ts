import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const CHAT_PATH = path.join(process.cwd(), 'prisma', 'chats_fallback.json');

async function readChatsFile() {
  try { return JSON.parse(await fs.promises.readFile(CHAT_PATH, 'utf8') || '[]'); } catch(e){ return []; }
}

async function writeChatsFile(arr:any[]) { try { await fs.promises.writeFile(CHAT_PATH, JSON.stringify(arr,null,2),'utf8'); } catch(e){} }

export async function GET(req: Request, { params }: any) {
  const { requestId } = params;
  // try DB first
  try {
    const db: any = prisma as any;
    if (db && db.chat) {
      const items = await db.chat.findMany({ where: { requestId }, orderBy: { createdAt: 'asc' } });
      return NextResponse.json({ data: items });
    }
  } catch (e) {
    // ignore and fallback to file
  }

  const all = await readChatsFile();
  const items = all.filter((m:any)=> m.requestId === requestId).sort((a:any,b:any)=> new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  return NextResponse.json({ data: items });
}

export async function POST(req: Request, { params }: any) {
  try {
    const { requestId } = params;
    const body = await req.json();
    const { senderId = 'anon', text } = body;
    if (!text || typeof text !== 'string') return new NextResponse('Invalid', { status: 400 });

    // try DB create
    try {
      const db: any = prisma as any;
      if (db && db.chat) {
        const created = await db.chat.create({ data: { requestId, senderId, text, createdAt: new Date() } });
        return NextResponse.json({ data: created }, { status: 201 });
      }
    } catch (e) {
      // continue to file fallback
    }

    const all = await readChatsFile();
    const msg = { id: `m_${Date.now()}`, requestId, senderId, text, createdAt: new Date().toISOString() };
    all.push(msg);
    await writeChatsFile(all);
    return NextResponse.json({ data: msg }, { status: 201 });
  } catch (e) {
    return new NextResponse('Server error', { status: 500 });
  }
}
