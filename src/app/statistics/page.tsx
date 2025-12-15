import React from 'react';

// src/app/statistics/page.tsx
export default function StatisticsPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-primary text-white p-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold">إحصائيات المنصة</h1>
        <p className="text-sm mt-2">تابع الأرقام والبيانات المهمة</p>
      </header>

      <div className="w-full max-w-2xl bg-white text-black rounded shadow p-4 space-y-4">
        <div className="flex justify-between items-center">
          <span className="font-bold">عدد المستخدمين</span>
          <span className="text-green-600 font-bold">2000</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-bold">عدد الطلبات المكتملة</span>
          <span className="text-blue-600 font-bold">350</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-bold">إجمالي الأرباح</span>
          <span className="text-yellow-600 font-bold">15000 ريال</span>
        </div>
      </div>
    </main>
  );
}

// ASSISTANT_FINAL: true
