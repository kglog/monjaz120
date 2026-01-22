
'use client';
import React from "react";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function ServiceDetails() {
  const params = useParams();
  const id = params.id;
  const [service, setService] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/services`)
      .then(res => res.json())
      .then(data => {
        const found = data.find((s: any) => s.id.toString() === id);
        setService(found);
      });
  }, [id]);

  if (!service) return <p className="p-4">جاري تحميل الخدمة...</p>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">📦 {service.title}</h1>
      <p className="text-gray-700">{service.description}</p>
      <p>الفئة: <span className="font-semibold">{service.category}</span></p>
      <p>السعر: <span className="font-semibold">{service.price} ريال</span></p>
      {service.featured && <p className="text-blue-600 font-bold">💎 خدمة مميزة</p>}
      
      <button
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 filter brightness-95"
        onClick={() => alert(`تم إرسال طلب شراء الخدمة رقم ${service.id}`)}
      >
        اطلب الخدمة الآن
      </button>
    </div>
  );
}
