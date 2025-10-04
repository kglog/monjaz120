"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function BasicInfoPage() {
  const [name, setName] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [dob, setDob] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // تصميم عصري وأنيق
  const cardStyle = {
    background: "#e3f6fd",
    border: "2px solid #222",
    borderRadius: "16px",
    padding: "32px 24px",
    maxWidth: 400,
    margin: "40px auto",
    boxShadow: "0 2px 8px #eee",
    textAlign: "center" as const
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    margin: "14px 0",
    fontSize: "18px",
    borderRadius: "8px",
    border: "1px solid #bbb"
  };

  const buttonStyle = {
    width: "100%",
    padding: "14px",
    background: "#1792d2",
    color: "#fff",
    fontWeight: "bold",
    border: "none",
    borderRadius: "8px",
    fontSize: "18px",
    marginTop: "16px",
    cursor: "pointer",
    boxShadow: "0 1px 4px #ccc"
  };

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
    <div style={cardStyle}>
      <h2 style={{ color: "#1792d2", marginBottom: 18 }}>البيانات الأساسية</h2>
      <form onSubmit={handleSubmit}>
        <label style={{ fontWeight: "bold", fontSize: 16, display: "block", textAlign: "right" }}>الاسم الكامل</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="أدخل اسمك كاملًا"
          style={inputStyle}
          required
        />

        <label style={{ fontWeight: "bold", fontSize: 16, display: "block", textAlign: "right" }}>رقم الهوية الوطنية</label>
        <input
          type="text"
          value={nationalId}
          onChange={handleNationalIdChange}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          maxLength={10}
          placeholder="أدخل رقم الهوية (10 أرقام)"
          style={inputStyle}
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete="off"
          dir="ltr"
          required
        />

        <label style={{ fontWeight: "bold", fontSize: 16, display: "block", textAlign: "right" }}>تاريخ الميلاد</label>
        <input
          type="date"
          value={dob}
          onChange={e => setDob(e.target.value)}
          style={inputStyle}
          required
        />

        {error && <div style={{ color: "red", marginBottom: 12 }}>{error}</div>}
        <button type="submit" style={buttonStyle}>
          حفظ البيانات والمتابعة
        </button>
      </form>
    </div>
  );
}