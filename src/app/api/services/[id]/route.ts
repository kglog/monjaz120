import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/services/[id]
export async function GET(_req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const service = await prisma.service.findUnique({ where: { id } });
    if (!service) return NextResponse.json({ error: "غير موجود" }, { status: 404 });
    return NextResponse.json(service);
  } catch {
    return NextResponse.json({ error: "فشل في الجلب" }, { status: 500 });
  }
}

// PUT /api/services/[id]
export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const body = await req.json();
    const { title, description, price } = body;
    const updated = await prisma.service.update({
      where: { id },
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
export async function DELETE(_req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    await prisma.service.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "فشل في الحذف" }, { status: 500 });
  }
}
