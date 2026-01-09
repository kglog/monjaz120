export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
  const session = await auth();
  const email = session?.user?.email ?? null;
  if (!email) return NextResponse.json({ ok: false, error: "UNAUTHORIZED" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });
  if (!user) return NextResponse.json({ ok: false, error: "UNAUTHORIZED" }, { status: 401 });

  const v = await prisma.identitySession.findFirst({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      decidedAt: true,
      verifiedAt: true,
      rejectedAt: true,
      decisionReason: true,
    } as any,
  });

  return NextResponse.json({ ok: true, verification: v }, {
    headers: { "Cache-Control": "no-store" },
  });
}

// ASSISTANT_FINAL: true
