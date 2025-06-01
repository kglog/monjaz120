'use client';

import { useEffect, useState } from 'react';

export default function SellerProfilePage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [sellerName, setSellerName] = useState('');

  useEffect(() => {
    const name = prompt('🧑‍💼 اكتب اسمك كبائع لعرض طلباتك:');
    if (name) {
      setSellerName(name);
      const storedOrders = localStorage.getItem('monjaz-orders');
      const allOrders = storedOrders ? JSON.parse(storedOrders) : [];
      const sellerOrders = allOrders.filter((order: any) => order.seller === name);
      setOrders(sellerOrders);
    }
  }, []);

  return (
    <main style={{ padding: '30px' }}>
      <h2 style={{ fontSize: '20px', marginBottom: '20px' }}>🧑‍💼 ملفك الشخصي كبائع</h2>
      {orders.length === 0 ? (
        <p>لا توجد طلبات باسمك حتى الآن.</p>
      ) : (
        orders.map((order, i) => (
          <div key={i} style={{ background: '#f9f9f9', padding: '15px', marginBottom: '20px', borderRadius: '8px' }}>
            <p>📄 الخدمة: {order.title}</p>
            <p>💰 السعر: {order.price} ريال</p>
            <p>👤 من العميل: {order.buyer}</p>
            <p>🕒 وقت الطلب: {new Date(order.createdAt).toLocaleString()}</p>
            {order.note && (
              <p style={{ color: '#555' }}>📝 ملاحظات: {order.note}</p>
            )}
          </div>
        ))
      )}
    </main>
  );
}
