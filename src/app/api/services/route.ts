import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/services => عرض جميع الخدمات
export async function GET() {
  try {
    const services = await prisma.service.findMany({
      include: { user: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(services);
  } catch (err) {
    return NextResponse.json({ error: "فشل في جلب الخدمات" }, { status: 500 });
  }
}

// POST /api/services => إضافة خدمة جديدة
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, price, userId } = body;

    if (!title || !description || !price || !userId) {
      return NextResponse.json(
        { error: "حقول ناقصة" },
        { status: 400 }
      );
    }

    const service = await prisma.service.create({
      data: { title, description, price: parseFloat(price), userId },
    });

    return NextResponse.json(service);
  } catch (err) {
    return NextResponse.json({ error: "فشل في إضافة الخدمة" }, { status: 500 });
  }
}
