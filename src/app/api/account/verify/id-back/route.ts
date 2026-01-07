import { NextResponse } from "next/server";
import sharp from "sharp";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import brain from "@/core/brain-safe";

const MAX_MB = 8;
const MIN_W = 700,
  MIN_H = 700;
const LAPLACIAN = {
  width: 3,
  height: 3,
  kernel: [0, -1, 0, -1, 4, -1, 0, -1, 0],
};

async function ensureDir(p: string) {
  await fs.mkdir(p, { recursive: true }).catch(() => {});
}

async function saveBuf(buf: Buffer, mime: string, prefix: string) {
  const upl = path.join(process.cwd(), "data", "uploads");
  await ensureDir(upl);
  const ext = mime === "image/png" ? "png" : "jpg";
  const fn = `${prefix}_${Date.now()}.${ext}`;
  const full = path.join(upl, fn);
  await fs.writeFile(full, buf);
  // returns a path like /data/uploads/...
  return `/data/uploads/${fn}`;
}

function sha256Hex(input: Buffer) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

async function readAdminSettings() {
  const file = path.join(process.cwd(), "data", "admin-settings.json");
  const raw = await fs.readFile(file, "utf8").catch(() => "{}");
  return JSON.parse(raw || "{}");
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const back = form.get("back") as any;
    const selfie = form.get("selfie") as any;
    if (!back || !selfie)
      return NextResponse.json({ ok: false, code: "NO_FILE" }, { status: 400 });

    // basic checks
    for (const file of [back, selfie]) {
      if (!["image/jpeg", "image/png"].includes(file.type))
        return NextResponse.json({ ok: false, code: "TYPE" }, { status: 400 });
      if (file.size > MAX_MB * 1024 * 1024)
        return NextResponse.json({ ok: false, code: "SIZE" }, { status: 400 });
    }

    const backBuf = Buffer.from(await back.arrayBuffer());
    const selfieBuf = Buffer.from(await selfie.arrayBuffer());

    // back image checks
    const img = sharp(backBuf);
    const meta = await img.metadata();
    if (
      !meta.width ||
      !meta.height ||
      meta.width < MIN_W ||
      meta.height < MIN_H
    )
      return NextResponse.json({ ok: false, code: "SMALL" }, { status: 400 });

    const lap = await img
      .clone()
      .greyscale()
      .convolve(LAPLACIAN)
      .raw()
      .toBuffer({ resolveWithObject: true });
    const data = lap.data;
    const mean = data.reduce((a, b) => a + b, 0) / data.length;
    const variance =
      data.reduce((a, b) => a + (b - mean) * (b - mean), 0) / data.length;
    if (variance < 80)
      return NextResponse.json({ ok: false, code: "BLUR" }, { status: 400 });

    const stats = await img.clone().stats();
    if (
      (stats.channels?.[0]?.max ?? 0) > 250 &&
      (stats.channels?.[0]?.mean ?? 0) > 200
    )
      return NextResponse.json({ ok: false, code: "GLARE" }, { status: 400 });

    const hasExif = !!meta.exif;
    if (!hasExif)
      return NextResponse.json({ ok: false, code: "MOD" }, { status: 400 });

    // Save files
    const backUrl = await saveBuf(backBuf, back.type, "idback");
    const selfieUrl = await saveBuf(selfieBuf, selfie.type, "selfie");

    // compute quality score and match score (stubs)
    const qualityScore = Math.round(variance);
    const selfie_match_score = 75; // simulate 75% match for dev

    try {
      await brain.log("id_upload_back_attempt", {
        qualityScore,
        doc: "back",
        time: Date.now(),
      });
    } catch (e) {}
    try {
      await brain.log("selfie_match_score", {
        score: selfie_match_score,
        time: Date.now(),
      });
    } catch (e) {}

    // update dev verification store if exists
    try {
      const filePath = path.join(process.cwd(), "data", "verification-requests.json");
      const raw = await fs.readFile(filePath, "utf8").catch(() => "[]");
      const arr = JSON.parse(raw || "[]");
      const uid = req.headers.get("x-user-id") || "anon";
      const idx = arr.findIndex((r: any) => r.uid === uid && r.status === "basic_info_submitted");

      // read auto-approve setting
      const settings = await readAdminSettings();
      const autoApprove = !!settings.verifyAutoApprove;

      if (idx >= 0) {
        const rec = arr[idx];

        rec.idBack = {
          status: "UPLOADED",
          url: backUrl,
          qualityScore,
        };
        rec.selfie = {
          status: "UPLOADED",
          url: selfieUrl,
          match: selfie_match_score,
        };

        if (
          autoApprove &&
          qualityScore >= 100 &&
          selfie_match_score >= 60
        ) {
          rec.status = "verified";
          rec.verifyStatus = "verified";
          rec.autoApproved = true;

          try {
            await brain.log("verify_auto_approved", {
              uid,
              qualityScore,
              selfie_match_score,
              time: Date.now(),
            });
          } catch {}
        } else {
          rec.status = "pending_review";
          rec.verifyStatus = "pending_review";
          rec.autoApproved = false;
        }

        arr[idx] = rec;
        await fs.writeFile(filePath, JSON.stringify(arr, null, 2));
      }
    } catch (e) {
      console.error("update verification store failed", e);
    }

    return NextResponse.json({
      ok: true,
      backUrl,
      selfieUrl,
      qualityScore,
      selfie_match_score,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}

// ASSISTANT_FINAL: true
