import { NextResponse } from "next/server";
import sharp from "sharp";
import fs from "fs/promises";
import path from "path";
import brain from "@/core/brain-safe";

const MAX_MB = 8;
const MIN_W = 900, MIN_H = 600;
const LAPLACIAN = {
  width: 3, height: 3,
  kernel: [0,-1,0,-1,4,-1,0,-1,0]
};

async function ensureDir(p: string) {
  await fs.mkdir(p, { recursive: true }).catch(() => {});
}

async function saveToStorageSecure(buf: Buffer, mime: string) {
  const uplDir = path.join(process.cwd(), "data", "uploads");
  await ensureDir(uplDir);
  const filename = `idfront_${Date.now()}.${mime === 'image/png' ? 'png' : 'jpg'}`;
  const full = path.join(uplDir, filename);
  await fs.writeFile(full, buf);
  // return a relative path (dev-only)
  return `/data/uploads/${filename}`;
}

// read user doc type from local dev store (fallback)
async function readUserDocType(uid = "anon") {
  const file = path.join(process.cwd(), "data", "verification-requests.json");
  try {
    const raw = await fs.readFile(file, "utf8");
    const arr = JSON.parse(raw || "[]");
    const last = arr.slice().reverse().find((r:any)=>r.uid===uid);
    return last?.docType || 'nid_sa';
  } catch (e) {
    return 'nid_sa';
  }
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file") as any;
    if (!file) return NextResponse.json({ ok:false, code: "NO_FILE" }, { status: 400 });
    if (!["image/jpeg","image/png"].includes(file.type))
      return NextResponse.json({ ok:false, code: "TYPE" }, { status: 400 });
    if (file.size > MAX_MB * 1024 * 1024)
      return NextResponse.json({ ok:false, code: "SIZE" }, { status: 400 });

    const arrBuf = Buffer.from(await file.arrayBuffer());
    const img = sharp(arrBuf);
    const meta = await img.metadata();
    if (!meta.width || !meta.height || meta.width < MIN_W || meta.height < MIN_H)
      return NextResponse.json({ ok:false, code: "SMALL" }, { status: 400 });

    // blur check via laplacian variance
    const lap = await img.clone().greyscale().convolve(LAPLACIAN).raw().toBuffer({ resolveWithObject: true });
    const data = lap.data;
    const mean = data.reduce((a,b)=>a+b,0)/data.length;
    const variance = data.reduce((a,b)=>a+(b-mean)*(b-mean),0)/data.length;
    if (variance < 120) return NextResponse.json({ ok:false, code: "BLUR" }, { status: 400 });

    // glare check
    const stats = await img.clone().stats();
    if ((stats.channels?.[0]?.max ?? 0) > 250 && (stats.channels?.[0]?.mean ?? 0) > 200)
      return NextResponse.json({ ok:false, code: "GLARE" }, { status: 400 });

    // match docType from dev store
    const uid = req.headers.get("x-user-id") || "anon";
    const userDocType = await readUserDocType(uid);

    const OCR_STRICT = process.env.NEXT_PUBLIC_ID_OCR_STRICT === "true";
    if (OCR_STRICT) {
      // optional OCR stub - production should call a real OCR
      const text = ""; // placeholder
      const tenDigits = (text.match(/\d{10}/g) || []);
      if (userDocType !== "passport") {
        const hit = tenDigits.find((v:any) => /^[12]\d{9}$/.test(v));
        if (!hit) return NextResponse.json({ ok:false, code: "NID_OCR_FAIL" }, { status: 400 });
      } else {
        const passLike = (text.match(/[A-Z0-9]{6,20}/g) || []).find((v:any) => /[A-Z]/.test(v));
        if (!passLike) return NextResponse.json({ ok:false, code: "PPT_OCR_FAIL" }, { status: 400 });
      }
    }

    // save to dev storage
    const url = await saveToStorageSecure(arrBuf, file.type);

    // brain-safe log (no PII)
    try {
      await brain.log("verify.id_front.uploaded", {
        docType: userDocType,
        w: meta.width, h: meta.height,
        blurVar: Math.round(variance),
        glare: stats.channels?.[0]?.max ?? null,
        ocrStrict: !!OCR_STRICT,
        time: Date.now()
      });
    } catch (e) {}

    // mark step in local dev store: add url and status
    try {
      const filePath = path.join(process.cwd(), "data", "verification-requests.json");
      const raw = await fs.readFile(filePath, "utf8").catch(()=>"[]");
      const arr = JSON.parse(raw || "[]");
      const idx = arr.findIndex((r:any)=>r.uid===uid && r.status==='basic_info_submitted');
      if (idx >= 0) {
        arr[idx].idFront = { status: 'PENDING_REVIEW', url };
        await fs.writeFile(filePath, JSON.stringify(arr, null, 2));
      }
    } catch (e) {}

    return NextResponse.json({ ok:true, url });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok:false, error: 'server_error' }, { status: 500 });
  }
}

// ASSISTANT_FINAL: true
