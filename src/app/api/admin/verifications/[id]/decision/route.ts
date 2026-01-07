import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest, ctx: any) {
  try {
    const id = ctx?.params?.id as string;
    const body = await req.json().catch(() => ({}));
    const decision = body?.decision as "approve" | "reject";
    const reason = (body?.reason || "").toString().slice(0, 300);

    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
    if (decision !== "approve" && decision !== "reject") {
      return NextResponse.json({ error: "Invalid decision" }, { status: 400 });
    }

    const session = await (prisma as any).identitySession.findUnique({ where: { id } });
    if (!session) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const userId = session.userId;
    const newStatus = decision === "approve" ? "verified" : "rejected";

    // 1) حدّث الجلسة اللي ضغطت عليها
    await (prisma as any).identitySession.update({
      where: { id },
      data: {
        status: newStatus,
        rejectReason: decision === "reject" ? (reason || "مطلوب إعادة رفع الصور بوضوح") : null,
        decidedAt: new Date(),
      },
    });

    // 2) الأهم: إذا وافقت => خل "أحدث جلسة لنفس المستخدم" Verified (عشان /account يلقطها فورًا)
    if (decision === "approve" && userId) {
      const latest = await (prisma as any).identitySession.findFirst({
        where: { userId },
        orderBy: { createdAt: "desc" },
      });

      if (latest?.id && latest.id !== id) {
        await (prisma as any).identitySession.update({
          where: { id: latest.id },
          data: {
            status: "verified",
            rejectReason: null,
            decidedAt: new Date(),
          },
        });
      }

      // (اختياري قوي) أي جلسات معلّقة لنفس المستخدم نخليها superseded عشان ما تلخبطك
      await (prisma as any).identitySession.updateMany({
        where: {
          userId,
          status: { in: ["pending", "basic_info_submitted", "documents_uploaded", "manual_review"] },
          id: { not: latest?.id || id },
        },
        data: { status: "superseded" },
      });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json(
      { error: "Server error", detail: String(e?.message || e) },
      { status: 500 }
    );
  }
}

// ASSISTANT_FINAL: true
