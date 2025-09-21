// src/components/Header.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { FaShoppingCart, FaBars } from "react-icons/fa";

// قائمة التصنيفات لزر القائمة الجانبية (اختياري)
const categories = [
  { name: "تصميم", emoji: "🎨", slug: "design" },
  { name: "كتابة", emoji: "✍️", slug: "writing" },
  { name: "برمجة", emoji: "💻", slug: "development" },
  { name: "ترجمة", emoji: "🌐", slug: "translation" },
];

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="w-full border-b border-gray-200 shadow-sm bg-white">
      <div className="w-full flex justify-between items-center px-4 py-4">

        {/* يمين الصفحة: الشعار + زر التصنيفات */}
        <div className="flex items-center gap-2 me-0 pe-0">
          <Link href="/" className="text-2xl font-bold text-primary whitespace-nowrap">
            منصة<span className="text-primary">.كوم</span>
          </Link>

          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="bg-primary text-white p-2 rounded-sm text-sm"
              aria-label="القائمة"
            >
              <FaBars size={14} />
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white border rounded-lg shadow-lg z-50">
                <div className="p-2 border-b font-bold text-sm">التصنيفات:</div>
                <div className="grid grid-cols-1 gap-1 p-2">
                  {categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/categories/${cat.slug}`}
                      className="hover:bg-gray-100 px-2 py-1 rounded flex items-center gap-2 text-sm"
                      onClick={() => setShowMenu(false)}
                    >
                      <span>{cat.emoji}</span>
                      <span>{cat.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* يسار الصفحة: روابط الحساب + تسجيل الخروج للمدير */}
        <div className="flex items-center gap-4 text-[17px] font-bold text-sky-500">
          {/* تسجيل الخروج للمدير */}
          <a
            onClick={async () => {
              try {
                await fetch("/api/admin/logout", { method: "POST" });
              } catch {}
              window.location.href = "/admin-login";
            }}
            className="hover:underline cursor-pointer"
          >
            تسجيل الخروج
          </a>

          {/* روابط الحساب العادية */}
          <Link href="/signup" className="hover:underline">حساب جديد</Link>
          <Link href="/login" className="hover:underline">تسجيل الدخول</Link>

          {/* السلة */}
          <Link href="/cart" className="text-sky-500" aria-label="السلة">
            <FaShoppingCart />
          </Link>
        </div>
      </div>
    </header>
  );
}
