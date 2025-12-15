"use client";
import React, { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

const containsForbidden = (text: string) => {
  const forbidden = [
    /\b(05\d{8}|\+9665\d{8}|\d{7,12})\b/,
    /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/,
    /(https?:\/\/|www\.)/i,
    /\b(واتس|واتساب|whatsapp|telegram|تليجرام|snap|discord|@)\b/i,
  ];
  return forbidden.some((r) => r.test(text));
};

export default function RequestModal({ open, onClose }: Props) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!title.trim()) {
      setError("اكتب اسم الخدمة اللي تبيها");
      return;
    }
    if (containsForbidden(title) || containsForbidden(desc)) {
      setError("🚫 يمنع إدخال أرقام/روابط/وسائل تواصل. اكتب وصف الخدمة فقط.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim(), description: desc.trim() }),
      });
  if (!res.ok) throw new Error(await res.text());
  setTitle("");
  setDesc("");
  onClose();
  // go to buyer's requests page to view the created request
  try { window.location.href = '/my-requests'; } catch(e){}
    } catch (err: any) {
      // If server failed, save the request locally so user experience is not blocked.
      try {
  const pending = JSON.parse(localStorage.getItem('pending_requests' ) || '[]');
  const localId = `local_${Date.now()}`;
  pending.unshift({ __localId: localId, id: localId, title: title.trim(), description: desc.trim(), createdAt: new Date().toISOString(), status: 'pending' });
        localStorage.setItem('pending_requests', JSON.stringify(pending));
        // close modal and inform user
        setTitle("");
        setDesc("");
        onClose();
        // give quick feedback
        try { window.alert('تم حفظ طلبك مؤقتاً على جهازك وسيتم مزامنته لاحقاً.'); } catch(e){}
  try { window.location.href = '/my-requests'; } catch(e){}
      } catch (saveErr) {
        setError(err.message || "حصل خطأ");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
  <form onSubmit={handleSubmit} className="w-full max-w-lg bg-[#ffffff] rounded p-6 shadow-lg">
        <h3 className="text-lg font-semibold mb-2">ماحصلت طلبك؟ اكتب طلبك هنا</h3>
        <p className="text-sm text-slate-500 mb-4">أكتب اسم الخدمة بإيجاز — البائعين سيعرضون عليك مباشرة داخل المنصة.</p>

        {error && <div className="mb-3 text-red-600">{error}</div>}

        <label className="block mb-2 text-sm">الخدمة المطلوبة</label>
        <input className="w-full mb-3 p-2 border rounded" value={title} onChange={(e)=> setTitle(e.target.value)} placeholder="مثال: تصميم شعار احترافي" />

        <label className="block mb-2 text-sm">تفاصيل إضافية (اختياري)</label>
        <textarea className="w-full mb-3 p-2 border rounded" value={desc} onChange={(e)=> setDesc(e.target.value)} rows={4} placeholder="أضف التفاصيل التي تحتاجها"></textarea>

        <div className="flex items-center justify-between gap-3">
          <button type="submit" disabled={loading} className="px-4 py-2 bg-cyan-600 text-white rounded">
            {loading ? "يرجى الانتظار..." : "نشر الطلب"}
          </button>
          <button type="button" onClick={onClose} className="px-3 py-2 border rounded">إلغاء</button>
        </div>

        <p className="mt-3 text-xs text-slate-500">
          🔒 تذكير: جميع المراسلات والدفع داخل منصة.كوم فقط. أي اتفاق خارج المنصة يفقد الحماية وسيؤدي لإجراءات.
        </p>
      </form>
    </div>
  );
}
