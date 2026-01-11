import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/orders => عرض جميع الطلبات
export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: { service: true, buyer: true, seller: true },
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

    const serviceId = body.serviceId;
    const title = body.title;
    const priceRaw = body.price;

    // يدعم الكود القديم لو يرسل userId بدل buyerId
    const buyerId = body.buyerId ?? body.userId;

    if (!serviceId || !title || priceRaw === undefined || !buyerId) {
      return NextResponse.json({ error: "حقول ناقصة" }, { status: 400 });
    }

    const price = parseFloat(String(priceRaw));
    if (Number.isNaN(price)) {
      return NextResponse.json({ error: "السعر غير صحيح" }, { status: 400 });
    }

    // نجيب البائع من الخدمة
    const service = await prisma.service.findUnique({
      where: { id: serviceId },
      select: { userId: true },
    });

    if (!service?.userId) {
      return NextResponse.json({ error: "الخدمة غير موجودة" }, { status: 404 });
    }

    const sellerId = service.userId;

    const order = await prisma.order.create({
      data: {
        title,
        price,
        netPrice: price, // مؤقتاً نفس السعر
        service: { connect: { id: serviceId } },
        buyer: { connect: { id: buyerId } },
        seller: { connect: { id: sellerId } },
      },
    });

    return NextResponse.json(order);
  } catch (err) {
    return NextResponse.json({ error: "فشل في إنشاء الطلب" }, { status: 500 });
  }
}
