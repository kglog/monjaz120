'use client';

import { useEffect, useState } from 'react';

type Order = {
  serviceId: number;
  notes: string;
  fileName: string | null;
  createdAt: string;
  deliveredFile?: string | null;
  deliveryNotes?: string | null;
  deliveredAt?: string | null;
};

export default function DeliveryPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [deliveryNotes, setDeliveryNotes] = useState<{ [key: number]: string }>({});
  const [deliveryFiles, setDeliveryFiles] = useState<{ [key: number]: File | null }>({});

  useEffect(() => {
    fetch('/api/orders')
      .then(res => res.json())
      .then(setOrders);
  }, []);

  const showToast = (message: string) => {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 3000);
  };

  const handleDelivery = async (id: number) => {
    const notes = deliveryNotes[id] || '';
    const file = deliveryFiles[id];

    const formData = new FormData();
    formData.append('notes', notes);
    if (file) formData.append('file', file);

    const res = await fetch(`/api/delivery/${id}`, {
      method: 'POST',
      body: formData,
    });

    const result = await res.json();
    showToast(result.message || `✅ تم تسليم الخدمة رقم ${id}`);

    // تحديث القائمة بدون ريفرش
    const updated = await fetch('/api/orders').then(res => res.json());
    setOrders(updated);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">📦 طلبات الاستلام</h1>

      {/* TOAST */}
      <div
        id="toast"
        className="hidden fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded shadow-lg z-50 transition-all duration-300"
      >
        تمت العملية بنجاح
      </div>

      {orders.length === 0 ? (
        <p className="text-gray-500">لا توجد طلبات حتى الآن.</p>
      ) : (
        orders.map((order, index) => (
          <div
            key={index}
            className={`p-4 mb-4 rounded border shadow-sm ${
              order.deliveredFile || order.deliveryNotes
                ? 'bg-gray-100'
                : 'bg-white'
            }`}
          >
            <p className="font-bold">الخدمة رقم: {order.serviceId}</p>
            <p>📝 الملاحظات: {order.notes} {order.notes.includes("جاهز") && "🚀"}</p>

            <p>📎 الملف المرفوع: {order.fileName || 'لا يوجد'}</p>
            <p>🕒 تم الإنشاء: {new Date(order.createdAt).toLocaleString('ar-EG')}</p>

            {order.deliveredFile && (
              <p className="text-sm mt-1">
                🔗 <a href={`/uploads/${order.deliveredFile}`} target="_blank" className="text-blue-600 underline">عرض الملف المرفق</a>
              </p>
            )}

            {order.deliveredAt && (
              <p className="text-sm text-gray-600 mt-1">🕓 تم التسليم: {new Date(order.deliveredAt).toLocaleString("ar-EG")}</p>
            )}

            <hr className="my-3" />

            <label className="block font-bold text-yellow-700">🟨 ملاحظات التسليم:</label>
            <textarea
              className="w-full p-2 border rounded mt-1 mb-2"
              placeholder="ادخل ملاحظات التسليم هنا..."
              onChange={(e) =>
                setDeliveryNotes({ ...deliveryNotes, [order.serviceId]: e.target.value })
              }
              value={deliveryNotes[order.serviceId] || ''}
            />

            <label className="block font-bold text-sm text-gray-700">📎 ملف التسليم (اختياري):</label>
            <input
              type="file"
              className="mb-2"
              onChange={(e) =>
                setDeliveryFiles({ ...deliveryFiles, [order.serviceId]: e.target.files?.[0] || null })
              }
            />

            <button
              className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded"
              onClick={() => handleDelivery(order.serviceId)}
            >
              ✅ تسليم الخدمة
            </button>
          </div>
        ))
      )}
    </div>
  );
}
