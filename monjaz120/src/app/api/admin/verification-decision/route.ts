import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const VERIF_PATH = path.join(process.cwd(), "data", "verification-requests.json");

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { requestId, decision } = body || {};

    if (!requestId || !decision) {
      return NextResponse.json({ ok: false, error: "invalid_payload" }, { status: 400 });
    }

    const raw = await fs.readFile(VERIF_PATH, "utf8").catch(() => "[]");
    const arr: any[] = JSON.parse(raw || "[]");

    // Try find by explicit id field
    let idx = arr.findIndex((r: any) => r.id === requestId);

    // If not found, and requestId looks like an index, try numeric index
    if (idx === -1) {
      const maybeIndex = Number(requestId);
      if (!Number.isNaN(maybeIndex) && maybeIndex >= 0 && maybeIndex < arr.length) {
        idx = maybeIndex;
      }
    }

    if (idx === -1) {
      return NextResponse.json({ ok: false, error: "NOT_FOUND" }, { status: 404 });
    }

    const entry = arr[idx];

    if (decision === "accept" || decision === "approve") {
      arr[idx].status = "verified";
      arr[idx].decidedAt = Date.now();
      arr[idx].decidedBy = "admin_manual";

      // 🔴 If you have a real DB (Prisma), update the user record here.
      // Example (uncomment and adapt when Prisma client is available):
      // import { prisma } from '@/lib/prisma';
      // await prisma.user.update({ where: { id: entry.uid }, data: { verifyStatus: 'verified' } });

    } else if (decision === "reject") {
      arr[idx].status = "rejected";
      arr[idx].decidedAt = Date.now();
      arr[idx].decidedBy = "admin_manual";
    } else {
      return NextResponse.json({ ok: false, error: "invalid_decision" }, { status: 400 });
    }

    await fs.writeFile(VERIF_PATH, JSON.stringify(arr, null, 2), "utf8");

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("admin/verification-decision error:", e);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}

// ASSISTANT_FINAL: true
