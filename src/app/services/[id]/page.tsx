'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function ServiceDetailsPage() {
  const searchParams = useSearchParams();
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = window.location.pathname.split('/').pop();
    if (!id) return;

    fetch(`/api/get-service?id=${id}`)
      .then(res => res.json())
      .then(data => {
        setService(data.service);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>⏳ جاري تحميل الخدمة...</div>;
  if (!service) return <div>❌ لم يتم العثور على الخدمة.</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🛠️ {service.name}</h1>
      <p className="text-lg">💰 السعر: {service.price} ريال</p>
      <p className="text-lg mt-2">📄 الوصف: {service.description}</p>

      <div className="mt-6 flex gap-2">
        <button className="bg-green-600 text-white px-4 py-2 rounded">طلب الخدمة</button>
        <button className="bg-yellow-600 text-white px-4 py-2 rounded">تعديل الخدمة</button>
        <button className="bg-red-600 text-white px-4 py-2 rounded">حذف الخدمة</button>
      </div>

      <Link href="/services" className="text-blue-600 underline block mt-6">
        🔙 العودة إلى جميع الخدمات
      </Link>
    </div>
  );
}
