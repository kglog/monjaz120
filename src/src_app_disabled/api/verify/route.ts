import { NextResponse } from "next/server";
import { writeFile, mkdir, readFile } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    const ct = String(req.headers.get("content-type") || "");

    // multipart form case (files)
    if (ct.includes("multipart/form-data")) {
      const formData = await (req as any).formData();
      const fullName = String(formData.get("fullName") || "");
      const nationalId = String(formData.get("nationalId") || "");
      const dob = String(formData.get("dob") || "");
      const selfie = formData.get("selfie") as File | null;
      const idCard = formData.get("idCard") as File | null;

      if (!fullName || !nationalId || !dob || !selfie || !idCard) {
        return NextResponse.json({ error: "جميع الحقول مطلوبة" }, { status: 400 });
      }

      const uploadsDir = path.join(process.cwd(), "public", "uploads");
      await mkdir(uploadsDir, { recursive: true });

      const selfieRel = `uploads/selfie-${Date.now()}.png`;
      const idCardRel = `uploads/id-${Date.now()}.png`;
      const selfiePath = path.join(process.cwd(), "public", selfieRel);
      const idCardPath = path.join(process.cwd(), "public", idCardRel);

      await writeFile(selfiePath, Buffer.from(await (selfie as File).arrayBuffer()));
      await writeFile(idCardPath, Buffer.from(await (idCard as File).arrayBuffer()));

      // store metadata in data/verification-requests.json
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
        fullName,
        nationalIdMask: nationalId.replace(/\d(?=\d{2})/g, "*"),
        dob,
        selfie: selfieRel,
        idCard: idCardRel,
        status: "pending",
        submittedAt: new Date().toISOString(),
      };

      list.unshift(entry);
      await writeFile(filePath, JSON.stringify(list, null, 2), { encoding: "utf8" });

      return NextResponse.json({ message: "تم إرسال طلب التوثيق", id: entry.id }, { status: 200 });
    }

    // JSON body fallback
    const body = await req.json();
    const { fullName, nationalId, dob } = body || {};
    if (!fullName || !nationalId || !dob) {
      return NextResponse.json({ error: "حقول ناقصة" }, { status: 400 });
    }

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
      fullName,
      nationalIdMask: String(nationalId).replace(/\d(?=\d{2})/g, "*"),
      dob,
      status: "pending",
      submittedAt: new Date().toISOString(),
    };

    list.unshift(entry);
    await writeFile(filePath, JSON.stringify(list, null, 2), { encoding: "utf8" });

    return NextResponse.json({ status: "ok", id: entry.id });
  } catch (err: any) {
    console.error("/api/verify error:", err);
    return NextResponse.json({ error: err?.message || "خطأ في الخادم" }, { status: 500 });
  }
}

