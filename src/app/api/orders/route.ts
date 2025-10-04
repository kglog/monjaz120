import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/orders => عرض جميع الطلبات
export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: { service: true, user: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(orders);
  } catch (err) {
    return NextResponse.json({ error: "فشل في جلب الطلبات" }, { status: 500 });
  }
}

// POST /api/orders => إنشاء طلب جديد
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { serviceId, title, price, details, userId } = body;

    if (!serviceId || !title || !price || !userId) {
      return NextResponse.json(
        { error: "حقول ناقصة" },
        { status: 400 }
      );
    }

    const order = await prisma.order.create({
      data: {
        title,
        price: parseFloat(price),
        details,
        serviceId,
        userId,
      },
    });

    return NextResponse.json(order);
  } catch (err) {
    return NextResponse.json({ error: "فشل في إنشاء الطلب" }, { status: 500 });
  }
}
