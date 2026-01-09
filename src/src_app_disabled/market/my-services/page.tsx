'use client';

import React, { useEffect, useState } from 'react';

type Service = {
  title: string;
  description: string;
  category: string;
  price: string;
  image?: string;
  featured?: boolean;
};

export default function MyServicesPage() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('services');
    if (stored) {
      setServices(JSON.parse(stored));
    }
  }, []);

  const handleDelete = (index: number) => {
    const updated = [...services];
    updated.splice(index, 1);
    setServices(updated);
    localStorage.setItem('services', JSON.stringify(updated));
    alert('❌ تم حذف الخدمة بنجاح');
  };

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: 28 }}>📦 خدماتي</h1>

      {services.length === 0 ? (
        <p>لم تقم بإضافة أي خدمات بعد.</p>
      ) : (
        services.map((service, index) => (
          <div key={index} style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            padding: 16,
            marginBottom: 16,
            border: '1px solid #ccc',
            borderRadius: 10,
            backgroundColor: service.featured ? '#fff8e1' : '#eef4ff',
            boxShadow: service.featured ? '0 0 10px #ffc107' : 'none'
          }}>
            {service.image ? (
              <img src={service.image} alt="صورة" style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 8 }} />
            ) : (
              <div style={{
                width: 100, height: 100,
                backgroundColor: '#ddd',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, color: '#555', borderRadius: 8
              }}>
                لا توجد صورة
              </div>
            )}

            <div style={{ flex: 1 }}>
              <h2 style={{ margin: '0 0 6px' }}>{service.title}</h2>
              <p style={{ margin: 0 }}>{service.description}</p>
              <p style={{ margin: '6px 0' }}>
                <strong>الفئة:</strong> {service.category} | <strong>السعر:</strong> {service.price} ريال
              </p>
              <div style={{ display: 'flex', gap: 12 }}>
                <button
                  onClick={() => handleDelete(index)}
                  style={{
                    backgroundColor: '#e53935',
                    color: '#fff',
                    padding: '6px 12px',
                    border: 'none',
                    borderRadius: 6,
                    cursor: 'pointer'
                  }}
                >
                  حذف الخدمة
                </button>
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              ⭐⭐⭐⭐☆
              <div style={{ fontSize: 12, color: '#777' }}>تقييم وهمي</div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
