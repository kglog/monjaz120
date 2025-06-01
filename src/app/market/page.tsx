// src/app/market/page.tsx
export default function MarketPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-primary text-white p-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold">السوق</h1>
        <p className="text-sm mt-2">تصفح جميع الخدمات المتاحة</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">
        {/* خدمة رقم 1 */}
        <div className="bg-white text-black p-4 rounded shadow hover:shadow-lg transition">
          <h2 className="text-xl font-bold mb-2">تصميم شعار احترافي</h2>
          <p className="text-sm mb-2">وصف مختصر عن هذه الخدمة.</p>
          <p className="text-green-600 font-bold">50 ريال</p>
        </div>

        {/* خدمة رقم 2 */}
        <div className="bg-white text-black p-4 rounded shadow hover:shadow-lg transition">
          <h2 className="text-xl font-bold mb-2">كتابة مقال تسويقي</h2>
          <p className="text-sm mb-2">وصف مختصر عن هذه الخدمة.</p>
          <p className="text-green-600 font-bold">30 ريال</p>
        </div>

        {/* إضافة خدمات أكثر لاحقًا */}
      </div>
    </main>
  );
}
