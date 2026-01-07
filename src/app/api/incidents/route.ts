import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, message, payload } = body;
    // attach server session user if available
  const session: any = await getServerSession(authOptions as any);
  const serverUserId = session?.user?.id ?? null;
    const db: any = prisma as any;
    const rec = await db.incident.create({
      data: {
        userId: serverUserId ?? null,
        type: type ?? 'unknown',
        message: message ?? null,
        payload: payload ?? null,
      },
    });
    return NextResponse.json({ data: rec }, { status: 201 });
  } catch (err: any) {
    console.error('POST /api/incidents error', err);
    return new NextResponse('Server error', { status: 500 });
  }
}
