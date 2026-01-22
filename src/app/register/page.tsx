"use client";
import React from "react";
import { useState } from "react";

export default function RegisterPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
    specialty: "",
    agree: false,
    hp_field: "", // ✅ Honeypot (حقل ضد البوتات)
  });

  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox" && "checked" in e.target) {
      setForm({ ...form, [name]: (e.target as HTMLInputElement).checked });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.agree) {
      alert("يجب الموافقة على الشروط أولاً");
      return;
    }

    // 🚀 نرسل البيانات للـ API بدل localStorage
    try {
      setLoading(true);
      setMessage("");

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setMessage(data.message || "تم التسجيل، تحقق من بريدك الإلكتروني ✉️");

      if (data.status === "success") {
        // ما ندخّل المستخدم مباشرة → ينتظر التفعيل
      }
    } catch (err) {
      console.error("Register error:", err);
      setMessage("خطأ في التسجيل");
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneRegister = () => {
    if (!phone) {
      alert("ادخل رقم الجوال");
      return;
    }
    // لاحقاً نربط خدمة OTP (مثل Twilio أو مزود محلي)
    setOtpSent(true);
    console.log("تم إرسال OTP إلى:", phone);
  };

  const handleVerifyOtp = () => {
    if (!otp) {
      alert("ادخل رمز التحقق");
      return;
    }
    // لاحقاً نربطها بالـAPI
    console.log("تم التحقق من OTP:", otp);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">إنشاء حساب</h1>

        {/* التسجيل بالبريد */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-3">
            <input
              type="text"
              name="firstName"
              placeholder="الاسم الأول"
              value={form.firstName}
              onChange={handleChange}
              className="w-1/2 border rounded-lg p-3"
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="اسم العائلة"
              value={form.lastName}
              onChange={handleChange}
              className="w-1/2 border rounded-lg p-3"
              required
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="البريد الإلكتروني"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="كلمة المرور"
            value={form.password}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          {/* اختيار الدور */}
          <div>
            <p className="text-sm font-medium mb-2">اختر نوع الحساب</p>
            <div className="flex gap-3">
              <label
                className={`flex-1 border rounded-lg p-3 text-center cursor-pointer ${
                  form.role === "buyer" ? "border-cyan-600 font-bold" : ""
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value="buyer"
                  checked={form.role === "buyer"}
                  onChange={handleChange}
                  className="hidden"
                />
                عميل
              </label>
              <label
                className={`flex-1 border rounded-lg p-3 text-center cursor-pointer ${
                  form.role === "seller" ? "border-cyan-600 font-bold" : ""
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value="seller"
                  checked={form.role === "seller"}
                  onChange={handleChange}
                  className="hidden"
                />
                بائع
              </label>
            </div>
          </div>

          {/* تخصص البائع */}
          {form.role === "seller" && (
            <select
              name="specialty"
              value={form.specialty}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              required
            >
              <option value="">اختر تخصصك</option>
              <option value="design">مصمم</option>
              <option value="developer">مبرمج</option>
              <option value="writer">كاتب</option>
              <option value="marketing">مسوّق</option>
              <option value="video">فيديو وأنيميشن</option>
            </select>
          )}

          {/* Honeypot (مخفي ضد البوتات) */}
          <input
            type="text"
            name="hp_field"
            value={form.hp_field}
            onChange={handleChange}
            style={{ display: "none" }}
            autoComplete="off"
          />

          {/* الشروط */}
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="agree"
              checked={form.agree}
              onChange={handleChange}
              className="h-4 w-4"
            />
            <span>
              قرأت وأوافق على{" "}
              <a href="/terms" className="text-cyan-600 underline">
                الشروط والأحكام
              </a>{" "}
              و{" "}
              <a href="/privacy" className="text-cyan-600 underline">
                سياسة الخصوصية
              </a>
            </span>
          </label>

          {/* reCAPTCHA placeholder */}
          <div className="border rounded-lg p-4 bg-gray-100 text-center">
            [ reCAPTCHA هنا لاحقاً ]
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-600 text-white p-3 rounded-lg font-bold hover:bg-cyan-700"
          >
            {loading ? "جاري..." : "تسجيل بالبريد"}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm font-medium text-gray-700">
            {message}
          </p>
        )}

        {/* أو */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-500">أو</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* التسجيل بالجوال */}
        <div className="space-y-3">
          <input
            type="tel"
            placeholder="رقم الجوال"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border rounded-lg p-3"
          />
          {!otpSent ? (
            <button
              type="button"
              onClick={handlePhoneRegister}
              className="w-full bg-cyan-600 text-white py-3 rounded-lg hover:bg-cyan-700"
            >
              إرسال رمز التحقق
            </button>
          ) : (
            <>
              <input
                type="text"
                placeholder="ادخل رمز التحقق"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full border rounded-lg p-3"
              />
              <button
                type="button"
                onClick={handleVerifyOtp}
                className="w-full bg-green-600 text-white p-3 rounded-lg font-bold hover:bg-green-700"
              >
                تحقق وأكمل التسجيل
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
