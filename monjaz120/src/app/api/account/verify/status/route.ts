// 📄 src/app/api/account/verify/status/route.ts
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const FILE_PATH = path.join(process.cwd(), "data", "verification-requests.json");

type StoredReq = {
  uid?: string;
  status?: string;
  createdAt?: number;
};

async function loadAll(): Promise<StoredReq[]> {
  const raw = await fs.readFile(FILE_PATH, "utf8").catch(() => "[]");
  try {
    return JSON.parse(raw || "[]");
  } catch {
    return [];
  }
}

export async function GET(req: Request) {
  // in dev we use anon; later connect to session/user id
  const uid = "anon";

  const arr = await loadAll();

  const latest = [...arr].reverse().find((r: any) => r.uid === uid);

  let status: "unverified" | "pending" | "verified" | "rejected" = "unverified";

  if (latest) {
    const s = (latest as any).status;
    if (s === "verified") status = "verified";
    else if (s === "rejected") status = "rejected";
    else status = "pending";
  }

  return NextResponse.json({ ok: true, status });
}

// ASSISTANT_FINAL: true
