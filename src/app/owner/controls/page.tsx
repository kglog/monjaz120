"use client";

import { useEffect, useState } from "react";

type Flag = { key: string; title: string; enabled: boolean; mode: "auto" | "manual"; updatedAt: string };

export default function OwnerControls() {
  const [flags, setFlags] = useState<Flag[]>([]);
  const [msg, setMsg] = useState("");

  async function load() {
    const res = await fetch("/api/owner/flags");
    const j = await res.json();
    setFlags(j.flags || []);
  }

  useEffect(() => { load(); }, []);

  async function patch(key: string, patch: Partial<Flag>) {
    setMsg("");
    const res = await fetch("/api/owner/flags", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, ...patch }),
    });
    const j = await res.json().catch(() => ({}));
    if (!res.ok) { setMsg(`فشل: ${res.status} ${j?.error || ""}`); return; }
    await load();
    setMsg("تم الحفظ ✅");
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6" dir="rtl">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">مركز التحكم (تلقائي / يدوي)</h1>
          <p className="text-sm text-gray-600 mt-1">كل نظام له: تشغيل/إيقاف + وضع تلقائي أو يدوي.</p>
        </div>
        <a className="rounded-xl border px-3 py-2 hover:bg-gray-50" href="/owner">رجوع</a>
      </div>

      {msg && <div className="mt-3 text-sm text-green-700">{msg}</div>}

      <div className="mt-5 grid gap-3">
        {flags.map((f) => (
          <div key={f.key} className="rounded-2xl border p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="font-bold">{f.title}</div>
                <div className="text-xs text-gray-500">Key: {f.key} • آخر تحديث: {new Date(f.updatedAt).toLocaleString("en-US")}</div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => patch(f.key, { enabled: !f.enabled })}
                  className={`rounded-xl px-3 py-2 border ${f.enabled ? "bg-sky-600 text-white border-sky-600" : "bg-white"}`}
                >
                  {f.enabled ? "مُفعّل" : "متوقف"}
                </button>

                <select
                  value={f.mode}
                  onChange={(e) => patch(f.key, { mode: e.target.value as any })}
                  className="rounded-xl border px-3 py-2"
                >
                  <option value="auto">تلقائي</option>
                  <option value="manual">يدوي</option>
                </select>

                <a className="rounded-xl border px-3 py-2 hover:bg-gray-50" href="/owner/tasks">
                  المهام اليدوية
                </a>
              </div>
            </div>

            {f.mode === "manual" && (
              <div className="mt-3 text-sm text-amber-700 bg-amber-50 border border-amber-100 rounded-xl p-3">
                هذا النظام على وضع <b>يدوي</b> — أي قرارات “حساسة” لازم تمر عبر صندوق المهام اليدوية (موافق/رفض).
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ASSISTANT_FINAL: true
