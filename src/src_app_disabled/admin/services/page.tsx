"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch("/api/services");
        const data = await res.json();
        setServices(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("خطأ في جلب الخدمات", err);
        setServices([]);
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, []);

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">إدارة الخدمات</h1>
      {loading ? (
        <p className="text-gray-600">جاري تحميل الخدمات...</p>
      ) : services.length === 0 ? (
        <p className="text-gray-600">لا توجد خدمات حالياً</p>
      ) : (
        <table className="min-w-full bg-white border rounded-lg shadow">
          <thead>
            <tr className="bg-gray-100 text-right">
              <th className="py-3 px-4 border-b">#</th>
              <th className="py-3 px-4 border-b">العنوان</th>
              <th className="py-3 px-4 border-b">السعر</th>
              <th className="py-3 px-4 border-b">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, idx) => (
              <tr key={service.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{idx + 1}</td>
                <td className="py-2 px-4 border-b">{service.title}</td>
                <td className="py-2 px-4 border-b">{service.price} ريال</td>
                <td className="py-2 px-4 border-b">
                  <Link
                    href={`/services/${service.id}`}
                    className="text-blue-600 hover:underline mr-2"
                  >
                    عرض
                  </Link>
                  <Link
                    href={`/admin/services/${service.id}`}
                    className="text-green-600 hover:underline mr-2"
                  >
                    تعديل
                  </Link>
                  <button className="text-red-600 hover:underline">حذف</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
