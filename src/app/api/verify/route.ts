import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // ✅ تعديل هنا
// Legacy file-based logic preserved below as comments (additive only)
// import { writeFile, mkdir, readFile } from "fs/promises";
// import path from "path";
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

    // 🗄️ حفظ في قاعدة البيانات (Prisma)
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

    // Legacy file-based logic (preserved, now commented):
    /*
    // لا نخزن كامل رقم الهوية هنا — نخزن آخر خانتين فقط مع طول الرقم
    const masked = nationalId.replace(/\d(?=\d{2})/g, "*");
    const dobYear = String(dob).split("-")[0] || null;

    const storageDir = path.join(process.cwd(), "data");
    await mkdir(storageDir, { recursive: true });
    const filePath = path.join(storageDir, "verification-requests.json");

    let list: any[] = [];
    try {
      const raw = await readFile(filePath, { encoding: "utf8" });
      list = JSON.parse(raw || "[]");
    } catch (e) {
      list = [];
    }

    const entry = {
      id: `vr_${Date.now()}`,
      fullNameLength: String(fullName).length,
      nationalIdMask: masked,
      dobYear,
      status: "pending",
      submittedAt: new Date().toISOString(),
    };

    list.unshift(entry);
    await writeFile(filePath, JSON.stringify(list, null, 2), { encoding: "utf8" });
    */

    return NextResponse.json({ status: saved.status });
  } catch (err: any) {
    console.error("Verify API error:", err);
    return NextResponse.json({ error: err.message || "خطأ في الخادم" }, { status: 500 });
  }
}
