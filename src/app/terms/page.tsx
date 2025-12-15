import React from "react";
// src/app/terms/page.tsx
export default function TermsPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-primary text-white p-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold">الشروط والأحكام</h1>
        <p className="text-sm mt-2">يرجى قراءة الشروط والأحكام بعناية</p>
      </header>

      <div className="w-full max-w-2xl bg-white text-black rounded shadow p-4 space-y-4 text-sm">
        <p>1. يجب أن تلتزم بسياسات الموقع وعدم استخدامه في أي نشاط غير قانوني.</p>
        <p>2. يحق للإدارة تعديل أو حذف أي محتوى ينتهك السياسات.</p>
        <p>3. جميع البيانات والمعلومات سرية ولا يجوز إفشاؤها لطرف ثالث بدون إذن.</p>
        <p>4. يلتزم المستخدم بدفع رسوم الخدمات المتفق عليها في حال وجودها.</p>
      </div>
    </main>
  );
}
