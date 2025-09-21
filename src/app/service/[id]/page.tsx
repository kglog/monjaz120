'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';

export default function ServiceDetailsPage() {
  const { id } = useParams();
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchService() {
      try {
        const res = await fetch(`/api/get-service?id=${id}`);
        const data = await res.json();
        setService(data.service);
      } catch (error) {
        console.error('فشل في جلب الخدمة:', error);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchService();
  }, [id]);

  if (loading) return <p className="p-6 text-center">جاري التحميل...</p>;
  if (!service) return <p className="p-6 text-center text-red-600">الخدمة غير موجودة.</p>;

  return (
    <main className="min-h-screen bg-white text-gray-800 p-6">
      <section className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-right">{service.title}</h1>
        {service.image && (
          <Image
            src={service.image}
            alt={service.title}
            width={700}
            height={400}
            className="rounded mb-6"
          />
        )}
        <p className="text-lg text-right mb-2">{service.description}</p>
        <p className="text-right font-semibold mb-1">السعر: {service.price} ريال</p>
        <p className="text-right text-gray-500">المقدم: {service.vendorName || 'غير معروف'}</p>
      </section>
    </main>
  );
}
