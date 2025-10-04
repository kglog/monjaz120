import React, { useState } from "react";

export default function VerifyPage() {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // ألوان وهوية المنصة (أزرق فاتح وحدود سوداء وزوايا دائرية)
  const cardStyle = {
    background: "#e3f6fd",
    border: "2px solid #222",
    borderRadius: "16px",
    padding: "32px 24px",
    maxWidth: 400,
    margin: "40px auto",
    boxShadow: "0 2px 8px #eee",
    textAlign: "center"
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

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    // تحقق من صحة رقم الجوال السعودي
    if (!phone.match(/^05[0-9]{8}$/)) {
      setError("يرجى إدخال رقم جوال سعودي صحيح يبدأ بـ 05");
      return;
    }
    // هنا يتم إرسال رمز التحقق للباك اند (تطوير مستقبلي)
    setStep(2);
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    // تحقق من صحة الرمز (مثال: 6 أرقام)
    if (!code.match(/^[0-9]{6}$/)) {
      setError("يرجى إدخال رمز تحقق صحيح مكون من 6 أرقام");
      return;
    }
    // تحقق الرمز من الباك اند (تطوير مستقبلي)
    setSuccess(true);
  };

  return (
    <div style={cardStyle}>
      <h2 style={{ color: "#1792d2", marginBottom: 18 }}>توثيق الهوية</h2>

      {step === 1 && (
        <form onSubmit={handleSendCode}>
          <label style={{ fontWeight: "bold", fontSize: 16 }}>رقم الجوال</label>
          <input
            type="text"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder="مثال: 0512345678"
            style={inputStyle}
            dir="ltr"
          />
          {error && <div style={{ color: "red", marginBottom: 12 }}>{error}</div>}
          <button type="submit" style={buttonStyle}>
            إرسال رمز التحقق
          </button>
        </form>
      )}

      {step === 2 && !success && (
        <form onSubmit={handleVerifyCode}>
          <label style={{ fontWeight: "bold", fontSize: 16 }}>رمز التحقق</label>
          <input
            type="text"
            value={code}
            onChange={e => setCode(e.target.value)}
            placeholder="أدخل رمز التحقق المرسل لجوالك"
            style={inputStyle}
            dir="ltr"
          />
          {error && <div style={{ color: "red", marginBottom: 12 }}>{error}</div>}
          <button type="submit" style={buttonStyle}>
            تحقق الآن
          </button>
        </form>
      )}

      {success && (
        <div style={{ color: "#1792d2", fontWeight: "bold", fontSize: "20px" }}>
          تم توثيق هويتك بنجاح ✅
        </div>
      )}
    </div>
  );
}