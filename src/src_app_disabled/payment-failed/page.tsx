import React from "react";
// src/app/payment-failed/page.tsx
export default function PaymentFailedPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-red-600 text-white p-8">
      <h1 className="text-3xl font-bold mb-4">فشل الدفع</h1>
      <p className="text-sm mb-4">عذراً، حدث خطأ أثناء معالجة الدفع. حاول مرة أخرى.</p>
      <a
        href="/checkout"
        className="inline-block bg-white text-red-600 font-bold py-2 px-4 rounded shadow hover:shadow-lg transition-all duration-300"
      >
        العودة لصفحة الدفع
      </a>
    </main>
  );
}
