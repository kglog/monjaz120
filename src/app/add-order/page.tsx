'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AddOrderPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [service, setService] = useState<any>(null);
  const [note, setNote] = useState('');

  useEffect(() => {
    const id = searchParams.get('id');
    if (!id) return;

    fetch(`/api/get-service?id=${id}`)
      .then((res) => res.json())
      .then((data) => setService(data.service))
      .catch((err) => console.error('Error fetching service:', err));
  }, [searchParams]);

  const handleSubmit = () => {
    if (!service) return alert('لا يوجد خدمة حالياً');
    
    const newOrder = {
      name: service.name,
      price: service.price,
      note: note,
    };

    const currentOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    currentOrders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(currentOrders));

    alert('✅ تم تسجيل الطلب بنجاح!');
    router.push('/my-orders');
  };

  if (!service) {
    return <div className="p-6">جاري تحميل الخدمة...</div>;
  }

  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-white rounded-xl shadow border">
      <h1 className="text-2xl font-bold mb-4">طلب خدمة: {service.name}</h1>
      <p className="text-gray-700 mb-2">💰 السعر: {service.price} ريال</p>
      <textarea
        placeholder="أدخل ملاحظاتك هنا (اختياري)"
        className="w-full border p-2 rounded mb-4"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full"
      >
        تأكيد الطلب
      </button>
    </div>
  );
}
