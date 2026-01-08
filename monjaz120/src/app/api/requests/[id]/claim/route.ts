import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import fs from 'fs';

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

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    if (!id) return new NextResponse('Missing id', { status: 400 });
    // require authenticated seller via NextAuth session
  const session: any = await getServerSession(authOptions as any);
  const sellerId = session?.user?.id ?? null;
    if (!sellerId) return new NextResponse('Authentication required', { status: 401 });

    // try DB first
    try {
  const existing = await (prisma as any).request.findUnique({ where: { id } });
      if (!existing) return new NextResponse('Request not found', { status: 404 });
      if (existing.status !== 'open') return new NextResponse('Request not open', { status: 409 });

      const updated = await (prisma as any).request.update({
        where: { id },
        data: { status: 'claimed', claimedBy: sellerId },
      });

      return NextResponse.json({ data: updated });
    } catch (dbErr) {
      // fallback to file
      const arr = await readFallback();
      const idx = arr.findIndex((x:any)=> x.id === id);
      if (idx === -1) return new NextResponse('Request not found (fallback)', { status: 404 });
      if (arr[idx].status !== 'open') return new NextResponse('Request not open (fallback)', { status: 409 });
      arr[idx].status = 'claimed';
      arr[idx].claimedBy = sellerId;
      arr[idx].updatedAt = new Date().toISOString();
      await writeFallback(arr);
      return NextResponse.json({ data: arr[idx] });
    }
  } catch (err: any) {
    console.error('POST /api/requests/[id]/claim error', err);
    return new NextResponse('Server error', { status: 500 });
  }
}
