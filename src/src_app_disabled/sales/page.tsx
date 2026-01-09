'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SalesPage() {
  const [sales, setSales] = useState<any[]>([]);
  const [sellerName, setSellerName] = useState('');
  const router = useRouter();

  useEffect(() => {
    const storedName = localStorage.getItem('monjaz-auth-seller');
    if (!storedName) {
      alert('🚫 لا يمكنك الدخول، لم يتم تسجيل البائع');
      router.push('/profile/edit');
      return;
    }
    setSellerName(storedName);

    const storedOrders = localStorage.getItem('monjaz-orders');
    const orders = storedOrders ? JSON.parse(storedOrders) : [];

    const mySales = orders.filter((order: any) => order.seller === storedName);
    setSales(mySales);
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Tahoma' }}>
      <h2 style={{ fontSize: '22px', textAlign: 'center' }}>
        📦 الطلبات المستلمة
      </h2>

      {sales.length === 0 ? (
        <p style={{ textAlign: 'center', marginTop: '30px' }}>
          لا يوجد طلبات حتى الآن.
        </p>
      ) : (
        sales.map((order, index) => (
          <div
            key={index}
            style={{
              border: '1px solid #eee',
              borderRadius: '10px',
              padding: '15px',
              marginTop: '20px',
              background: '#f9f9f9',
            }}
          >
            <p>🧾 <strong>الخدمة:</strong> {order.title || '—'}</p>
            <p>🙋‍♂️ <strong>المشتري:</strong> {order.buyer || '—'}</p>
            <p>💰 <strong>السعر:</strong> {order.price || '—'} ريال</p>
            <p>🚦 <strong>الحالة:</strong> <span style={{ color: order.status === 'تم التسليم' ? 'green' : 'orange' }}>{order.status || 'قيد التنفيذ'}</span></p>

            <div style={{ marginTop: '10px' }}>
              <button
                style={{
                  backgroundColor: '#007bff',
                  color: 'white',
                  padding: '10px 14px',
                  borderRadius: '6px',
                  border: 'none',
                  marginRight: '10px',
                  cursor: 'pointer',
                }}
              >
                ✅ تسليم الطلب
              </button>
              <button
                style={{
                  backgroundColor: '#6c757d',
                  color: 'white',
                  padding: '10px 14px',
                  borderRadius: '6px',
                  border: 'none',
                  marginRight: '10px',
                  cursor: 'pointer',
                }}
              >
                🗨️ محادثة
              </button>
              <button
                style={{
                  backgroundColor: '#dc3545',
                  color: 'white',
                  padding: '10px 14px',
                  borderRadius: '6px',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                ❌ إلغاء الطلب
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
