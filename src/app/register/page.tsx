"use client";

<<<<<<< HEAD
import { useState } from "react";
=======
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
>>>>>>> cf326c0 (chore: centralize CATALOG, unify category routing to ?sub=, make NAV and homepage read from catalog // ASSISTANT_FINAL: true)

export default function RegisterPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
    specialty: "",
    agree: false,
    hp_field: "",
  });

  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

<<<<<<< HEAD
=======
  // providers config fetched from server so we can enable/disable social buttons
  const [providers, setProviders] = useState({
    googleConfigured: null as boolean | null,
    microsoftConfigured: null as boolean | null,
    microsoftModuleAvailable: null as boolean | null,
  });

  useEffect(() => {
    let mounted = true;
    fetch('/api/auth/config')
      .then((res) => res.json())
      .then((data) => {
        if (!mounted) return;
        setProviders({
          googleConfigured: !!data.googleConfigured,
          microsoftConfigured: !!data.microsoftConfigured,
          microsoftModuleAvailable: !!data.microsoftModuleAvailable,
        });
      })
      .catch(() => {
        if (!mounted) return;
        setProviders({ googleConfigured: false, microsoftConfigured: false });
      });
    return () => { mounted = false };
  }, []);

>>>>>>> cf326c0 (chore: centralize CATALOG, unify category routing to ?sub=, make NAV and homepage read from catalog // ASSISTANT_FINAL: true)
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.agree) {
      alert("يجب الموافقة على الشروط أولاً");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
<<<<<<< HEAD
      setMessage(data.message || "تم التسجيل، تحقق من بريدك الإلكتروني ✉️");

      if (data.status === "success") {
        // المستخدم ينتظر التفعيل
=======
      // أظهر رسالة واضحة من الخادم
      setMessage(data.message || "تم التسجيل، تحقق من بريدك الإلكتروني ✉️");

      if (data.status === "success") {
        // عند نجاح التسجيل: نعيد توجيه المستخدم لصفحة الدخول بعد 1.2 ثانية
        // هذا يجعل التفاعل واضح (لن يبقى المستخدم في نفس الصفحة بدون مؤشر)
        setTimeout(() => {
          window.location.href = '/login?registered=1';
        }, 1200);
>>>>>>> cf326c0 (chore: centralize CATALOG, unify category routing to ?sub=, make NAV and homepage read from catalog // ASSISTANT_FINAL: true)
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
    setOtpSent(true);
    console.log("تم إرسال OTP إلى:", phone);
  };

  const handleVerifyOtp = () => {
    if (!otp) {
      alert("ادخل رمز التحقق");
      return;
    }
    console.log("تم التحقق من OTP:", otp);
  };

  return (
<<<<<<< HEAD
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">إنشاء حساب</h1>

=======
    <div className="flex justify-center items-center min-h-screen bg-gray-50 py-8">
      <div className="bg-white p-4 rounded-lg shadow-sm w-full max-w-lg border-2 border-black max-h-[600px] overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">إنشاء حساب</h1>

        {/* Social sign-in buttons (Google / Microsoft) */}
        <div className="flex gap-3 mb-5">
          <button
            type="button"
            onClick={() => {
              if (providers.googleConfigured) {
                // redirect to next-auth signIn to show account chooser
                signIn("google", { callbackUrl: window.location.href });
              } else {
                // give a visible hint when not configured
                window.alert("Google OAuth غير مفعّل. اضبط متغيرات البيئة (GOOGLE_CLIENT_ID) محلياً.");
              }
            }}
            disabled={!providers.googleConfigured}
            className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg font-bold text-white ${providers.googleConfigured ? 'bg-cyan-600 hover:bg-cyan-700' : 'bg-gray-200 text-gray-600 cursor-not-allowed'}`}
            aria-label="Sign up with Google"
          >
            <span className="sr-only">Google</span>
            <svg width="18" height="18" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg" aria-hidden className="text-white">
              <path fill="currentColor" d="M533.5 278.4c0-18.5-1.5-36.2-4.3-53.4H272v100.9h146.9c-6.3 34.4-25.2 63.6-53.9 83v68h87c50.8-46.8 80.5-115.8 80.5-198.5z"/>
              <path fill="currentColor" d="M272 544.3c72.6 0 133.6-24.3 178.1-66.1l-87-68c-24.2 16.3-55.1 25.9-91.1 25.9-69.9 0-129.1-47.2-150.3-110.3h-89.6v69.3C74.6 485 165.5 544.3 272 544.3z"/>
              <path fill="currentColor" d="M121.7 325.8c-10.9-32.7-10.9-67.8 0-100.5V156h-89.6C8 203.5 0 237.8 0 272s8 68.5 32.1 116l89.6-62.2z"/>
              <path fill="currentColor" d="M272 107.6c39.5 0 75.1 13.6 103 40.4l77.1-77.1C405.9 24.1 345 0 272 0 165.5 0 74.6 59.3 32.1 156l89.6 69.3C142.9 154.8 202.1 107.6 272 107.6z"/>
            </svg>
            <span>باستخدام جوجل</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (providers.microsoftModuleAvailable === false) {
                window.alert('مزود Microsoft غير متوفر على الخادم المحلي. لتفعيله: أضف MICROSOFT_CLIENT_ID و MICROSOFT_CLIENT_SECRET في .env.local وأعد تشغيل الخادم، أو ثبّت موفّر Microsoft في node_modules.');
                return;
              }
              if (providers.microsoftConfigured) {
                signIn("microsoft", { callbackUrl: window.location.href });
              } else {
                window.alert("Microsoft OAuth غير مفعّل. اضبط متغيرات البيئة (MICROSOFT_CLIENT_ID) محلياً.");
              }
            }}
            disabled={!providers.microsoftConfigured}
            className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg font-bold text-white ${providers.microsoftConfigured ? 'bg-cyan-600 hover:bg-cyan-700' : 'bg-gray-200 text-gray-600 cursor-not-allowed'}`}
            aria-label="Sign up with Microsoft"
          >
            <span className="sr-only">Microsoft</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden className="text-white">
              <rect width="11" height="11" x="1" y="1" fill="currentColor"/>
              <rect width="11" height="11" x="12" y="1" fill="currentColor"/>
              <rect width="11" height="11" x="1" y="12" fill="currentColor"/>
              <rect width="11" height="11" x="12" y="12" fill="currentColor"/>
            </svg>
            <span>باستخدام مايكروسوفت</span>
          </button>
        </div>

        {/* show small helper when neither provider is configured */}
        {typeof providers.googleConfigured === 'boolean' && typeof providers.microsoftConfigured === 'boolean' && !providers.googleConfigured && !providers.microsoftConfigured && (
          <p className="text-sm text-center text-gray-600 mb-4">مزودات الدخول عبر جوجل ومايكروسوفت غير مفعّلة محلياً</p>
        )}

>>>>>>> cf326c0 (chore: centralize CATALOG, unify category routing to ?sub=, make NAV and homepage read from catalog // ASSISTANT_FINAL: true)
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

          <input
            type="text"
            name="hp_field"
            value={form.hp_field}
            onChange={handleChange}
            style={{ display: "none" }}
            autoComplete="off"
          />

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

        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-500">أو</span>
          <hr className="flex-grow border-gray-300" />
        </div>

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