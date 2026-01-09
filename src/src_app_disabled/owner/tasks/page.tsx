"use client";

import { useEffect, useState } from "react";

type Task = { id: string; type: string; title: string; status: "open"|"approved"|"rejected"|"done"; createdAt: string; payload: any };

export default function OwnerTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [msg, setMsg] = useState("");

  async function load() {
    const res = await fetch("/api/owner/tasks");
    const j = await res.json();
    setTasks(j.tasks || []);
  }

  useEffect(() => { load(); }, []);

  async function setStatus(id: string, status: Task["status"]) {
    setMsg("");
    const res = await fetch("/api/owner/tasks", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    const j = await res.json().catch(() => ({}));
    if (!res.ok) { setMsg(`فشل: ${res.status} ${j?.error || ""}`); return; }
    await load();
    setMsg("تم ✅");
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6" dir="rtl">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">صندوق المهام اليدوية</h1>
          <p className="text-sm text-gray-600 mt-1">أي شيء على وضع Manual يطلع هنا للموافقة/الرفض.</p>
        </div>
        <a className="rounded-xl border px-3 py-2 hover:bg-gray-50" href="/owner">رجوع</a>
      </div>

      {msg && <div className="mt-3 text-sm text-green-700">{msg}</div>}

      <div className="mt-5 grid gap-3">
        {tasks.length === 0 ? (
          <div className="rounded-2xl border p-4 text-sm text-gray-600">ما فيه مهام حالياً.</div>
        ) : tasks.map((t) => (
          <div key={t.id} className="rounded-2xl border p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="font-bold">{t.title}</div>
                <div className="text-xs text-gray-500">
                  {t.type} • {new Date(t.createdAt).toLocaleString("en-US")} • الحالة: {t.status}
                </div>
              </div>

              <div className="flex gap-2">
                <button className="rounded-xl border px-3 py-2 hover:bg-gray-50" onClick={() => setStatus(t.id, "approved")}>قبول</button>
                <button className="rounded-xl border px-3 py-2 hover:bg-gray-50" onClick={() => setStatus(t.id, "rejected")}>رفض</button>
                <button className="rounded-xl border px-3 py-2 hover:bg-gray-50" onClick={() => setStatus(t.id, "done")}>تم</button>
              </div>
            </div>

            <details className="mt-3">
              <summary className="cursor-pointer text-sm text-sky-700">عرض التفاصيل</summary>
              <pre className="mt-2 bg-gray-50 border rounded-xl p-3 text-xs overflow-auto">{JSON.stringify(t.payload, null, 2)}</pre>
            </details>
          </div>
        ))}
      </div>
    </div>
  );
}

// ASSISTANT_FINAL: true
