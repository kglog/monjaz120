// src/app/dashboard/page.tsx
export default function SellerDashboardPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-primary text-white p-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold">لوحة تحكم البائع</h1>
        <p className="text-sm mt-2">تابع طلباتك وأرباحك هنا</p>
      </header>

      <div className="w-full max-w-2xl bg-white text-black rounded shadow p-4 space-y-4">
        <div className="flex justify-between items-center">
          <span className="font-bold">عدد الطلبات الجديدة</span>
          <span className="text-green-600 font-bold">10</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-bold">إجمالي الأرباح</span>
          <span className="text-yellow-600 font-bold">2500 ريال</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-bold">تقييمك الحالي</span>
          <span className="text-blue-600 font-bold">4.8 / 5</span>
        </div>
      </div>
    </main>
  );
}
