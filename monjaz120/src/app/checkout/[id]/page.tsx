"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { id } = useParams<{ id: string }>();
  const sp = useSearchParams();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [details, setDetails] = useState('');

  useEffect(() => {
    const t = sp.get('title');
    const p = sp.get('price');
    if (t) setTitle(t);
    if (p && !Number.isNaN(Number(p))) setPrice(Number(p));
  }, [sp]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!id || !title.trim() || !price || !details.trim()) {
      alert('أكمل الحقول المطلوبة من فضلك.');
      return;
    }

    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        serviceId: id,
        title: title.trim(),
        price: Number(price),
        details: details.trim(),
      }),
    });

    const data = await res.json();
    if (!res.ok || data?.status !== 'success') {
      alert(data?.message || 'فشل إنشاء الطلب');
      return;
    }

    router.push('/success');
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-bold text-right">إنشاء طلب جديد</h1>
      <p className="mt-2 text-gray-700 text-right">
        الخدمة المختارة: <span className="font-semibold">{title || 'غير محددة'}</span>
        {price !== '' ? <> — <span className="text-green-600">{price} ريال</span></> : null}
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="mb-1 block text-sm text-right">وصف احتياجك</label>
          <textarea
            className="w-full rounded-xl border p-3 text-right"
            rows={5}
            placeholder="اكتب تفاصيل الطلب..."
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={!id || !title.trim() || !price || !details.trim()}
          className={`rounded-xl px-5 py-3 font-semibold text-white ${
            !id || !title.trim() || !price || !details.trim()
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-600 hover:opacity-90'
          }`}
        >
          تأكيد الطلب
        </button>
      </form>
    </div>
  );
}
