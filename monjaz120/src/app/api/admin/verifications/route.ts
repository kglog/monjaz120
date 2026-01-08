// 📄 src/app/api/admin/verifications/route.ts
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const FILE_PATH = path.join(process.cwd(), "data", "verification-requests.json");

type StoredReq = {
  uid?: string;
  status?: string;
  createdAt?: number;
  idBack?: {
    url?: string | null;
    qualityScore?: number | null;
  };
  selfie?: {
    url?: string | null;
    match?: number | null;
  };
};

async function loadAll(): Promise<StoredReq[]> {
  const raw = await fs.readFile(FILE_PATH, "utf8").catch(() => "[]");
  try {
    return JSON.parse(raw || "[]");
  } catch {
    return [];
  }
}

async function saveAll(arr: StoredReq[]) {
  await fs.mkdir(path.dirname(FILE_PATH), { recursive: true }).catch(() => {});
  await fs.writeFile(FILE_PATH, JSON.stringify(arr, null, 2), "utf8");
}

// GET: return list for admin UI
export async function GET() {
  const arr = await loadAll();

  const items = arr.map((req, index) => {
    const anyReq: any = req;
    return {
      index,
      uid: anyReq.uid ?? "anon",
      status: anyReq.status ?? "pending",
      createdAt: anyReq.createdAt ?? null,
      idBackUrl: anyReq.idBack?.url ?? null,
      selfieUrl: anyReq.selfie?.url ?? null,
      qualityScore: anyReq.idBack?.qualityScore ?? anyReq.qualityScore ?? null,
      selfieMatch: anyReq.selfie?.match ?? anyReq.selfie_match_score ?? null,
    };
  });

  return NextResponse.json({ ok: true, items });
}

// POST: admin decision by index
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);

  if (!body || typeof body.index !== "number" || !["approve", "reject"].includes(body.decision)) {
    return NextResponse.json({ ok: false, error: "BAD_REQUEST" }, { status: 400 });
  }

  const idx = body.index as number;
  const decision = body.decision as "approve" | "reject";
  const reason = typeof body.reason === "string" ? body.reason.trim() : "";

  const arr = await loadAll();

  if (idx < 0 || idx >= arr.length) {
    return NextResponse.json({ ok: false, error: "NOT_FOUND" }, { status: 404 });
  }

  const rec: any = arr[idx] ?? {};

  rec.status = decision === "approve" ? "verified" : "rejected";
  rec.decision = decision;
  rec.decidedAt = Date.now();
  if (decision === "reject") {
    rec.rejectReason = reason || "no_reason";
  }

  arr[idx] = rec;
  await saveAll(arr);

  return NextResponse.json({ ok: true, item: { index: idx, status: rec.status } });
}

// ASSISTANT_FINAL: true
