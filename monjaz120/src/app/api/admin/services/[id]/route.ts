import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest, ctx: any) {
  const id = ctx?.params?.id as string;
  const service = await (prisma as any).service.findUnique({
    where: { id },
  });
  return NextResponse.json(service);
}

export async function PUT(req: NextRequest, ctx: any) {
  const id = ctx?.params?.id as string;
  const body = await req.json();
  const { title, description, price, image } = body;

  const updatedService = await (prisma as any).service.update({
    where: { id },
    data: {
      title,
      description,
      price: Number(price),
      image: image || null,
    },
  });

  return NextResponse.json(updatedService);
}

export async function DELETE(req: NextRequest, ctx: any) {
  const id = ctx?.params?.id as string;
  await (prisma as any).service.delete({
    where: { id },
  });
  return NextResponse.json({ success: true });
}

// ASSISTANT_FINAL: true
