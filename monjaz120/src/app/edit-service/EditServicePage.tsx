'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';

export default function EditServicePage() {
  const searchParams = useSearchParams();
  const serviceId = searchParams.get('id');

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">تعديل الخدمة</h1>
      <p className="text-gray-700">رقم الخدمة: {serviceId || 'غير محدد'}</p>
    </div>
  );
}
