"use client";

import { useEffect, useState } from "react";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/admin/stats");
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error("خطأ في جلب الإحصائيات", err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">لوحة التحكم</h1>
      {loading ? (
        <p className="text-gray-600">جاري تحميل البيانات...</p>
      ) : !stats ? (
        <p className="text-red-600">تعذر جلب البيانات</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-white border rounded-lg p-6 shadow">
            <h2 className="text-lg font-bold mb-2">عدد المستخدمين</h2>
            <p className="text-2xl">{stats.users}</p>
          </div>
          <div className="bg-white border rounded-lg p-6 shadow">
            <h2 className="text-lg font-bold mb-2">عدد الخدمات</h2>
            <p className="text-2xl">{stats.services}</p>
          </div>
          <div className="bg-white border rounded-lg p-6 shadow">
            <h2 className="text-lg font-bold mb-2">عدد الطلبات</h2>
            <p className="text-2xl">{stats.orders}</p>
          </div>
        </div>
      )}
    </main>
  );
}
