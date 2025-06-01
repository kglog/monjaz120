// src/app/payment-success/page.tsx
export default function PaymentSuccessPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-green-600 text-white p-8">
      <h1 className="text-3xl font-bold mb-4">تم الدفع بنجاح</h1>
      <p className="text-sm mb-4">شكرًا لك! تم تأكيد طلبك.</p>
      <a
        href="/"
        className="inline-block bg-white text-green-600 font-bold py-2 px-4 rounded shadow hover:shadow-lg transition-all duration-300"
      >
        العودة للصفحة الرئيسية
      </a>
    </main>
  );
}
