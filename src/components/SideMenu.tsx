'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function SideMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  const categories = [
    { name: 'تصميم', slug: 'design', icon: '🧠' },
    { name: 'كتابة وترجمة', slug: 'writing', icon: '📝' },
    { name: 'تسويق رقمي', slug: 'marketing', icon: '📣' },
    { name: 'برمجة وتطوير', slug: 'development', icon: '💻' },
    { name: 'فيديو وأنيميشن', slug: 'video', icon: '🎬' },
    { name: 'هندسة وعمارة', slug: 'engineering', icon: '🏗️' },
    { name: 'أعمال', slug: 'business', icon: '💼' },
  ];

  return (
    <div className="relative" ref={menuRef}>
      {/* ❌ حذفنا كلمة "منجز" هنا حتى ما تتكرر مع Navbar */}
      <button
        onClick={() => setOpen(!open)}
        className="text-cyan-700 text-xl font-bold"
        aria-label="قائمة التصنيفات"
      >
        ☰
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-2 w-56 bg-white border rounded shadow z-50">
          <h3 className="p-3 font-bold border-b">التصنيفات</h3>
          <ul className="text-sm p-2 space-y-2">
            {categories.map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={`/categories/${cat.slug}`}
                  className="flex justify-between hover:text-cyan-600 transition"
                >
                  <span>{cat.name}</span>
                  <span>{cat.icon}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
