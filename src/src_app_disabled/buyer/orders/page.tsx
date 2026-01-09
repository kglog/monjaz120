'use client';
import { useEffect, useState } from 'react';

export default function BuyerOrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('/api/orders/buyer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'client@example.com' }), // غيّرها لاحقًا
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success') setOrders(data.orders);
      });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">طلباتي</h1>
      <ul>
        {orders.map((order: any) => (
          <li key={order._id} className="border p-3 mb-3 rounded">
            <div>الخدمة: {order.serviceTitle}</div>
            <div>السعر: {order.servicePrice} ريال</div>
            <div>تاريخ: {new Date(order.createdAt).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
