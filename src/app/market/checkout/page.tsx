'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function CheckoutPage() {
  const params = useSearchParams();
  const id = params.get('id');

  const [service, setService] = useState<any>(null);
  const [notes, setNotes] = useState('');
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => {
        const selected = data.find((s: any) => s.id === Number(id));
        setService(selected);
      });
  }, [id]);

  async function handleSubmit() {
    const formData = new FormData();
    formData.append('serviceId', service.id);
    formData.append('notes', notes);
    if (file) {
      formData.append('file', file);
    }

    await fetch('/api/checkout', {
      method: 'POST',
      body: formData,
    });

    alert(`🚀 تم إرسال الطلب للخدمة رقم ${service.id}`);
  }

  if (!service) return <p>جاري تحميل البيانات...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">📄 طلب خدمة</h1>

      <div className="bg-gray-100 p-4 rounded mb-4">
        <p>📦 الفئة: {service.category}</p>
        <p>💰 السعر: {service.price} ريال</p>
      </div>

      <label className="block mb-2">📝 ملاحظات إضافية (اختياري):</label>
      <textarea
        className="w-full p-2 border rounded mb-4"
        placeholder="اكتب أي ملاحظات للبائع..."
        onChange={(e) => setNotes(e.target.value)}
      />

      <label className="block mb-2">📎 رفع ملفات (اختياري):</label>
      <input
        type="file"
        className="mb-4"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        🛒 أرسل الطلب الآن
      </button>
    </div>
  );
}
