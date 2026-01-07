"use client";
import React from "react";

import { useEffect, useState } from 'react';

export default function VendorServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/get-services')
      .then((res) => res.json())
      .then((data) => {
        setServices(data.services || []);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>🔄 جاري تحميل الخدمات...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📦 خدماتي المنشورة</h2>
      {services.length === 0 && <p>🚫 لا توجد خدمات</p>}

      <ul>
        {services.map((service) => (
          <li key={service._id} style={{ marginBottom: '1rem' }}>
            <strong>{service.title}</strong> - {service.price} ريال
            <br />
            <a href={`/vendor/edit-service?id=${service._id}`}>✏️ تعديل</a> |{' '}
            <a href={`/service-request?id=${service._id}`}>🛒 طلب الخدمة</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
