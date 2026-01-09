"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

type User = { id?: string; username?: string; name?: string; email?: string; phone?: string; role?: string; avatar?: string };

export default function EditAccountPage() {
  const [user, setUser] = useState<User>({});
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('user');
      if (raw) setUser(JSON.parse(raw));
    } catch (e) {
      // ignore
    }
  }, []);

  const handleChange = (key: keyof User, value: string) => setUser((cur) => ({ ...(cur || {}), [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem('user', JSON.stringify(user));
      setStatus('تم حفظ الملف الشخصي');
      setTimeout(() => setStatus(null), 2000);
    } catch (err) {
      console.error('save user error', err);
      setStatus('فشل الحفظ');
      setTimeout(() => setStatus(null), 2000);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-semibold mb-4">تعديل الحساب</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">الاسم الكامل</label>
            <input value={user.name || ''} onChange={(e) => handleChange('name', e.target.value)} className="w-full p-2 border rounded" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">اسم المستخدم</label>
            <input value={user.username || ''} onChange={(e) => handleChange('username', e.target.value)} className="w-full p-2 border rounded" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">البريد الإلكتروني</label>
            <input value={user.email || ''} onChange={(e) => handleChange('email', e.target.value)} className="w-full p-2 border rounded" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">رقم الجوال</label>
            <input value={user.phone || ''} onChange={(e) => handleChange('phone', e.target.value)} className="w-full p-2 border rounded" />
          </div>

          <div className="flex gap-2">
            <button type="submit" className="px-4 py-2 bg-cyan-600 text-white rounded">حفظ</button>
            <Link href="/" className="px-4 py-2 border rounded">إلغاء</Link>
          </div>

          {status && <div className="text-sm text-green-600">{status}</div>}
        </form>
      </div>
    </main>
  );
}

// ASSISTANT_FINAL: true
