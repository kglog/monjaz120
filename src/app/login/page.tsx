'use client';

import { useState, useEffect } from 'react';
import { Mail, Eye, EyeOff } from 'lucide-react';

function SocialButton({ children, className, onClick, disabled }: any) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`w-full flex items-center gap-3 justify-center px-4 py-2 rounded-2xl font-medium ${className} ${disabled ? 'opacity-70 cursor-wait' : ''}`}
    >
      {children}
    </button>
  );
}

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const [googleConfigured, setGoogleConfigured] = useState<boolean | null>(null);
  const [googleHint, setGoogleHint] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    fetch('/api/auth/config')
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return;
        setGoogleConfigured(!!data.googleConfigured);
        setGoogleHint(data.googleHint ?? null);
      })
      .catch(() => {
        if (!mounted) return;
        setGoogleConfigured(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const handleSocial = (provider: string) => {
    setSocialLoading(provider);
    const callback = encodeURIComponent(window.location.href);
    window.location.assign(`/api/auth/signin/${provider}?callbackUrl=${callback}`);
    setTimeout(() => {
      if (socialLoading === provider) {
        setSocialLoading(null);
        setError('لم يتم فتح صفحة تسجيل الدخول للمزود — تأكد من إعداد مزودي OAuth والمتغيرات البيئية. يمكنك الضغط على الرابط اليدوي أسفل الزر.');
      }
    }, 3000);
  };

  const handleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/custom-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        const existing = JSON.parse(localStorage.getItem('user') || 'null');
        const createdAt = data.createdAt ?? existing?.createdAt ?? null;
        const normalizedRole = data.role === 'vendor' ? 'seller' : data.role;
        const userObj: any = {
          username: data.name,
          email: data.email,
          role: normalizedRole,
        };
        if (createdAt) userObj.createdAt = createdAt;
        localStorage.setItem('user', JSON.stringify(userObj));
        window.location.href = '/';
      } else {
        setError(data.message || 'فشل تسجيل الدخول');
      }
    } catch (e) {
      setError('خطأ في الاتصال، جرّب لاحقًا');
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-md w-full max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: social + info on larger screens */}
          <div className="flex flex-col gap-4 md:border-r md:pr-6">
            <h2 className="text-2xl font-extrabold text-slate-900">تسجيل الدخول</h2>
            <p className="text-sm text-slate-600">سجّل دخولك باستخدام البريد الإلكتروني أو عبر حسابك في جوجل/مايكروسوفت.</p>

            <div className="mt-3 grid grid-cols-1 gap-3">
              {googleConfigured === false && (
                <div className="p-3 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded text-sm">
                  تحذير: لم يتم تكوين Google OAuth محليًا. لن يعمل زر "تسجيل باستخدام جوجل" حتى تضيف
                  <span className="font-medium"> GOOGLE_CLIENT_ID</span> في ملف البيئة.
                  {googleHint && <span className="block text-xs text-slate-600">معرّف مسجّل: {googleHint}</span>}
                </div>
              )}
              <SocialButton
                className="bg-gradient-to-r from-[#0f9bb1] to-[#1fb6d6] text-white shadow-sm hover:brightness-95"
                onClick={() => handleSocial('google')}
                disabled={!!socialLoading}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden className="text-white">
                  <path d="M21 12.3c0-.7-.1-1.3-.2-1.9H12v3.6h5.6c-.2 1.1-.9 2.4-2 3.1v2.6h3.2c1.9-1.8 2.9-4.4 2.9-7.4z" fill="currentColor" />
                </svg>
                {socialLoading === 'google' ? 'جاري إعادة التوجيه...' : 'تسجيل باستخدام جوجل'}
              </SocialButton>

              <div className="text-xs text-slate-600 text-right mt-1">
                <a
                  href={`/api/auth/signin/google?callbackUrl=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '/')}`}
                  className="underline"
                >
                  اضغط هنا إن لم يحدث توجيه تلقائي
                </a>
              </div>

              <SocialButton
                className="bg-gradient-to-r from-[#0f9bb1] to-[#1fb6d6] text-white shadow-sm hover:brightness-95"
                onClick={() => handleSocial('microsoft')}
                disabled={!!socialLoading}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden className="text-white">
                  <rect x="3" y="3" width="8" height="8" fill="currentColor" />
                </svg>
                {socialLoading === 'microsoft' ? 'جاري إعادة التوجيه...' : 'تسجيل باستخدام مايكروسوفت'}
              </SocialButton>

              <div className="text-xs text-slate-600 text-right mt-1">
                <a
                  href={`/api/auth/signin/microsoft?callbackUrl=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '/')}`}
                  className="underline"
                >
                  اضغط هنا إن لم يحدث توجيه تلقائي
                </a>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div>
            {error && <div className="mb-3 text-red-600 font-medium">{error}</div>}

            <div className="mb-3 flex items-center gap-2">
              <Mail className="w-4 h-4 text-slate-600" />
              <span className="text-sm text-slate-700">أو سجّل بواسطة البريد</span>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
              className="space-y-3"
            >
              <div>
                <input
                  type="email"
                  placeholder="البريد الإلكتروني"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-black focus:ring-0 bg-white"
                />
              </div>

              <div className="relative">
                <input
                  type={show ? 'text' : 'password'}
                  placeholder="كلمة المرور"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 pr-10 outline-none focus:border-black focus:ring-0 bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  className="absolute top-1/2 -translate-y-1/2 right-3 text-slate-600"
                  aria-label={show ? 'اخفاء كلمة المرور' : 'اظهار كلمة المرور'}
                >
                  {show ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={remember} onChange={() => setRemember(r=>!r)} className="w-4 h-4" />
                  تذكرني
                </label>
                <a href="/forgot-password" className="text-slate-600 hover:underline">نسيت كلمة المرور؟</a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-[#0f9bb1] text-white py-2 font-medium hover:brightness-95 transition"
              >
                {loading ? 'جارٍ التحقق...' : 'دخول'}
              </button>
            </form>

            <div className="mt-4 text-center text-sm">
              <a href="/register" className="text-slate-700 hover:underline">لا أملك حساب</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
