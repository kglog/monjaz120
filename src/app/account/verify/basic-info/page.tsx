use client;

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function BasicInfoPage() {
  const [name, setName] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [dob, setDob] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    // تحقق إضافي أن كل المدخلات سليمة ورقم الهوية أرقام فقط
    if (
      !name ||
      !/^\d{10}$/.test(nationalId) ||
      !dob
    ) {
      setError("يرجى إدخال جميع البيانات بشكل صحيح. رقم الهوية يجب أن يكون 10 أرقام فقط.");
      return;
    }
    router.push("/account/verify/id-front");
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow mt-10">
      <h2 className="text-xl font-bold mb-6 text-center text-cyan-700">البيانات الأساسية</h2>
      <form onSubmit={handleSubmit}>
        <label className="block font-semibold mb-2">الاسم الكامل</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full mb-4 p-3 border rounded"
          placeholder="أدخل اسمك كاملًا"
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