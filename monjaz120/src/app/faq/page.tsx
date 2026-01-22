import React from "react";
// src/app/faq/page.tsx
export default function FAQPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-primary text-white p-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold">الأسئلة الشائعة</h1>
        <p className="text-sm mt-2">هنا تلاقي إجابات على أهم الأسئلة</p>
      </header>

      <div className="w-full max-w-2xl bg-white text-black rounded shadow p-4 space-y-4">
        <div>
          <h2 className="font-bold text-lg">كيف أضيف خدمة جديدة؟</h2>
          <p className="text-sm">من صفحة إضافة خدمة، عبي البيانات واضغط زر "إضافة".</p>
        </div>

        <div>
          <h2 className="font-bold text-lg">كيف أتتبع طلباتي؟</h2>
          <p className="text-sm">من صفحة الطلبات، تقدر تشوف كل طلباتك الحالية والمكتملة.</p>
        </div>

        <div>
          <h2 className="font-bold text-lg">هل أقدر أعدل بياناتي الشخصية؟</h2>
          <p className="text-sm">نعم! من صفحة الملف الشخصي تقدر تعدل اسمك وبريدك.</p>
        </div>
      </div>
    </main>
  );
}
