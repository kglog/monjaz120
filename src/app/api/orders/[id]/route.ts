import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/orders/[id] => جلب تفاصيل طلب واحد
export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: params.id },
      include: { service: true },
    });

    if (!order) {
      return NextResponse.json({ error: "الطلب غير موجود" }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch {
    return NextResponse.json({ error: "خطأ في جلب الطلب" }, { status: 500 });
  }
}

// PUT /api/orders/[id] => تعديل طلب
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { title, price, details } = body;

    const updated = await prisma.order.update({
      where: { id: params.id },
     data: {
  title,
  price: price !== undefined ? parseFloat(price) : undefined,
},
    });

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "فشل في تحديث الطلب" }, { status: 500 });
  }
}

// DELETE /api/orders/[id] => حذف طلب
export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.order.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "فشل في حذف الطلب" }, { status: 500 });
  }
}
