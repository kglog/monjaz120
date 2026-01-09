'use client';
export const dynamic = "force-dynamic";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function ServiceDetailsPage() {
  const searchParams = useSearchParams();
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const id = searchParams.get('id');

  useEffect(() => {
    if (!id) return;
    fetch(`/api/get-service?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setService(data.service);
        setLoading(false);
      });
  }, [id]);

  const handleDelete = async (id: string) => {
    const confirmed = confirm('هل أنت متأكد أنك تريد حذف هذه الخدمة؟');
    if (!confirmed) return;

    const res = await fetch('/api/delete-service', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    const data = await res.json();

    if (data.success) {
      alert('تم حذف الخدمة ✅');
      window.location.href = '/services';
    } else {
      alert('حدث خطأ أثناء الحذف ❌');
    }
  };

  const handleOrder = async (serviceId: string) => {
    const confirmed = confirm('هل تريد طلب هذه الخدمة؟');
    if (!confirmed) return;

    const res = await fetch('/api/order-service', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        serviceId,
        buyerId: '12345', // ← مؤقت إلى أن نضيف تسجيل دخول
      }),
    });

    const data = await res.json();

    if (data.success) {
      alert('تم طلب الخدمة بنجاح ✅');
    } else {
      alert('حدث خطأ أثناء طلب الخدمة ❌');
    }
  };

  if (loading) return <p className="p-6">⏳ جاري تحميل الخدمة...</p>;

  if (!service)
    return <p className="p-6 text-red-600">❌ لم يتم العثور على الخدمة</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-3xl font-bold mb-4">🛠️ {service.name}</h1>
      <p className="text-lg mb-2">💰 السعر: {service.price} ريال</p>
      <p className="mb-4">📄 الوصف: {service.description}</p>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => handleDelete(service._id)}
          className="text-red-600 hover:underline"
        >
          حذف الخدمة ❌
        </button>
        <Link
          href={`/edit-service?id=${service._id}`}
          className="text-blue-600 hover:underline"
        >
          تعديل الخدمة ✏️
        </Link>
        <button
          onClick={() => handleOrder(service._id)}
          className="text-green-600 hover:underline"
        >
          طلب الخدمة 🛒
        </button>
      </div>

      <Link href="/services" className="text-purple-700 underline block mt-4">
        🔙 العودة إلى جميع الخدمات
      </Link>
    </div>
  );
}
