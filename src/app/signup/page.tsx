 'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('buyer'); // الافتراضي مشتري

  const handleSignup = async (e: any) => {
    e.preventDefault();
    const res = await fetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, role }),
    });

    const data = await res.json();

    if (res.ok) {
      alert('تم إنشاء الحساب بنجاح');
      router.push('/login');
    } else {
      alert(data.message);
    }
  };

  return (
    <main className="flex justify-center items-center py-10">
      <form onSubmit={handleSignup} className="w-full max-w-md bg-white p-8 rounded shadow">
        <h1 className="text-xl font-bold mb-6 text-center">إنشاء حساب جديد</h1>

        <input type="text" placeholder="الاسم" value={name} onChange={(e) => setName(e.target.value)} className="w-full mb-4 p-2 border rounded" />
        <input type="email" placeholder="البريد الإلكتروني" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full mb-4 p-2 border rounded" />
        <input type="password" placeholder="كلمة المرور" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full mb-4 p-2 border rounded" />

        <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full mb-6 p-2 border rounded">
          <option value="buyer">مشتري</option>
          <option value="vendor">بائع</option>
        </select>

        <button type="submit" className="w-full bg-primary text-white py-2 rounded">
          تسجيل الحساب
        </button>
      </form>
    </main>
  );
}

// ASSISTANT_FINAL: true
