 'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';

export default function ServiceDetailsPage() {
  const { slug } = useParams();
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await fetch(`/api/service-by-slug`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ slug }),
        });
        const data = await res.json();
        setService(data.service);
      } catch (err) {
        console.error('❌ خطأ في جلب الخدمة:', err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchService();
  }, [slug]);

  if (loading) return <p className="text-center mt-10">جاري تحميل الخدمة...</p>;
  if (!service) return <p className="text-center mt-10 text-red-500">الخدمة غير موجودة</p>;

  return (
    <main className="container mx-auto px-4 py-10">
      <div className="bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">{service.title}</h1>
        <div className="w-full h-64 relative mb-4">
          <Image
            src={service.image || '/no-image.png'}
            alt={service.title}
            fill
            className="object-cover rounded"
            unoptimized
          />
        </div>
        <p className="mb-4">{service.description}</p>
        <p className="text-green-600 font-bold mb-4">
          السعر: {service.price} ريال
        </p>
        <button className="text-white px-6 py-2 rounded" style={{ backgroundColor: '#6aaed1' }}>
          اطلب الآن
        </button>
      </div>
    </main>
  );
}

// ASSISTANT_FINAL: true
