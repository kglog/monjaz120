"use client";

import { useState, useRef } from "react";

export default function VerifyPage() {
  const [fullName, setFullName] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [dob, setDob] = useState(""); // yyyy-mm-dd
  const [selfieFile, setSelfieFile] = useState<File | null>(null);
  const [idFile, setIdFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  // ✅ إضافة جديدة: حالة الطلب
  const [status, setStatus] = useState<string | null>(null);

  const selfiePreview = useRef<string | null>(null);
  const idPreview = useRef<string | null>(null);

  function validate(): boolean {
    const errs: string[] = [];

    if (!fullName.trim()) errs.push("الاسم الكامل مطلوب.");
    if (!/^[\p{L}\s\.\-']+$/u.test(fullName.trim())) {
      errs.push("الاسم يحتوي رموز أو أرقام غير مسموح بها.");
    }

    if (!nationalId.trim()) errs.push("رقم الهوية مطلوب.");
    if (!/^\d+$/.test(nationalId.trim())) {
      errs.push("رقم الهوية يجب أن يحتوي أرقام فقط.");
    }
    if (nationalId.trim() && nationalId.trim().length < 6) {
      errs.push("رقم الهوية يبدو قصيرًا جداً.");
    }

    if (!dob) errs.push("تاريخ الميلاد مطلوب.");
    if (dob && new Date(dob) > new Date()) {
      errs.push("تاريخ الميلاد لا يمكن أن يكون في المستقبل.");
    }

    if (!selfieFile) errs.push("رفع صورة سيلفي مطلوب.");
    if (!idFile) errs.push("رفع صورة الهوية/البطاقة مطلوب.");

    [selfieFile, idFile].forEach((f) => {
      if (f) {
        const maxMB = 5;
        if (f.size / 1024 / 1024 > maxMB) {
          errs.push(`${f.name}: حجم الملف أكبر من ${maxMB}MB.`);
        }
        if (!["image/jpeg", "image/png"].includes(f.type)) {
          errs.push(`${f.name}: نوع الملف يجب أن يكون JPG أو PNG.`);
        }
      }
    });

    setErrors(errs);
    return errs.length === 0;
  }

  function handleNationalIdChange(e: React.ChangeEvent<HTMLInputElement>) {
    const digits = e.target.value.replace(/\D/g, "");
    setNationalId(digits);
  }

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFullName(e.target.value);
  }

  function handleFileChange(
    e: React.ChangeEvent<HTMLInputElement>,
    which: "selfie" | "id"
  ) {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;

    const url = URL.createObjectURL(file);
    if (which === "selfie") {
      selfiePreview.current && URL.revokeObjectURL(selfiePreview.current);
      selfiePreview.current = url;
      setSelfieFile(file);
    } else {
      idPreview.current && URL.revokeObjectURL(idPreview.current);
      idPreview.current = url;
      setIdFile(file);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("fullName", fullName.trim());
      fd.append("nationalId", nationalId.trim());
      fd.append("dob", dob);
      if (selfieFile) fd.append("selfie", selfieFile);
      if (idFile) fd.append("idCard", idFile);

      const res = await fetch("/api/verify", {
        method: "POST",
        body: fd,
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || "فشل إرسال الطلب");
      }

      // ✅ تحديث حالة الطلب من الباك اند
      setStatus(data.status || "قيد المراجعة");

      alert("تم إرسال طلب التوثيق بنجاح. سنوافيك بالنتيجة قريباً.");

      setFullName("");
      setNationalId("");
      setDob("");
      setSelfieFile(null);
      setIdFile(null);
      selfiePreview.current && URL.revokeObjectURL(selfiePreview.current);
      idPreview.current && URL.revokeObjectURL(idPreview.current);
      selfiePreview.current = null;
      idPreview.current = null;
      setErrors([]);
    } catch (err: any) {
      console.error(err);
      setErrors([err.message || "حدث خطأ أثناء الإرسال"]);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
     <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg border-[1px] border-black">

        <h1 className="text-2xl font-semibold text-gray-800 mb-4">توثيق الهوية</h1>
        <p className="text-gray-600 mb-6">
          الخطوة الرابعة: ارفع صورة سيلفي وعلى يمينها صورة البطاقة (وجه + صورة البطاقة في نفس الإرسال).
          تأكد أن التاريخ والأسماء صحيحة بالأرقام فقط حيث ينطبق.
        </p>

        {/* ✅ عرض حالة الطلب إذا فيه */}
        {status && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 text-blue-700 rounded">
            حالة الطلب الحالية: <b>{status}</b>
          </div>
        )}

        {errors.length > 0 && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">
            <ul className="list-disc list-inside space-y-1">
              {errors.map((er, i) => (
                <li key={i}>{er}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 🔥 بقية النموذج حقك كما هو بالضبط */}
          <div>
            <label className="block text-sm font-medium text-gray-700">الاسم الكامل</label>
            <input
              value={fullName}
              onChange={handleNameChange}
              placeholder="مثال: محمد عبد الله"
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <p className="text-xs text-gray-400 mt-1">الاسم كما هو في الهوية الرسمية.</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">رقم الهوية</label>
              <input
                value={nationalId}
                onChange={handleNationalIdChange}
                placeholder="أرقام فقط"
                inputMode="numeric"
                className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <p className="text-xs text-gray-400 mt-1">يُسمح بالأرقام فقط — سنمنع الحروف تلقائياً.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">تاريخ الميلاد</label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                max={new Date().toISOString().split("T")[0]}
              />
              <p className="text-xs text-gray-400 mt-1">استخدم التاريخ — لا تقم بإدخال حروف.</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">صور التوثيق</label>
            <div className="mt-2 grid grid-cols-2 gap-4 items-start">
              {/* سيلفي */}
              <div>
                <div className="text-xs font-medium text-gray-600 mb-1">سيلفي (وجهي مع خلفية واضحة)</div>
                <label className="flex items-center justify-center h-36 border border-dashed rounded cursor-pointer bg-white">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, "selfie")}
                    className="hidden"
                  />
                  {selfiePreview.current ? (
                    // @ts-ignore
                    <img src={selfiePreview.current} alt="selfie preview" className="h-36 object-cover rounded" />
                  ) : (
                    <div className="text-center text-sm text-gray-500 px-2">
                      اضغط لإختيار صورة سيلفي <br /> (JPG/PNG &lt; 5MB)
                    </div>
                  )}
                </label>
              </div>

              {/* صورة الهوية */}
              <div>
                <div className="text-xs font-medium text-gray-600 mb-1">صورة البطاقة (وجه البطاقة واضح)</div>
                <label className="flex items-center justify-center h-36 border border-dashed rounded cursor-pointer bg-white">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, "id")}
                    className="hidden"
                  />
                  {idPreview.current ? (
                    // @ts-ignore
                    <img src={idPreview.current} alt="id preview" className="h-36 object-contain rounded" />
                  ) : (
                    <div className="text-center text-sm text-gray-500 px-2">
                      اضغط لإختيار صورة البطاقة <br /> (JPG/PNG &lt; 5MB)
                    </div>
                  )}
                </label>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              ضع السيلفي بحيث يظهر وجهك بجانب البطاقة في الصورة أو ارفع كل صورة على حدى — نحتاج وضوح رقم الهوية والاسم.
            </p>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={submitting}
              className={`px-5 py-2 rounded text-white font-medium ${submitting ? "bg-gray-400" : "bg-cyan-600 hover:bg-cyan-700"}`}
            >
              {submitting ? "جاري الإرسال..." : "إرسال طلب التوثيق"}
            </button>

            <div className="text-sm text-gray-500">
              <strong className="text-gray-700">ملاحظة:</strong> عمليات المراجعة قد تستغرق حتى 72 ساعة.
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
