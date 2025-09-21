'use client';

import { useEffect, useState } from 'react';

const statusColors: Record<string, string> = {
  'بانتظار الموافقة': 'gray',
  'مقبول': 'green',
  'مرفوض': 'red',
  'تم التسليم': 'blue',
};

export default function VendorOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/orders/vendor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vendorEmail: 'vendor@example.com' }), // غيّرها لاحقًا
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success') setOrders(data.orders || []);
        setLoading(false);
      });
  }, []);

  const updateStatus = async (orderId: string, newStatus: string) => {
    const res = await fetch('/api/update-order-status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId, newStatus }),
    });

    const data = await res.json();
    if (data.success) {
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } else {
      alert('❌ فشل في التحديث');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">📥 الطلبات الواردة</h1>

      {loading ? (
        <p>⏳ جاري التحميل...</p>
      ) : orders.length === 0 ? (
        <p>🚫 لا توجد طلبات حالياً.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li
              key={order._id}
              className="border p-3 mb-4 rounded shadow-sm bg-white"
            >
              <div>الخدمة: {order.serviceTitle}</div>
              <div>المشتري: {order.buyerEmail}</div>
              <div>السعر: {order.servicePrice} ريال</div>
              <div>
                الحالة:{' '}
                <span
                  style={{ color: statusColors[order.status] || 'black' }}
                  className="font-semibold"
                >
                  {order.status}
                </span>
              </div>
              <div>تاريخ: {new Date(order.createdAt).toLocaleString()}</div>

              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => updateStatus(order._id, 'مقبول')}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                >
                  ✅ قبول
                </button>
                <button
                  onClick={() => updateStatus(order._id, 'مرفوض')}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                >
                  ❌ رفض
                </button>
                <button
                  onClick={() => updateStatus(order._id, 'تم التسليم')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                >
                  📦 تسليم
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
