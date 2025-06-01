// src/app/market/sales/page.tsx
import React from 'react';

const SalesPage = () => {
  const services = [
    { id: 1, name: "تصميم شعار احترافي", price: "50 ريال" },
    { id: 2, name: "كتابة محتوى تسويقي", price: "30 ريال" },
    { id: 3, name: "ترجمة مقال", price: "20 ريال" },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h1>📦 الخدمات المعروضة</h1>
      <ul>
        {services.map(service => (
          <li key={service.id}>
            <h3>{service.name}</h3>
            <p>السعر: {service.price}</p>
            <button>اطلب الآن</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SalesPage;
