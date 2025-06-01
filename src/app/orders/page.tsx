// src/app/orders/page.tsx
export default function OrdersPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-primary text-white p-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold">طلباتي</h1>
        <p className="text-sm mt-2">تابع جميع طلباتك بسهولة</p>
      </header>

      <div className="w-full max-w-2xl bg-white text-black rounded shadow p-4 space-y-4">
        <div className="p-2 border-b">
          <h2 className="font-bold text-lg">طلب #12345</h2>
          <p className="text-sm">خدمة تصميم موقع – قيد التنفيذ</p>
        </div>

        <div className="p-2 border-b">
          <h2 className="font-bold text-lg">طلب #12346</h2>
          <p className="text-sm">خدمة كتابة محتوى – مكتمل</p>
        </div>

        {/* إضافة المزيد من الطلبات لاحقًا */}
      </div>
    </main>
  );
}
