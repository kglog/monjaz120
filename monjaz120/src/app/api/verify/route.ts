import { NextResponse } from "next/server";
import { writeFile, mkdir, readFile } from "fs/promises";
import path from "path";

// POST handler for /api/verify
export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";

    let fullName: string | null = null;
    let nationalId: string | null = null;
    let dob: string | null = null;
    let selfiePath: string | null = null;
    let idCardPath: string | null = null;

    // If multipart/form-data, use formData to get files
    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      fullName = (formData.get("fullName") as string) || null;
      nationalId = (formData.get("nationalId") as string) || null;
      dob = (formData.get("dob") as string) || null;

      const selfie = formData.get("selfie") as File | null;
      const idCard = formData.get("idCard") as File | null;

      if (selfie) {
        const uploadsDir = path.join(process.cwd(), "public", "uploads");
        await mkdir(uploadsDir, { recursive: true });
        selfiePath = path.join("/uploads", `selfie-${Date.now()}.png`);
        const absSelfie = path.join(process.cwd(), "public", selfiePath);
        await writeFile(absSelfie, Buffer.from(await selfie.arrayBuffer()));
      }

      if (idCard) {
        const uploadsDir = path.join(process.cwd(), "public", "uploads");
        await mkdir(uploadsDir, { recursive: true });
        idCardPath = path.join("/uploads", `id-${Date.now()}.png`);
        const absId = path.join(process.cwd(), "public", idCardPath);
        await writeFile(absId, Buffer.from(await idCard.arrayBuffer()));
      }
    } else {
      // Assume JSON
      const body = await req.json().catch(() => ({}));
      fullName = body.fullName || null;
      nationalId = body.nationalId || null;
      dob = body.dob || null;
    }

    if (!fullName || !nationalId || !dob) {
      return NextResponse.json({ error: "حقول ناقصة" }, { status: 400 });
    }

    // Mask national id for storage
    const masked = String(nationalId).replace(/\d(?=\d{2})/g, "*");
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
      fullName: String(fullName),
      nationalIdMask: masked,
      dobYear,
      selfiePath,
      idCardPath,
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

