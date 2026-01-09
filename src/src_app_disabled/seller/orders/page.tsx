"use client";

import { useEffect, useState } from "react";

export default function SellerOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/seller/orders');
        const json = await res.json();
        setOrders(json.orders || []);
      } catch (err) {
        setOrders([]);
      }
    })();
  }, []);

  async function act(id: string, action: string) {
    try {
      const res = await fetch('/api/seller/orders', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ id, action }) });
      const json = await res.json();
      if (json.ok) {
        setOrders((o) => o.map((it) => (it.id === id ? json.order : it)));
      }
    } catch (err) {}
  }

  return (
    <main className="p-6 min-h-screen bg-white">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">الطلبات الواردة</h1>
        <div className="space-y-3">
          {orders.map((o) => (
            <div key={o.id} className="p-4 border rounded bg-white flex items-center justify-between">
              <div>
                <div className="font-semibold">{o.title}</div>
                <div className="text-sm text-slate-600">من: {o.buyer} • الحالة: {o.status}</div>
              </div>
              <div className="flex gap-2">
                {o.status === 'new' && <button onClick={() => act(o.id, 'start')} className="px-3 py-1 bg-amber-500 text-white rounded">ابدأ</button>}
                {o.status !== 'completed' && <button onClick={() => act(o.id, 'complete')} className="px-3 py-1 bg-green-600 text-white rounded">سلم</button>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
