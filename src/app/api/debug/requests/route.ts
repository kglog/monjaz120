import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const fallbackPath = path.join(process.cwd(), 'prisma', 'requests_fallback.json');
  let fallback: any = null;
  try {
    if (fs.existsSync(fallbackPath)) fallback = JSON.parse(fs.readFileSync(fallbackPath, 'utf8'));
  } catch (e) {}

  // check prisma
  let prismaOk = false;
  try {
    // lightweight query
    // @ts-ignore
    await prisma.$queryRaw`SELECT 1`;
    prismaOk = true;
  } catch (e) {}

  return NextResponse.json({ prismaOk, fallback });
}
