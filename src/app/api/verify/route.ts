import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { writeFile } from "fs/promises";
import path from "path";

// 📝 استقبال بيانات التوثيق
export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const fullName = formData.get("fullName") as string;
    const nationalId = formData.get("nationalId") as string;
    const dob = formData.get("dob") as string;
    const selfie = formData.get("selfie") as File | null;
    const idCard = formData.get("idCard") as File | null;

    if (!fullName || !nationalId || !dob || !selfie || !idCard) {
      return NextResponse.json(
        { error: "جميع الحقول مطلوبة" },
        { status: 400 }
      );
    }

    // 📂 حفظ الملفات داخل public/uploads
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    const selfiePath = path.join(uploadsDir, `selfie-${Date.now()}.png`);
    const idCardPath = path.join(uploadsDir, `id-${Date.now()}.png`);

    await writeFile(selfiePath, Buffer.from(await selfie.arrayBuffer()));
    await writeFile(idCardPath, Buffer.from(await idCard.arrayBuffer()));
// قبل هذا السطر، عرف متغير userId بأي قيمة موجودة عندك (مثلاً من المستخدم أو للتجربة)
const userId = "123"; // ضع هنا معرف مستخدم فعلي من قاعدة البيانات (أو للتجربة)

// باقي الكود كما هو
await prisma.verificationRequest.create({
  data: {
    userId,         // معرف المستخدم - ضروري يكون موجود
    fullName,
    nationalId,
    dob,
    selfiePath,
    idCardPath,
    status: "pending",
  },
});

    return NextResponse.json(
      { message: "تم إرسال طلب التوثيق" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("❌ خطأ في API:", error);
    return NextResponse.json(
      { error: "خطأ في الخادم", details: error.message },
      { status: 500 }
    );
  }
}
