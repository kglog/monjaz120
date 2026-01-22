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
  const { title, description, price, image } = body;

  if (!title || !price) {
    return NextResponse.json({ error: "البيانات ناقصة" }, { status: 400 });
  }

  const newService = await prisma.service.create({
    data: {
      title,
      description,
      price: Number(price),
      images: image ? image : "", // حفظ الصور كسلسلة نصية
      deliveryTime: 0, // قيمة افتراضية إضافية
      user: { connect: { id: '' } }, // إضافة user كـ relation فارغ
      // image: image || null, // تم التعليق حسب الشروط
    },
  });

  return NextResponse.json(newService);
}
