
'use client';
import React, { useEffect, useState } from 'react';

type Order = {
  id: number;
  service: string;
  delivered: boolean;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetch('/api/orders')
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  const handleDelivery = async (orderId: number) => {
    await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: orderId }),
    });

    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, delivered: true } : order
      )
    );

    alert(`✅ تم تسليم الطلب رقم ${orderId} بنجاح`);
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>طلباتي</h1>
      {orders.map((order) => (
        <div key={order.id} style={{ marginBottom: 16 }}>
          <p>الخدمة: {order.service}</p>
          {order.delivered ? (
            <span style={{ color: 'green' }}>✅ تم التسليم</span>
          ) : (
            <button
              style={{
                backgroundColor: '#0070f3',
                color: '#fff',
                border: 'none',
                padding: '8px 12px',
                borderRadius: 4,
                cursor: 'pointer',
              }}
              onClick={() => handleDelivery(order.id)}
            >
              تسليم الطلب
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
