
'use client';
import React from "react";
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function DeliveryDetails() {
  const params = useSearchParams();
  const id = params.get('id');
  const [order, setOrder] = useState<any>(null);
  const [notes, setNotes] = useState('');
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    fetch('/api/delivery')
      .then(res => res.json())
      .then(data => {
        const found = data.find((o: any) => o.id.toString() === id);
        setOrder(found);
      });
  }, [id]);

  const handleSubmit = async () => {
    const form = new FormData();
    form.append('orderId', id || '');
    form.append('notes', notes);
    if (file) form.append('file', file);

    const res = await fetch('/api/orders', {
      method: 'POST',
      body: form
    });

    const data = await res.json();
    alert('📦 تم تسليم الطلب بنجاح');
  };

  if (!order) return <p>جاري تحميل الطلب...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">📦 تسليم الطلب</h1>
      <p className="mb-2">رقم الطلب: {order.id}</p>

      <textarea
        className="border p-2 w-full mb-2"
        placeholder="✍️ اكتب ملاحظات التسليم هنا"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      ></textarea>

      <input
        type="file"
        className="mb-4"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        🚀 إرسال التسليم الآن
      </button>
    </div>
  );
}
