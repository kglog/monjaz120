// src/app/checkout/page.tsx
export default function CheckoutPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-primary text-white p-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold">إتمام الدفع</h1>
        <p className="text-sm mt-2">راجع تفاصيل طلبك وأتمم الدفع بأمان</p>
      </header>

      <div className="w-full max-w-md bg-white text-black rounded shadow p-4 space-y-4">
        <div>
          <h2 className="font-bold text-lg">خدمة: تصميم موقع</h2>
          <p className="text-sm">السعر: 1500 ريال</p>
        </div>

        <button
          type="button"
          className="w-full bg-secondary hover:bg-secondary-dark text-white font-bold py-2 px-4 rounded shadow hover:shadow-lg transition-all duration-300"
        >
          متابعة الدفع
        </button>
      </div>
    </main>
  );
}
