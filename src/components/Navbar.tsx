'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import SideMenu from './SideMenu';

export default function Navbar() {
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setUsername(user.username || '');
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const updateUser = () => {
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        setUsername(user.username || '');
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        setUsername('');
      }
    };

    window.addEventListener('storage', updateUser);
    return () => window.removeEventListener('storage', updateUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('storage'));
    window.location.href = '/login';
  };

  return (
    <div className="flex justify-between items-center p-4 border-b bg-white shadow-sm">
      <div className="flex items-center gap-2">
  <span className="font-bold text-xl text-[#2acfcf]">منصة.كوم</span>
        <SideMenu />
      </div>

      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <>
            {username && (
              <button className="bg-white text-black border-[3px] border-black font-bold px-4 py-2 rounded-lg hover:bg-gray-100 transition">
                مرحبًا، {username}
              </button>
            )}

            <Link href="/profile">
              <button className="bg-white text-black border-[3px] border-black font-bold px-4 py-2 rounded-lg hover:bg-gray-100 transition">
                ملف المستخدم
              </button>
            </Link>

            <button
              onClick={handleLogout}
              className="bg-white text-black border-[3px] border-black font-bold px-4 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              تسجيل الخروج
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="text-cyan-600">تسجيل الدخول</Link>
            <Link href="/register" className="text-cyan-600">حساب جديد</Link>
          </>
        )}
      </div>
    </div>
  );
}
