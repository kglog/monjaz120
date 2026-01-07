import React from "react";
"use client";
import { useMemo, useState } from "react";
import ServiceCard, { Service } from "./ServiceCard";

function genOrderCode() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const rand = String(Math.floor(Math.random() * 99999)).padStart(5, "0");
  return `PLAT-${y}${m}${day}-${rand}`;
}

export default function ClientServices({ services }: { services: Service[] }) {
  const [selected, setSelected] = useState<Service | null>(null);
  const [step, setStep] = useState<1|2|3>(1);
  const [form, setForm] = useState({ type: "", style: "", use: "web", rush: "normal", note: "" });
  const orderCode = useMemo(() => genOrderCode(), [selected]);

  const close = () => { setSelected(null); setStep(1); };

  const filtered = useMemo(() => services, [services]); // لاحقاً تربط بالفلاتر

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(s => <ServiceCard key={s.id} s={s} onOrder={setSelected} />)}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-end md:items-center justify-center p-4">
          <div className="w-full md:max-w-xl rounded-2xl bg-white p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="font-semibold">طلب خدمة: {selected.title}</div>
              <button onClick={close} className="text-gray-500">إغلاق</button>
            </div>

            {/* شارة السعر النهائي */}
            <div className="mb-3 text-xs">
              <span className="px-2 py-1 rounded-full bg-green-100 text-green-700">السعر نهائي شامل الضريبة</span>
              <span className="ms-2 text-gray-500">العمولة تُدار داخليًا (غير ظاهرة للعميل)</span>
            </div>

            {step === 1 && (
              <div className="space-y-3">
                <div>
                  <div className="text-sm mb-1">النوع</div>
                  <select className="w-full rounded border p-2"
                    value={form.type} onChange={e=>setForm(f=>({...f,type:e.target.value}))}>
                    <option value="">اختر</option>
                    <option value="logo">شعار</option>
                    <option value="brand">هوية</option>
                    <option value="social">سوشيال</option>
                    <option value="uiux">UI/UX</option>
                  </select>
                </div>
                <div>
                  <div className="text-sm mb-1">الأسلوب</div>
                  <input className="w-full rounded border p-2" placeholder="Minimal / Arabic Calligraphy / Abstract..."
                    value={form.style} onChange={e=>setForm(f=>({...f,style:e.target.value}))}/>
                </div>
                <div className="flex items-center justify-end">
                  <button onClick={()=>setStep(2)} className="px-4 py-2 rounded-xl bg-black text-white">التالي</button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-3">
                <div>
                  <div className="text-sm mb-1">الاستخدام</div>
                  <select className="w-full rounded border p-2"
                    value={form.use} onChange={e=>setForm(f=>({...f,use:e.target.value}))}>
                    <option value="web">ويب</option>
                    <option value="print">طباعة</option>
                    <option value="both">الكل</option>
                  </select>
                </div>
                <div>
                  <div className="text-sm mb-1">السرعة</div>
                  <select className="w-full rounded border p-2"
                    value={form.rush} onChange={e=>setForm(f=>({...f,rush:e.target.value}))}>
                    <option value="normal">عادي</option>
                    <option value="fast">مستعجل</option>
                  </select>
                </div>
                <div>
                  <div className="text-sm mb-1">ملاحظات</div>
                  <textarea className="w-full rounded border p-2" rows={3}
                    value={form.note} onChange={e=>setForm(f=>({...f,note:e.target.value}))}/>
                </div>
                <div className="flex items-center justify-between">
                  <button onClick={()=>setStep(1)} className="px-3 py-2 rounded-xl border">السابق</button>
                  <button onClick={()=>setStep(3)} className="px-4 py-2 rounded-xl bg-black text-white">التالي</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="rounded-xl border p-3 bg-gray-50">
                  <div className="font-semibold mb-1">الملخّص</div>
                  <ul className="text-sm text-gray-700 list-disc ms-4">
                    <li>رمز الطلب: {orderCode}</li>
                    <li>النوع: {form.type || "-"}</li>
                    <li>الأسلوب: {form.style || "-"}</li>
                    <li>الاستخدام: {form.use}</li>
                    <li>السرعة: {form.rush}</li>
                    <li>ملاحظات: {form.note || "—"}</li>
                  </ul>
                </div>

                {/* طرق الدفع: بوابات + تحويل بنكي مؤكد */}
                <div className="rounded-xl border p-3">
                  <div className="text-sm font-semibold mb-1">طرق الدفع</div>
                  <ul className="text-sm text-gray-700 list-disc ms-4">
                    <li>الدفع الفوري: Mada / STC Pay / Apple Pay / Visa / MasterCard (عبر Tap/PayTabs)</li>
                    <li>تحويل بنكي مؤكد آلياً: اكتب رمز الطلب <b>{orderCode}</b> في “ملاحظات التحويل”.</li>
                    <li>رفع إيصال بدل الرمز: نحلّله OCR (المبلغ/التاريخ/الحساب) ونؤكّد تلقائياً إذا تطابق ≥ 95%.</li>
                  </ul>
                </div>

                <div className="flex items-center justify-between">
                  <button onClick={()=>setStep(2)} className="px-3 py-2 rounded-xl border">رجوع</button>
                  <button
                    onClick={()=>{
                      alert(`تم إنشاء الطلب (${orderCode}) — نموذج.\nسيتم التوجيه لعملية الدفع لاحقاً.`);
                      close();
                    }}
                    className="px-4 py-2 rounded-xl bg-black text-white"
                  >
                    ادفع وابدأ
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
// ASSISTANT_FINAL: true
