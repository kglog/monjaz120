import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendTelegram } from "@/utils/notify";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();
    const { status } = body as { status?: "accepted" | "completed" | "rejected" };

    if (!status) {
      return NextResponse.json({ status: "error", message: "status مطلوب" }, { status: 400 });
    }

    const order = await prisma.order.update({
      where: { id },
      data: { status },
    });

    await sendTelegram(
      [
        "🔔 <b>تم تحديث حالة طلب</b>",
        `• العنوان: ${order.title}`,
        `• الحالة الجديدة: ${order.status}`,
        `• الوقت: ${new Date().toLocaleString()}`
      ].join("\n")
    );

    return NextResponse.json({ status: "success", order });
  } catch (err) {
    console.error("PATCH /api/orders/[id] error:", err);
    return NextResponse.json({ status: "error", message: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const order = await prisma.order.delete({
      where: { id },
    });

    await sendTelegram(
      [
        "🗑️ <b>تم حذف طلب</b>",
        `• العنوان: ${order.title}`,
        `• الخدمة: ${order.serviceId}`,
        `• الوقت: ${new Date().toLocaleString()}`
      ].join("\n")
    );

    return NextResponse.json({ status: "success" });
  } catch (err) {
    console.error("DELETE /api/orders/[id] error:", err);
    return NextResponse.json({ status: "error", message: "Internal Server Error" }, { status: 500 });
  }
}
