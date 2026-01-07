import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // ✅ تعديل هنا
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import fs from "fs";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const fullName = formData.get("fullName") as string;
    const nationalId = formData.get("nationalId") as string;
    const dob = formData.get("dob") as string;
    const selfie = formData.get("selfie") as File | null;
    const idCard = formData.get("idCard") as File | null;

    if (!fullName || !nationalId || !dob || !selfie || !idCard) {
      return NextResponse.json({ error: "حقول ناقصة" }, { status: 400 });
    }

    // 📂 مسار التخزين
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // 💾 حفظ الملفات
    const selfieFileName = `${Date.now()}-selfie-${selfie.name}`;
    const idFileName = `${Date.now()}-id-${idCard.name}`;
    const selfiePath = path.join(uploadDir, selfieFileName);
    const idPath = path.join(uploadDir, idFileName);

    await writeFile(selfiePath, Buffer.from(await selfie.arrayBuffer()));
    await writeFile(idPath, Buffer.from(await idCard.arrayBuffer()));

    // 🗄️ حفظ في قاعدة البيانات
    const saved = await prisma.verificationRequest.create({
      data: {
        userId: "test-user", // ✅ عدلها لاحقًا تربط بالمستخدم الحقيقي
        fullName,
        nationalId,
        dob: new Date(dob),
        selfiePath: `/uploads/${selfieFileName}`,
        idCardPath: `/uploads/${idFileName}`,
        status: "pending",
      },
    });

    return NextResponse.json({ status: saved.status });
  } catch (err: any) {
    console.error("Verify API error:", err);
    return NextResponse.json({ error: err.message || "خطأ في الخادم" }, { status: 500 });
  }
}
