import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

<<<<<<< Updated upstream:src/src_app_disabled/api/admin/services/[id]/route.ts
export async function GET(req: NextRequest, ctx: any) {
  const id = ctx?.params?.id as string;
=======
// Next.js App Router handlers expect (request: NextRequest, context: { params })

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
>>>>>>> Stashed changes:src/app/api/admin/services/[id]/route.ts
  const service = await prisma.service.findUnique({
    where: { id },
  });
  return NextResponse.json(service);
}

<<<<<<< Updated upstream:src/src_app_disabled/api/admin/services/[id]/route.ts
export async function PUT(req: NextRequest, ctx: any) {
  const id = ctx?.params?.id as string;
  const body = await req.json();
=======

export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const body = await request.json();
>>>>>>> Stashed changes:src/app/api/admin/services/[id]/route.ts
  const { title, description, price, image } = body;

  const updatedService = await prisma.service.update({
    where: { id },
    data: {
      title,
      description,
      price: Number(price),
<<<<<<< Updated upstream:src/src_app_disabled/api/admin/services/[id]/route.ts
      image: image || null,
=======
      images: image ? image : "",
      // user: '', // تم التعليق لحل خطأ النوع
>>>>>>> Stashed changes:src/app/api/admin/services/[id]/route.ts
    },
  });

  return NextResponse.json(updatedService);
}

<<<<<<< Updated upstream:src/src_app_disabled/api/admin/services/[id]/route.ts
export async function DELETE(req: NextRequest, ctx: any) {
  const id = ctx?.params?.id as string;
=======

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
>>>>>>> Stashed changes:src/app/api/admin/services/[id]/route.ts
  await prisma.service.delete({
    where: { id },
  });
  return NextResponse.json({ success: true });
}

// ASSISTANT_FINAL: true
