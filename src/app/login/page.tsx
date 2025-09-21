'use client';

import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    setError('');

    const res = await fetch('/api/custom-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok && data.success) {
      // نحفظ اسم المستخدم في localStorage
      localStorage.setItem('user', JSON.stringify({
        username: data.name,
        email: data.email,
        role: data.role,
      }));

      // نعيد توجيه المستخدم
      window.location.href = '/';
    } else {
      setError(data.message || 'فشل تسجيل الدخول');
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">تسجيل الدخول</h2>

        {error && (
          <div className="mb-4 text-red-600 font-semibold text-center">{error}</div>
        )}

        {/* ✅ زر الدخول يشتغل بـ Enter الآن */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <div className="mb-4">
            <input
              type="email"
              placeholder="البريد الإلكتروني"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="mb-6">
            <input
              type="password"
              placeholder="كلمة المرور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-600 text-white py-2 rounded hover:bg-cyan-700 transition"
          >
            {loading ? 'جارٍ التحقق...' : 'دخول'}
          </button>
        </form>

        <div className="flex justify-between mt-4 text-sm text-cyan-700">
          <a href="/register">حساب جديد</a>
          <a href="/">الصفحة الرئيسية</a>
        </div>
      </div>
    </div>
  );
}
