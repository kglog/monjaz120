"use client";
import React, { useState } from "react";
import Link from 'next/link';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="text-3xl font-bold px-2 text-cyan-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white shadow-xl border rounded-lg z-50 text-right">
          <ul className="p-3 space-y-2">
            <li>
              <Link href="/categories" className="block text-gray-700 hover:text-cyan-600">
                🗂 التصنيفات
              </Link>
            </li>
            <li>
              <Link href="/" className="block text-gray-700 hover:text-cyan-600">
                🏠 الرئيسية
              </Link>
            </li>
            <li>
              <Link href="/about" className="block text-gray-700 hover:text-cyan-600">
                ℹ️ عن الموقع
              </Link>
            </li>
            <li>
              <Link href="/contact" className="block text-gray-700 hover:text-cyan-600">
                ✉️ اتصل بنا
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
