// ASSISTANT_FINAL: true
"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function NewRequestPage() {
  const sp = useSearchParams();
  const [category, setCategory] = useState("");
  const [goal, setGoal] = useState("");
  const [style, setStyle] = useState("");
  const [refs, setRefs] = useState("");
  const [budget, setBudget] = useState("");
  const [deadline, setDeadline] = useState("");

  useEffect(() => {
    const c = sp.get("category");
    if (c) setCategory(c);
  }, [sp]);

  function submit() {
    alert("تم إرسال طلبك ✅ (ربط الحفظ لاحقاً)");
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <div className="flex items-center gap-2 text-gray-500 text-sm">
        <Link href="/">الرئيسية</Link><span>›</span><span>الطلبات</span><span>›</span><span className="font-semibold">طلب جديد</span>
      </div>

      <h1 className="text-3xl font-extrabold mt-2">طلب مخصّص</h1>
      <p className="text-gray-600 mt-1">املأ الحقول التالية لنوصّلك بأفضل بائعين.</p>

      <div className="mt-6 rounded-2xl border p-4 space-y-4">
        <div>
          <label className="block text-sm mb-1">القسم</label>
          <input value={category} onChange={(e)=>setCategory(e.target.value)} placeholder="مثلاً: تصميم" className="w-full rounded-2xl border px-4 py-2" />
        </div>
        <div>
          <label className="block text-sm mb-1">الهدف من التصميم</label>
          <textarea value={goal} onChange={(e)=>setGoal(e.target.value)} placeholder="مثلاً: شعار نصّي بسيط لمتجر قهوة" className="w-full rounded-2xl border px-4 py-2 h-24" />
        </div>
        <div>
          <label className="block text-sm mb-1">الأسلوب/النمط المرغوب</label>
          <input value={style} onChange={(e)=>setStyle(e.target.value)} placeholder="Minimal, Monoline, Arabic Calligraphy..." className="w-full rounded-2xl border px-4 py-2" />
        </div>
        <div>
          <label className="block text-sm mb-1">أمثلة/مراجع تعجبك (روابط)</label>
          <textarea value={refs} onChange={(e)=>setRefs(e.target.value)} placeholder="ضع روابط أعمال مشابهة" className="w-full rounded-2xl border px-4 py-2 h-20" />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">الميزانية المتوقعة (ر.س)</label>
            <input value={budget} onChange={(e)=>setBudget(e.target.value)} type="number" min={10} placeholder="مثلاً: 100" className="w-full rounded-2xl border px-4 py-2" />
          </div>
          <div>
            <label className="block text-sm mb-1">المدة المطلوبة</label>
            <input value={deadline} onChange={(e)=>setDeadline(e.target.value)} placeholder="24س / 3 أيام / أسبوع" className="w-full rounded-2xl border px-4 py-2" />
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <button onClick={submit} className="rounded-2xl border px-4 py-2 bg-black text-white">إرسال الطلب</button>
          <Link href="/" className="rounded-2xl border px-4 py-2">إلغاء</Link>
        </div>
      </div>
    </div>
  );
}
