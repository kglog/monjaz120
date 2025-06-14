'use client';

import { useEffect, useState } from 'react';

export default function BuyerOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [rating, setRating] = useState(5);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch('/api/get-orders-by-buyer');
      const data = await res.json();
      setOrders(data.orders);
    };
    fetchOrders();
  }, []);

  return (
    <div>
      <h1>طلباتي:</h1>
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            طلبك على الخدمة: {order.serviceName}<br />
            البائع: <b>{order.vendorId}</b><br />
            الحالة: <b>{order.status}</b><br />

            {order.status === 'delivered' && (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  await fetch('/api/submit-rating', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      orderId: order._id,
                      vendorId: order.vendorId,
                      rating,
                      serviceName: order.serviceName,
                    }),
                  });
                  location.reload();
                }}
              >
                <label>
                  قيّم البائع:
                  <select
                    value={rating}
                    onChange={(e) => setRating(parseInt(e.target.value))}
                  >
                    <option value={5}>5 - رائع</option>
                    <option value={4}>4 - جيد جداً</option>
                    <option value={3}>3 - جيد</option>
                    <option value={2}>2 - سيء</option>
                    <option value={1}>1 - سيء جداً</option>
                  </select>
                </label>
                <button
                  type="submit"
                  style={{ background: 'darkblue', color: 'white', marginLeft: '10px' }}
                >
                  إرسال التقييم
                </button>
              </form>
            )}

            {order.rating && <div>تقييمك: {order.rating} / 5</div>}
          </li>
        ))}
      </ul>
    </div>
  );
}
