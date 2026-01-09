import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/services/[id]
export async function GET(_req: Request, context: any) {
  try {
    const service = await prisma.service.findUnique({ where: { id: context.params.id } });
    if (!service) return NextResponse.json({ error: "غير موجود" }, { status: 404 });
    return NextResponse.json(service);
  } catch {
    return NextResponse.json({ error: "فشل في الجلب" }, { status: 500 });
  }
}

// PUT /api/services/[id]
export async function PUT(req: Request, context: any) {
  try {
    const body = await req.json();
    const { title, description, price } = body;
    const updated = await prisma.service.update({
      where: { id: context.params.id },
      data: {
        title,
        description,
        price: price !== undefined ? parseFloat(price) : undefined,
      },
    });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "فشل في التحديث" }, { status: 500 });
  }
}

// DELETE /api/services/[id]
export async function DELETE(_req: Request, context: any) {
  try {
    await prisma.service.delete({ where: { id: context.params.id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "فشل في الحذف" }, { status: 500 });
  }
}
