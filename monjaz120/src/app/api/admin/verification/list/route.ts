// 📄 src/app/api/admin/verification/list/route.ts
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const FILE = path.join(process.cwd(), "data", "verification-requests.json");

export async function GET() {
  try {
    const raw = await fs.readFile(FILE, "utf8").catch(() => "[]");
    const items = JSON.parse(raw || "[]");
    return NextResponse.json({ ok: true, items });
  } catch (err) {
    console.error("verification list error", err);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}

// ASSISTANT_FINAL: true
