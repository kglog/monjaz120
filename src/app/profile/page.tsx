'use client';

import { useEffect, useState } from 'react';

export default function ProfilePage() {
  const [user, setUser] = useState<{ username: string; email: string; role: string } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('user');
    if (saved) {
      const parsed = JSON.parse(saved);
      setUser({
        username: parsed.username || parsed.name || '',
        email: parsed.email || '',
        role: parsed.role || '',
      });
    }
  }, []);

  if (!user) return <p className="text-center mt-10">لم يتم تسجيل الدخول</p>;

  return (
    <div className="max-w-xl mx-auto py-10 px-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">الملف الشخصي</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-right">
        <div className="font-semibold">الاسم:</div>
        <div>{user.username}</div>

        <div className="font-semibold">البريد الإلكتروني:</div>
        <div>{user.email}</div>

        <div className="font-semibold">الدور:</div>
        <div>{user.role === 'vendor' ? 'بائع' : 'مشتري'}</div>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={() => alert('قريبًا: تعديل الملف')}
          className="bg-cyan-600 text-white px-6 py-2 rounded hover:bg-cyan-700 transition"
        >
          تعديل الملف
        </button>
      </div>
    </div>
  );
}
