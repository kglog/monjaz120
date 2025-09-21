import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// نداء: POST /api/pay/callback  body: { id: "orderId" }
export async function POST(req: Request) {
  const { id } = await req.json();
  if (!id) return NextResponse.json({ status: "error" }, { status: 400 });

  await prisma.order.update({ where: { id }, data: { status: "paid" } });
  return NextResponse.json({ status: "success" });
}
