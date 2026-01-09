import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/admin/stats => إحصائيات المنصة
export async function GET() {
  try {
    const users = await prisma.user.count();
    const services = await prisma.service.count();
    const orders = await prisma.order.count();

    return NextResponse.json({ users, services, orders });
  } catch (err) {
    return NextResponse.json({ error: "خطأ في جلب الإحصائيات" }, { status: 500 });
  }
}
