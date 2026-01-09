"use client";

import { useEffect, useState } from "react";
import { fmtDateTimeAMPM_GREG } from "@/lib/datetime";

type VerifyItem = {
  uid?: string;
  status?: string;
  idBack?: { url?: string; status?: string; qualityScore?: number };
  selfie?: { url?: string; status?: string; match?: number };
  [key: string]: any;
};

type ApiState = {
  loading: boolean;
  error: string;
};

export default function AdminVerificationsPage() {
  const [adminInfo, setAdminInfo] = useState<{ ok?: boolean; role?: string; email?: string } | null>(null);
  const [items, setItems] = useState<VerifyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [autoEnabled, setAutoEnabled] = useState<boolean | null>(null);
  const [savingAuto, setSavingAuto] = useState(false);
  const [deciding, setDeciding] = useState<string | null>(null);

  async function loadList() {
    setLoading(true);
    const res = await fetch("/api/admin/verification/list", { cache: "no-store" });
    const data = await res.json().catch(() => ({ ok: false }));
    if (data.ok && Array.isArray(data.items)) setItems(data.items);
    setLoading(false);
  }

  async function loadAdmin() {
    try {
      const res = await fetch(`/api/admin/me`, { cache: "no-store", credentials: "include" });
      const data = await res.json().catch(() => ({ ok: false }));
      setAdminInfo(data);
    } catch (e) {
      setAdminInfo({ ok: false });
    }
  }

  function toPublicFileUrl(v?: string | null) {
    if (!v) return null;
    let s = String(v).trim();
    if (!s) return null;

    s = s.replace(/^\/?public\//, "/");

    if (!s.startsWith("/") && s.startsWith("uploads/")) s = "/" + s;

    if (!s.startsWith("/") && !s.startsWith("http")) s = "/uploads/" + s;

    return s;
  }

  async function loadAuto() {
    const res = await fetch("/api/admin/settings/verify-auto", { cache: "no-store" });
    const data = await res.json().catch(() => ({ ok: false }));
    if (data.ok) setAutoEnabled(!!data.enabled);
  }

  useEffect(() => {
    loadList();
    loadAuto();
    loadAdmin();
  }, []);

  async function toggleAuto() {
    if (autoEnabled === null) return;
    setSavingAuto(true);
    const res = await fetch("/api/admin/settings/verify-auto", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ enabled: !autoEnabled }),
    });
    const data = await res.json().catch(() => ({ ok: false }));
    if (data.ok) setAutoEnabled(!!data.enabled);
    setSavingAuto(false);
  }

  async function decide(sessionId: string | null, decision: "approve" | "reject") {
    if (!sessionId) {
      alert("غير معروف: لا يوجد sessionId");
      return;
    }
    let reason: string | null = null;
    if (decision === "reject") {
      reason = window.prompt("سبب الرفض؟ (مثال: صورة غير واضحة، هوية لا تطابق الاسم، الخ)") || "تم الرفض لعدم استيفاء شروط التوثيق.";
    }
    setDeciding(`${sessionId}:${decision}`);
    try {
      // Use POST (also supported) so browsers that default to POST work too
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      // In development you can set NEXT_PUBLIC_ADMIN_LOCAL_KEY to enable dev fallback header
      if (typeof process !== "undefined" && process.env.NEXT_PUBLIC_ADMIN_LOCAL_KEY) {
        headers["x-admin-key"] = process.env.NEXT_PUBLIC_ADMIN_LOCAL_KEY as string;
      }

      const res = await fetch(`/api/admin/verifications/${sessionId}`, {
        method: "POST",
        headers,
        credentials: "include",
        cache: "no-store",
        body: JSON.stringify({ action: decision === "approve" ? "approve" : "reject", reason }),
      });

      const text = await res.text().catch(() => "");
      setDeciding(null);

      if (!res.ok) {
        throw new Error(text || `HTTP ${res.status}`);
      }

      alert(decision === "approve" ? "تم قبول التوثيق ✅" : "تم رفض التوثيق ❌");
      location.reload();
    } catch (err: any) {
      setDeciding(null);
      alert(`فشل الحفظ: ${err?.message || err}`);
    }
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-2 text-gray-800 text-center">
        لوحة التوثيق – منصة.كوم
      </h1>

      {/* small admin status banner (non-intrusive) */}
      {adminInfo && (
        <div className="text-center mb-3 text-sm">
          {adminInfo.ok ? (
            <span className="text-green-700">مسجل دخول كـ {adminInfo.role || "admin"}{adminInfo.email ? ` — ${adminInfo.email}` : ""}</span>
          ) : (
            <span className="text-red-600">غير مسجل دخول كأدمن</span>
          )}
        </div>
      )}

      <p className="text-sm text-gray-600 mb-4 text-center">
        هنا تشوف طلبات توثيق الهوية. النظام يعمل آليًا (قبول بعد عدد ساعات
        لو كل شيء سليم) 👌، لكن عندك دائمًا خيار التدخل اليدوي مثل الشرطي:
        قبول ✅ أو رفض ❌ قبل أو بعد القرار الآلي.
      </p>

      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 text-sm text-gray-700 mb-6">
        <strong className="block mb-1">معلومة مهمة:</strong>
        <ul className="list-disc ms-5 space-y-1">
          <li>
            الملفات تُفحص آليًا (حجم، وضوح، وهج، EXIF، إلخ). اللي فيه مشاكل
            ينرفض فورًا من السيرفر، وما يوصل هنا.
          </li>
          <li>
            اللي تشوفهم هنا هم اللي عدى الفحص التقني، وحالتهم{" "}
            <span className="font-semibold">قيد المراجعة</span> أو حالة
            مخصّصة.
          </li>
          <li>
            قرارك اليدوي يُسجّل في{" "}
            <span className="font-semibold">brain-safe</span> كجزء من
            &quot;القاضي الإلكتروني&quot; عشان يتعلم مع الوقت من أسلوبك.
          </li>
        </ul>
      </div>

      {/* Auto-approve toggle */}
      <div className="mb-6 p-4 rounded-xl border flex items-center justify-between gap-4 bg-sky-50">
        <div>
          <div className="font-semibold mb-1">وضع التوثيق التلقائي (المحلي)</div>
          <div className="text-sm text-gray-600">
            إذا كان التوثيق التلقائي مفعّل، النظام يحاول يقبل الطلب مباشرة إذا
            الصورة واضحة والبيانات معقولة. وإلا تبقى "قيد المراجعة" وتحتاج قرار
            يدوي من هنا.
          </div>
        </div>
        <button
          onClick={toggleAuto}
          disabled={savingAuto || autoEnabled === null}
          className={`px-4 py-2 rounded-full text-sm font-bold ${
            autoEnabled ? "bg-green-600 text-white" : "bg-gray-300 text-gray-800"
          }`}
        >
          {savingAuto
            ? "جار الحفظ..."
            : autoEnabled
            ? "التوثيق التلقائي: يعمل"
            : "التوثيق التلقائي: متوقف"}
        </button>
      </div>

      {loading && <div className="text-center">جاري التحميل...</div>}

      {!loading && items.length === 0 && (
        <div className="text-center text-gray-500">لا توجد طلبات توثيق حالياً.</div>
      )}

      <div className="grid gap-4">
        {items.map((item) => {
          const sessionId = item.id || item.sessionId || item._id || null;
          const displayUser = item.uid || item.userId || item.user?.id || sessionId || `#`;
          const status = item.status || "—";
          const backUrl = toPublicFileUrl(item.idBack?.url || item.idBack || item.idBackUrl || item.id_path);
          const backScore = item.idBack?.qualityScore || item.qualityScore;
          const selfieUrl = toPublicFileUrl(item.selfie?.url || item.selfie || item.selfieUrl || item.selfie_path);
          const selfieMatch = item.selfie?.match;

          return (
            <div
              key={sessionId || Math.random().toString(36).slice(2, 9)}
              className="bg-white rounded-2xl shadow-sm border border-black/10 p-4 flex flex-col md:flex-row md:items-start gap-4"
            >
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <div className="text-xs text-gray-500">المستخدم</div>
                    <div className="font-mono text-sm">{displayUser}</div>
                  </div>
                        <div className="text-right">
                          <div className="inline-flex items-center px-2 py-1 rounded-full text-xs border bg-gray-50">
                            الحالة: <span className="ms-1 font-semibold text-gray-800">{status}</span>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            <div className="flex items-center justify-between w-full">
                              <span className="text-slate-500">تاريخ الطلب:</span>
                              <span className="font-medium text-slate-700 text-right" dir="ltr">
                                {fmtDateTimeAMPM_GREG(item.createdAt || item.submittedAt || item.requestedAt || item.created_at || null)}
                              </span>
                            </div>

                            <div className="flex items-center justify-between w-full mt-1">
                              <span className="text-slate-500">وقت القرار:</span>
                              <span className="font-medium text-slate-700 text-right" dir="ltr">
                                {fmtDateTimeAMPM_GREG(item.decidedAt ?? item.updatedAt ?? null)}
                              </span>
                            </div>
                          </div>
                        </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-2 text-xs text-gray-600">
                  <div>
                    <div className="font-semibold mb-1">ظهر الهوية</div>
                    {backUrl ? (
                      <a href={backUrl} target="_blank" rel="noreferrer" className="inline-block text-cyan-700 hover:underline">
                        عرض الصورة 🔍
                      </a>
                    ) : (
                      <div className="text-gray-400">لا يوجد رابط</div>
                    )}
                    {typeof backScore === "number" && (
                      <div className="mt-1">جودة تقديرية: <span className="font-mono">{backScore}</span></div>
                    )}
                  </div>
                  <div>
                    <div className="font-semibold mb-1">السيلفي مع الهوية</div>
                    {selfieUrl ? (
                      <a href={selfieUrl} target="_blank" rel="noreferrer" className="inline-block text-cyan-700 hover:underline">عرض السيلفي 🔍</a>
                    ) : (
                      <div className="text-gray-400">لا يوجد رابط</div>
                    )}
                    {typeof selfieMatch === "number" && (
                      <div className="mt-1">تطابق وجه/هوية (افتراضي): <span className="font-mono">{selfieMatch}%</span></div>
                    )}
                  </div>
                </div>

                {item.decisionReason && (
                  <div className="mt-2 text-xs text-gray-500">آخر سبب قرار: {item.decisionReason}</div>
                )}
              </div>

                <div className="flex flex-col gap-2 md:w-40">
                <button
                  onClick={() => decide(sessionId, "approve")}
                  disabled={deciding === `${sessionId}:approve` || status === "verified"}
                  className="w-full py-2 rounded-xl text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-60"
                >
                  {deciding === `${sessionId}:approve` ? "جار القبول..." : "✅ قبول التوثيق"}
                </button>
                <button
                  onClick={() => decide(sessionId, "reject")}
                  disabled={deciding === `${sessionId}:reject`}
                  className="w-full py-2 rounded-xl text-sm font-semibold border border-red-300 text-red-700 hover:bg-red-50 disabled:opacity-60"
                >
                  {deciding === `${sessionId}:reject` ? "جار الرفض..." : "❌ رفض / إعادة الطلب"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}

// ASSISTANT_FINAL: true
