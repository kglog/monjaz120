'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: any) => {
    e.preventDefault();

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      alert('تم تسجيل الدخول بنجاح');
      router.push('/vendor/ratings'); // ✅ توجهه لصفحة البائع مؤقتًا
    } else {
      alert('فشل تسجيل الدخول: تحقق من البيانات');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>تسجيل الدخول</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="البريد الإلكتروني" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <br />
        <input type="password" placeholder="كلمة المرور" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <br />
        <button type="submit">دخول</button>
      </form>
    </div>
  );
}
