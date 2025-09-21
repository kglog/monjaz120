import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ✅ جلب مستخدم واحد
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(params.id) },
    });

    if (!user) {
      return NextResponse.json(
        { error: "المستخدم غير موجود" },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json(
      { error: "خطأ أثناء جلب المستخدم" },
      { status: 500 }
    );
  }
}

// ✅ تعديل مستخدم
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();

    const updatedUser = await prisma.user.update({
      where: { id: Number(params.id) },
      data: {
        name: body.name,
        email: body.email,
        role: body.role,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json(
      { error: "خطأ أثناء تحديث المستخدم" },
      { status: 500 }
    );
  }
}

// ✅ حذف مستخدم
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.user.delete({
      where: { id: Number(params.id) },
    });

    return NextResponse.json({ message: "تم حذف المستخدم" });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json(
      { error: "خطأ أثناء حذف المستخدم" },
      { status: 500 }
    );
  }
}
