use client;

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function BasicInfoPage() {
  const [name, setName] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [dob, setDob] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // فلترة رقم الهوية بحيث يقبل فقط أرقام
  const handleNationalIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setNationalId(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name || nationalId.length !== 10 || !dob) {
      setError("يرجى إدخال جميع البيانات بشكل صحيح. رقم الهوية يجب أن يكون 10 أرقام فقط.");
      return;
    }
    // بعد حفظ البيانات، الانتقال للخطوة التالية
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
          maxLength={10}
          className="w-full mb-4 p-3 border rounded"
          placeholder="أدخل رقم الهوية (10 أرقام)"
          inputMode="numeric"
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