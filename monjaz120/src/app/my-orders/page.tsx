"use client";
import React from "react";
import { useEffect, useState } from 'react';

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('orders');
    if (stored) {
      setOrders(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white rounded-xl shadow border">
      <h1 className="text-2xl font-bold mb-4">📋 الطلبات المسجلة</h1>

      {orders.length === 0 ? (
        <p className="text-gray-600">لا يوجد طلبات حالياً.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order, index) => (
            <li key={index} className="p-4 bg-gray-50 border rounded">
              <h2 className="font-bold">الخدمة: {order.name}</h2>
              <p>💰 السعر: {order.price} ريال</p>
              {order.note && (
                <p className="text-gray-700">📝 ملاحظات: {order.note}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
