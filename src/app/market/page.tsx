'use client';
import { useEffect, useState } from 'react';

export default function MarketPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/get-all-services')
      .then((res) => res.json())
      .then((data) => {
        setServices(data.services || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('خطأ في جلب الخدمات:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">🛒 السوق</h1>

      {loading && <p>جاري تحميل الخدمات...</p>}

      {!loading && services.length === 0 && (
        <p className="text-gray-600">لا توجد خدمات متاحة حالياً.</p>
      )}

      <ul className="space-y-4">
        {services.map((service) => (
          <li key={service._id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">🛠️ {service.name}</h2>
            <p className="text-gray-700 mb-1">💰 السعر: {service.price} ريال</p>
            <p className="text-gray-700 mb-2">📄 الوصف: {service.description}</p>
            <a
              href={`/services/${service._id}`}
              className="inline-block mt-2 text-sm text-blue-600 hover:underline"
            >
              عرض التفاصيل
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
