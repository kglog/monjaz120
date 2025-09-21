import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// جلب جميع المستخدمين
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: { id: "asc" },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });
    return NextResponse.json(users);
  } catch (e) {
    return NextResponse.json({ error: "خطأ أثناء جلب المستخدمين" }, { status: 500 });
  }
}

// إضافة مستخدم جديد
export async function POST(req: Request) {
  try {
    const body = await req.json() as { name: string; email: string; role?: string };
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        role: body.role ?? "بائع",
      },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });
    return NextResponse.json(user, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: "خطأ أثناء إنشاء المستخدم" }, { status: 500 });
  }
}
