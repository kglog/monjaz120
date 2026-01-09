import React from "react";
// src/app/privacy/page.tsx
export default function PrivacyPolicyPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-primary text-white p-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold">سياسة الخصوصية</h1>
        <p className="text-sm mt-2">تعرف على كيفية تعاملنا مع بياناتك</p>
      </header>

      <div className="w-full max-w-2xl bg-white text-black rounded shadow p-4 space-y-4 text-sm">
        <p>نحن نهتم بخصوصيتك ونضمن أن بياناتك في أمان.</p>
        <p>نستخدم البيانات فقط لتقديم وتحسين خدماتنا.</p>
        <p>لا نشارك بياناتك مع أي جهة خارجية بدون إذنك.</p>
        <p>يمكنك طلب حذف بياناتك في أي وقت عبر التواصل معنا.</p>
      </div>
    </main>
  );
}
