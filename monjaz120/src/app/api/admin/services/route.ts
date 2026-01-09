import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const services = await (prisma as any).service.findMany({
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

  const newService = await (prisma as any).service.create({
    data: {
      title,
      description,
      price: Number(price),
      image: image || null, // ✅ هنا يحفظ الصورة
    },
  });

  return NextResponse.json(newService);
}
