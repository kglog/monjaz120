"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import brain from "@/core/brain";
import { validateFullName, validateSaudiNID, validateBirthDate } from "@/lib/validators";

export default function BasicInfoPage() {
  const [nameAr, setNameAr] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [dob, setDob] = useState("");
  const [error, setError] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Page view event (brain-safe)
    try {
      brain.logEvent("view", { page: "verify/basic-info" });
    } catch (err) {}
  }, []);

  // فلترة رقم الهوية بحيث يقبل فقط أرقام ويمنع الأحرف نهائياً
  const handleNationalIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setNationalId(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key.length === 1 &&
      !/[0-9]/.test(e.key) &&
      !["Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete"].includes(e.key)
    ) {
      e.preventDefault();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = e.clipboardData.getData("Text");
    if (!/^\d+$/.test(pasteData)) {
      e.preventDefault();
    }
  };

  const onFieldFocus = (field: string) => {
    try {
      brain.logEvent("input_focus", { page: "verify/basic-info", field });
    } catch (err) {}
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // client-side validation using shared validators
    const nameErr = validateFullName(name);
    if (nameErr) {
      setError("رجاءً أدخل اسمًا كاملًا صحيحًا.");
      try { brain.logEvent("validation_error", { page: "verify/basic-info", field: "fullName" }); } catch (e) {}
      return;
    }

    const nidErr = validateSaudiNID(nationalId);
    if (nidErr) {
      setError("رقم الهوية غير صالح (10 أرقام ومطابقة للتحقق)."
      );
      try { brain.logEvent("validation_error", { page: "verify/basic-info", field: "national_id" }); } catch (e) {}
      return;
    }

    const dobErr = validateBirthDate(dob);
    if (dobErr) {
      setError("العمر أقل من الحد المسموح.");
      try { brain.logEvent("validation_error", { page: "verify/basic-info", field: "dob" }); } catch (e) {}
      return;
    }

    if (!consent) {
      setError("يرجى الموافقة على استخدام بياناتك للتحقق قبل المتابعة.");
      return;
    }

    setSubmitting(true);
    try {
      try { brain.logEvent("submit", { page: "verify/basic-info" }); } catch (e) {}

      const res = await fetch("/api/account/verify/basic-info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName: name.trim(), nationalId, dob }),
      });

      if (res.status === 429) {
        try { brain.logEvent("ratelimit_triggered", { page: "verify/basic-info" }); } catch (e) {}
        setError("حاولت كثيرًا. رجاءً أكمل التحقق الأمني.");
        setSubmitting(false);
        return;
      }

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data?.error || "فشل في إرسال البيانات. حاول مرة أخرى.");
        setSubmitting(false);
        return;
      }

      router.push("/account/verify/id-front");
    } catch (err) {
      console.error(err);
      setError("فشل في الاتصال بالخادم. تحقق من الشبكة.");
    } finally {
      setSubmitting(false);
    }
  };

  const isFormValid = () => {
    return !validateFullName(name) && !validateSaudiNID(nationalId) && !validateBirthDate(dob) && consent && !submitting;
  };

  return (
  <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow mt-10 border-2 border-black/20">
      <h2 className="text-xl font-bold mb-2 text-center text-cyan-700">البيانات الأساسية</h2>
      <p className="text-sm text-gray-600 text-center mb-6">يُستخدم هذا القسم للتحقق من الهوية فقط. لا نُظهر هذه البيانات لأحد، وتُحذف تلقائيًا بعد اكتمال التحقق.</p>

      <form onSubmit={handleSubmit}>
        <label className="block font-semibold mb-2">الاسم الكامل (بالعربي)</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          onFocus={() => onFieldFocus("fullName")}
          className="w-full mb-2 p-3 border rounded"
          placeholder="اكتب اسمك الرباعي كما في الهوية."
        />
        <div className="text-xs text-gray-500 mb-4">اكتب اسمك الرباعي كما في الهوية.</div>

        <label className="block font-semibold mb-2">رقم الهوية الوطنية</label>
        <input
          type="text"
          value={nationalId}
          onChange={handleNationalIdChange}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          onFocus={() => onFieldFocus("national_id")}
          maxLength={10}
          className="w-full mb-2 p-3 border rounded"
          placeholder="10 أرقام. للمواطن يبدأ عادةً بـ 1، وللمقيم بـ 2."
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete="off"
        />
        <div className="text-xs text-gray-500 mb-4">10 أرقام. للمواطن يبدأ عادةً بـ 1، وللمقيم بـ 2.</div>

        <label className="block font-semibold mb-2">تاريخ الميلاد</label>
        <input
          type="date"
          value={dob}
          onChange={e => setDob(e.target.value)}
          onFocus={() => onFieldFocus("dob")}
          className="w-full mb-2 p-3 border rounded"
        />
        <div className="text-xs text-gray-500 mb-4">اختر من التقويم (يُسمح +18 سنة فأكثر).</div>

        <label className="flex items-center gap-2 mb-4">
          <input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} />
          <span className="text-sm">أوافق على استخدام بياناتي للتحقق فقط، وفق سياسة الخصوصية.</span>
        </label>

        <div className="text-xs text-gray-500 mb-4">🔒 حماية مشددة: تشفير على مستوى الحقل، وحذف ذكي بعد التحقق. لا تُشارك مع طرف ثالث إلا لغرض التحقق النظامي.</div>

        {error && <div className="text-red-600 mb-4">{error}</div>}
        <button
          type="submit"
          disabled={!isFormValid()}
          className={`w-full py-3 ${isFormValid() ? "bg-cyan-600 hover:bg-cyan-700 text-white" : "bg-gray-300 text-gray-600 cursor-not-allowed"} font-bold rounded`}
        >
          حفظ البيانات والمتابعة
        </button>

        <p className="text-xs text-gray-500 mt-3">بالمتابعة، فأنت تقرّ أن بياناتك ستُستخدم للتحقق فقط، ولن تُشارك لأغراض تسويقية. يمكن حذفها بطلبك ما لم تكن مطلوبة نظاميًا.</p>
      </form>
    </div>
  );
}
