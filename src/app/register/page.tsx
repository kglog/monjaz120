'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('buyer');
  const router = useRouter();

  const handleRegister = async () => {
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, role }),
      });

      if (!res.ok) throw new Error('فشل في إنشاء الحساب');

      const data = await res.json();

      // حفظ بيانات المستخدم في localStorage
      localStorage.setItem('user', JSON.stringify({
        username: data.username,
        email: data.email,
        role: data.role,
      }));

      // توجيه المستخدم للصفحة الرئيسية
      router.push('/');
    } catch (err) {
      alert('فشل في إنشاء الحساب: ' + err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">تسجيل حساب جديد</h2>
      <input
        type="text"
        placeholder="اسم المستخدم"
        className="w-full border px-3 py-2 mb-3 rounded"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="البريد الإلكتروني"
        className="w-full border px-3 py-2 mb-3 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="كلمة المرور"
        className="w-full border px-3 py-2 mb-3 rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <select
        className="w-full border px-3 py-2 mb-4 rounded"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="buyer">مشتري</option>
        <option value="seller">بائع</option>
      </select>

      <button
        onClick={handleRegister}
        className="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700 transition"
      >
        تسجيل
      </button>
    </div>
  );
}
