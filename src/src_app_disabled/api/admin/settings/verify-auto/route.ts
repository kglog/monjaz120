// 📄 src/app/api/admin/settings/verify-auto/route.ts
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import brain from "@/core/brain-safe";

const FILE = path.join(process.cwd(), "data", "admin-settings.json");

async function readSettings() {
  const raw = await fs.readFile(FILE, "utf8").catch(() => "{}");
  return JSON.parse(raw || "{}");
}

export async function GET() {
  const settings = await readSettings();
  const enabled = !!settings.verifyAutoApprove;
  return NextResponse.json({ ok: true, enabled });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const enabled = !!body.enabled;

    const settings = await readSettings();
    settings.verifyAutoApprove = enabled;

    await fs.mkdir(path.dirname(FILE), { recursive: true }).catch(() => {});
    await fs.writeFile(FILE, JSON.stringify(settings, null, 2), "utf8");

    try {
      await brain.log("verify_auto_approve_toggle", { enabled, time: Date.now() });
    } catch {}

    return NextResponse.json({ ok: true, enabled });
  } catch (err) {
    console.error("verify-auto settings error", err);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}

// ASSISTANT_FINAL: true
