import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const service = await prisma.service.findUnique({
    where: { id: params.id },
  });
  return NextResponse.json(service);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();
  const { title, description, price, image } = body;

  const updatedService = await prisma.service.update({
    where: { id: params.id },
    data: {
      title,
      description,
      price: Number(price),
      image: image || null, // ✅ تحديث الصورة
    },
  });

  return NextResponse.json(updatedService);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await prisma.service.delete({
    where: { id: params.id },
  });
  return NextResponse.json({ success: true });
}
