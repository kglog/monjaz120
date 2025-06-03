// src/app/vendor/page.tsx
import React from "react";

const VendorDashboard = () => {
  return (
    <main className="min-h-screen p-4 bg-gray-50 text-gray-800">
      <h1 className="text-2xl font-bold mb-4">لوحة تحكم البائع</h1>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-2">طلبات جديدة</h2>
        <div className="bg-white shadow rounded p-4">
          <p>هنا يتم عرض الطلبات الجديدة 🚀</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-2">خدماتك</h2>
        <div className="bg-white shadow rounded p-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">إضافة خدمة جديدة</button>
          {/* مكان عرض الخدمات */}
          <p className="mt-4">هنا يتم عرض الخدمات النشطة 💡</p>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">إحصائيات</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white shadow rounded p-4">
            <p className="text-sm text-gray-500">عدد الطلبات</p>
            <p className="text-xl font-bold">0</p>
          </div>
          <div className="bg-white shadow rounded p-4">
            <p className="text-sm text-gray-500">إجمالي الأرباح</p>
            <p className="text-xl font-bold">0 ريال</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default VendorDashboard;
