import React from "react";
// src/app/messages/page.tsx
export default function MessagesPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-primary text-white p-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold">مركز الرسائل</h1>
        <p className="text-sm mt-2">تابع رسائلك ومراسلاتك مع العملاء والبائعين</p>
      </header>

      <div className="w-full max-w-2xl bg-white text-black rounded shadow p-4 space-y-4">
        <div className="p-2 border-b">
          <h2 className="font-bold text-lg">رسالة من أحمد</h2>
          <p className="text-sm">مرحبا! أحتاج تفاصيل إضافية عن الخدمة.</p>
        </div>

        <div className="p-2 border-b">
          <h2 className="font-bold text-lg">رسالة من سارة</h2>
          <p className="text-sm">شكرًا لك! تمت الموافقة على طلبك.</p>
        </div>

        {/* إضافة رسائل لاحقًا */}
      </div>
    </main>
  );
}
