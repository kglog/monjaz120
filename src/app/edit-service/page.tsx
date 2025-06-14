'use client';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function EditServicePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', price: '', description: '' });

  const id = searchParams.get('id');

  useEffect(() => {
    if (!id) return;

    fetch(`/api/get-service?id=${id}`)
      .then(res => res.json())
      .then(data => {
        setService(data.service);
        setForm({
          name: data.service.name || '',
          price: data.service.price || '',
          description: data.service.description || '',
        });
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch('/api/update-service', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...form }),
    });

    const data = await res.json();
    if (data.success) {
      alert('✅ تم تحديث الخدمة بنجاح');
      router.push('/vendor/services');
    } else {
      alert('❌ حدث خطأ أثناء التحديث');
    }
  };

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">✏️ تعديل الخدمة</h1>

      {loading ? (
        <p className="text-center">⏳ جاري تحميل الخدمة...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">اسم الخدمة</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">السعر (ريال)</label>
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">الوصف</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              rows={4}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            💾 تحديث الخدمة
          </button>
        </form>
      )}
    </div>
  );
}
