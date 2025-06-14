'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('buyer');
  const router = useRouter();

  const handleRegister = async (e: any) => {
    e.preventDefault();

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role }),
    });

    const data = await res.json();

    if (data.success) {
      alert('تم إنشاء الحساب بنجاح!');
      router.push('/login');
    } else {
      alert('فشل في إنشاء الحساب: ' + data.message);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>تسجيل حساب جديد</h2>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="الاسم" value={name} onChange={(e) => setName(e.target.value)} required />
        <br />
        <input type="email" placeholder="البريد الإلكتروني" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <br />
        <input type="password" placeholder="كلمة المرور" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <br />
        <label>نوع الحساب:</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="buyer">مشتري</option>
          <option value="vendor">بائع</option>
        </select>
        <br />
        <button type="submit">تسجيل</button>
      </form>
    </div>
  );
}
