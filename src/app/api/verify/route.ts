import { NextResponse } from "next/server";
<<<<<<< HEAD
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
=======
import { writeFile, mkdir, readFile } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, nationalId, dob } = body;
    if (!fullName || !nationalId || !dob) {
      return NextResponse.json({ error: "حقول ناقصة" }, { status: 400 });
    }

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

    return NextResponse.json({ status: "ok", id: entry.id });
  } catch (err: any) {
    console.error("/api/verify error:", err);
    return NextResponse.json({ error: err?.message || "خطأ في الخادم" }, { status: 500 });
>>>>>>> cf326c0 (chore: centralize CATALOG, unify category routing to ?sub=, make NAV and homepage read from catalog // ASSISTANT_FINAL: true)
  }
}
