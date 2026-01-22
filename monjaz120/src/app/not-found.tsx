import React from "react";
// src/app/not-found.tsx
export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-red-600 text-white p-8">
      <h1 className="text-4xl font-bold mb-4">404 - الصفحة غير موجودة</h1>
      <p className="text-sm mb-4">عذراً، الصفحة التي تبحث عنها غير موجودة.</p>
      <a
        href="/"
        className="inline-block bg-white text-red-600 font-bold py-2 px-4 rounded shadow hover:shadow-lg transition-all duration-300"
      >
        العودة للصفحة الرئيسية
      </a>
    </main>
  );
}
