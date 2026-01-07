"use client";

const SAMPLE_ORDERS = [
  { id: 'O-1001', buyer: 'user123', service: 'تصميم شعار احترافي', status: 'جديدة' },
  { id: 'O-1002', buyer: 'amina', service: 'تصميم غلاف كتاب', status: 'قيد التنفيذ' }
];

export default function IncomingOrdersPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">الطلبات الواردة</h1>
      <p className="text-gray-600 mb-6">عينة من الطلبات الواردة إلى بائعك. لاحقًا تُربط بالـ backend.</p>

      <div className="space-y-3">
        {SAMPLE_ORDERS.map(o => (
          <div key={o.id} className="p-4 border rounded flex justify-between items-center">
            <div>
              <div className="font-semibold">{o.service}</div>
              <div className="text-sm text-gray-500">المشتري: {o.buyer}</div>
            </div>
            <div className="text-right">
              <div className="text-sm">{o.status}</div>
              <div className="text-xs text-gray-500">{o.id}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ASSISTANT_FINAL: true
