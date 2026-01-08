"use client";

import { useEffect, useRef, useState } from "react";
import { fmtDateTimeAR } from "@/lib/datetime";

type V = {
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  decidedAt?: string;
  verifiedAt?: string;
  rejectedAt?: string;
  decisionReason?: string | null;
} | null;

export default function VerifyLiveStatus() {
  const [v, setV] = useState<V>(null);
  const lastStatus = useRef<string | undefined>(undefined);

  async function load() {
    const r = await fetch("/api/verify/me", { cache: "no-store" });
    const j = await r.json().catch(() => ({}));
    if (!j?.ok) return;

    const nv: V = j.verification ?? null;
    setV(nv);

    const s = nv?.status;
    if (s && lastStatus.current && s !== lastStatus.current) {
      if (s === "verified") alert("تم قبول التوثيق ✅");
      if (s === "rejected") alert("تم رفض التوثيق ❌");
    }
    lastStatus.current = s;
  }

  useEffect(() => {
    load();
    const t = setInterval(load, 4000);
    return () => clearInterval(t);
  }, []);

  const status = v?.status || "—";

  return (
    <div className="text-sm text-slate-700 leading-7">
      <div>حالة التوثيق: <b>{status}</b></div>
      <div>تم الإرسال: {fmtDateTimeAR(v?.createdAt ?? null)}</div>
      <div>آخر تحديث: {fmtDateTimeAR(v?.updatedAt ?? null)}</div>
      <div>وقت القرار: {fmtDateTimeAR(v?.decidedAt ?? null)}</div>
      {v?.decisionReason ? <div>سبب القرار: {v.decisionReason}</div> : null}
    </div>
  );
}

// ASSISTANT_FINAL: true
