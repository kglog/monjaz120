import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/admin/users => جلب جميع المستخدمين
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(users);
  } catch (err) {
    return NextResponse.json({ error: "فشل في جلب المستخدمين" }, { status: 500 });
  }
}
