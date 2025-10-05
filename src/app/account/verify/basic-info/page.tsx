"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function BasicInfoPage() {
  const [nameAr, setNameAr] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [dob, setDob] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // DOB validation helpers (append-only)
  const todayISO = new Date().toISOString().split('T')[0];
  const minStaticISO = '1900-01-01';

  // فلترة رقم الهوية بحيث يقبل فقط أرقام ويمنع الأحرف نهائياً
  const handleNationalIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setNationalId(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // منع أي إدخال غير رقم (0-9) مع السماح بالتحكم مثل backspace, tab, arrows
    if (
      e.key.length === 1 &&
      !/[0-9]/.test(e.key) &&
      !["Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete"].includes(e.key)
    ) {
      e.preventDefault();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = e.clipboardData.getData('Text');
    if (!/^\d+$/.test(pasteData)) {
      e.preventDefault();
    }
  };

  // DOB input/blur handlers (append-only, state sync only)
  const handleDobInput = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setDob(target.value);
  };

  const handleDobBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setDob(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    // تحقق إضافي أن كل المدخلات سليمة ورقم الهوية أرقام فقط
    if (
      !nameAr ||
      !nameEn ||
      !/^\d{10}$/.test(nationalId) ||
      !dob
    ) {
      setError("يرجى إدخال جميع البيانات بشكل صحيح. رقم الهوية يجب أن يكون 10 أرقام فقط.");
      return;
    }
    // DOB validation (append-only)
    if (!dob || dob < minStaticISO || dob > todayISO) {
      setError(`تاريخ الميلاد غير صالح. يُسمح بإدخال تاريخ بين ${minStaticISO} و ${todayISO}.`);
      return;
    }
    router.push("/account/verify/id-front");
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow mt-10">
      <h2 className="text-xl font-bold mb-6 text-center text-cyan-700">توثيق الهوية</h2>
      <div className="mb-5 p-4 bg-gray-50 border border-gray-200 rounded text-sm">
        <b>يرجى إدخال جميع البيانات كما هي في الهوية أو الجواز.</b><br/>
        الاسم بالعربي والانجليزي كما هو في الوثائق.<br/>
        إذا كانت البيانات غير صحيحة أو غير واضحة سيتم رفض الطلب أو إيقاف الحساب.<br/>
        منصة.كوم تحمي بياناتك وتتحقق منها بأنظمة ذكية لضمان الأمان والجودة.<br/>
        <hr className="my-2" />
        <b>Please enter your details exactly as in your official ID or passport.</b><br/>
        Name in Arabic and English as shown in your documents.<br/>
        Wrong or unclear information will result in rejection or account suspension.<br/>
        Monjaz platform protects your data and verifies it with smart systems for safety and quality.<br/>
      </div>
      <form onSubmit={handleSubmit}>
        <label className="block font-semibold mb-2">الاسم الكامل (بالعربي)</label>
        <input
          type="text"
          value={nameAr}
          onChange={e => setNameAr(e.target.value)}
          className="w-full mb-4 p-3 border rounded"
          placeholder="أدخل اسمك بالعربي كما في الهوية"
        />

        <label className="block font-semibold mb-2">الاسم الكامل (بالإنجليزي)</label>
        <input
          type="text"
          value={nameEn}
          onChange={e => setNameEn(e.target.value)}
          className="w-full mb-4 p-3 border rounded"
          placeholder="أدخل اسمك بالإنجليزي كما في الجواز"
        />

        <label className="block font-semibold mb-2">رقم الهوية الوطنية</label>
        <input
          type="text"
          value={nationalId}
          onChange={handleNationalIdChange}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          maxLength={10}
          className="w-full mb-4 p-3 border rounded"
          placeholder="أدخل رقم الهوية (10 أرقام)"
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete="off"
        />

        <label className="block font-semibold mb-2">تاريخ الميلاد</label>
        <input
          type="date"
          value={dob}
          onChange={e => setDob(e.target.value)}
          className="w-full mb-4 p-3 border rounded"
          min={minStaticISO}
          max={todayISO}
          onInput={handleDobInput}
          onBlur={handleDobBlur}
        />

        {error && <div className="text-red-600 mb-4">{error}</div>}
        <button
          type="submit"
          className="w-full py-3 bg-cyan-600 text-white font-bold rounded hover:bg-cyan-700"
        >
          حفظ البيانات والمتابعة
        </button>
      </form>
    </div>
  );
}