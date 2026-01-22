import { NextResponse } from "next/server";
// Legacy MongoDB logic preserved below as comments (additive only)
// import connectDB from "@/lib/mongodb";
// import Service from "@/models/Service";
// import { auth } from "@/auth";
import prisma from "@/lib/prisma";

// GET /api/services => عرض جميع الخدمات
export async function GET() {
  try {
    // Prisma version (additive)
    const services = await prisma.service.findMany({
      include: { user: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(services);

    // Legacy MongoDB version (preserved as comment):
    /*
    await connectDB();
    const servicesFromDB = await Service.find({});
    return NextResponse.json({ items: servicesFromDB });
    */
  } catch (err) {
    return NextResponse.json({ error: "فشل في جلب الخدمات" }, { status: 500 });
  }
}

// POST /api/services => إضافة خدمة جديدة
export async function POST(req: Request) {
  try {
    // Prisma version (additive)
    const body = await req.json();
    const { title, description, price, userId } = body;

    if (!title || !description || !price || !userId) {
      return NextResponse.json(
        { error: "حقول ناقصة" },
        { status: 400 }
      );
    }

    const service = await prisma.service.create({
      data: { title, description, price: parseFloat(price), userId, images: "" },
    });
    return NextResponse.json(service);

    // Legacy MongoDB version (preserved as comment):
    /*
    const session = await auth();
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await connectDB();
    const service = await Service.create({
      title,
      description,
      price: parseFloat(price),
      category,
      vendorId: session.user.id,
    });
    return NextResponse.json({ success: true, service });
    */
  } catch (err) {
    return NextResponse.json({ error: "فشل في إضافة الخدمة" }, { status: 500 });
  }
}
