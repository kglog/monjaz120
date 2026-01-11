import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const services = await prisma.service.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(services);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { title, description, price, images, category, deliveryTime, userId } = body;

  if (!title || price === undefined || price === null || !category || deliveryTime === undefined || deliveryTime === null || !userId) {
    return NextResponse.json(
      { error: "البيانات ناقصة (title, price, category, deliveryTime, userId)" },
      { status: 400 }
    );
  }

  const newService = await prisma.service.create({
    data: {
      title,
      description,
      price: Number(price),
      images: images ?? null,
      category: String(category),
      deliveryTime: Number(deliveryTime),
      user: { connect: { id: String(userId) } }, // ✅ ربط الخدمة بصاحبها
    },
  });

  return NextResponse.json(newService);
}
