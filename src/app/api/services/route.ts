import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { title, description, price, userId, category, deliveryTime } = await req.json();

    if (!title || !description || price === undefined || !userId || !category || deliveryTime === undefined) {
      return NextResponse.json({ error: "حقول ناقصة" }, { status: 400 });
    }

    const service = await prisma.service.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        category,
        deliveryTime: Number(deliveryTime),
        user: { connect: { id: userId } },
      },
    });

    return NextResponse.json(service);
  } catch (err) {
    return NextResponse.json({ error: "فشل في إنشاء الخدمة" }, { status: 500 });
  }
}
