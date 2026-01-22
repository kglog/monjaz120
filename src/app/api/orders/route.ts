import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/orders => ??? ???? ???????
export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: { service: true, user: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(orders);
  } catch (err) {
    return NextResponse.json({ error: "??? ?? ??? ???????" }, { status: 500 });
  }
}

// POST /api/orders => ????? ??? ????
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { serviceId, title, price, userId } = body;

    if (!serviceId || !title || !price || !userId) {
      return NextResponse.json(
        { error: "???? ?????" },
        { status: 400 }
      );
    }

    const order = await prisma.order.create({
      data: {
        title,
        price: parseFloat(price),
        serviceId,
        userId,
      },
    });

    return NextResponse.json(order);
  } catch (err) {
    return NextResponse.json({ error: "??? ?? ????? ?????" }, { status: 500 });
  }
}
