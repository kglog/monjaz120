import React from "react";
// src/app/offers/page.tsx
export default function SpecialOffersPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-primary text-white p-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold">العروض الخاصة</h1>
        <p className="text-sm mt-2">استفد من عروضنا الحالية قبل انتهائها!</p>
      </header>

      <div className="w-full max-w-2xl bg-white text-black rounded shadow p-4 space-y-4">
        <div className="p-2 border-b">
          <h2 className="font-bold text-lg">خصم 30% على خدمات التصميم</h2>
          <p className="text-sm">لفترة محدودة – اطلب الآن!</p>
        </div>

        <div className="p-2 border-b">
          <h2 className="font-bold text-lg">عرض باقة الكتابة التسويقية</h2>
          <p className="text-sm">كتابة محتوى تسويقي احترافي بسعر مميز.</p>
        </div>

        {/* إضافة المزيد من العروض لاحقًا */}
      </div>
    </main>
  );
}
