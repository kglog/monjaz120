import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const name = url.searchParams.get("name");
    if (!name) return NextResponse.json({ ok: false, error: "missing name" }, { status: 400 });
    const p = path.join(process.cwd(), "data", "uploads", name);
    if (!fs.existsSync(p)) return NextResponse.json({ ok: false, error: "not found" }, { status: 404 });
    const buffer = fs.readFileSync(p);
    const ext = path.extname(p).slice(1);
    const mime = ext === "png" ? "image/png" : ext === "jpg" || ext === "jpeg" ? "image/jpeg" : "application/octet-stream";
    return new NextResponse(buffer, { status: 200, headers: { "Content-Type": mime } });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
