// 📄 src/app/api/admin/verification/decide/route.ts
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import brain from "@/core/brain-safe";

const FILE = path.join(process.cwd(), "data", "verification-requests.json");

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const uid = body.uid as string | undefined;
    const decision = body.decision as "approve" | "reject" | undefined;
    const reason = (body.reason as string | undefined) || null;

    if (!uid || !decision) {
      return NextResponse.json({ ok: false, error: "uid_or_decision_missing" }, { status: 400 });
    }

    const raw = await fs.readFile(FILE, "utf8").catch(() => "[]");
    const arr: any[] = JSON.parse(raw || "[]");
    const idx = arr.findIndex((r) => r.uid === uid || r.userId === uid);

    if (idx === -1) {
      return NextResponse.json({ ok: false, error: "request_not_found" }, { status: 404 });
    }

    const rec = arr[idx] || {};
    const now = Date.now();

    const status = decision === "approve" ? "verified" : "rejected";
    rec.status = status;
    rec.verifyStatus = status;
    rec.decision = decision;
    rec.decisionReason = reason;
    rec.reviewedBy = "admin-local";
    rec.decidedAt = now;

    if (decision === "reject") {
      rec.riskScore = (rec.riskScore || 0) + 1;
    }

    arr[idx] = rec;
    await fs.writeFile(FILE, JSON.stringify(arr, null, 2), "utf8");

    try {
      await brain.log("verify_manual_decision", {
        uid,
        decision,
        reason,
        status,
        time: now,
        qualityScore: rec.idBack?.qualityScore ?? null,
        selfieMatch: rec.selfie?.match ?? null,
        riskScore: rec.riskScore ?? null,
      });
    } catch (e) {
      console.warn("brain log failed", e);
    }

    return NextResponse.json({ ok: true, status });
  } catch (err) {
    console.error("verification decide error", err);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}

// ASSISTANT_FINAL: true
