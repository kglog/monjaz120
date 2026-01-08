import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const VERIF_PATH = path.join(process.cwd(), "data", "verification-requests.json");

export async function GET() {
  try {
    const raw = await fs.readFile(VERIF_PATH, "utf8").catch(() => "[]");
    const arr = JSON.parse(raw || "[]");

    if (!Array.isArray(arr) || arr.length === 0) {
      return NextResponse.json({ status: "none" });
    }

    const last = arr[arr.length - 1];

    return NextResponse.json({ status: last?.status ?? "pending" });
  } catch (e) {
    console.error("dev-status error:", e);
    return NextResponse.json({ status: "pending" });
  }
}

// ASSISTANT_FINAL: true
