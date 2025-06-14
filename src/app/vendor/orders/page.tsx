'use client';

import { useEffect, useState } from 'react';

const statusColors: Record<string, string> = {
  pending: 'gray',
  accepted: 'green',
  rejected: 'red',
  delivered: 'blue',
};

export default function VendorOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/get-orders-by-vendor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vendorId: '123' }),
    })
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.orders || []);
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
      alert('فشل في التحديث');
    }
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial' }}>
      <h1 style={{ fontSize: '28px', marginBottom: '20px' }}>📥 الطلبات الواردة:</h1>

      {loading ? (
        <p>⏳ جاري التحميل...</p>
      ) : orders.length === 0 ? (
        <p>🚫 لا توجد طلبات حالياً.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order._id} style={{ marginBottom: '30px', borderBottom: '1px solid #ddd', paddingBottom: '15px' }}>
              <p>طلب على خدمة رقم: <b>{order.serviceId}</b> بواسطة المشتري: <b>{order.buyerId}</b></p>
              <p>
                الحالة الحالية:{' '}
                <span style={{ color: statusColors[order.status] || 'black', fontWeight: 'bold' }}>
                  {order.status}
                </span>
              </p>
              <div style={{ marginTop: '10px' }}>
                <button onClick={() => updateStatus(order._id, 'accepted')} style={{ marginRight: '10px', padding: '5px 10px' }}>✅ قبول</button>
                <button onClick={() => updateStatus(order._id, 'rejected')} style={{ marginRight: '10px', padding: '5px 10px' }}>❌ رفض</button>
                <button onClick={() => updateStatus(order._id, 'delivered')} style={{ padding: '5px 10px' }}>📦 تسليم</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
