import { NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import Service from "@/models/Service";

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  try {
    await connectDB();
    const service = await Service.findOne({ slug: params.slug });

    if (!service) {
      return NextResponse.json({ message: "الخدمة غير موجودة" }, { status: 404 });
    }

    return NextResponse.json({ service });
  } catch (error) {
    console.error("خطأ في جلب الخدمة:", error);
    return NextResponse.json({ message: "خطأ في السيرفر" }, { status: 500 });
  }
}
