"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditServicePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    price: 0,
    details: "",
    status: "pending",
  });

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/admin/services/${id}`);
      const data = await res.json();
      if (data) {
        setForm({
          title: data.title ?? "",
          price: Number(data.price ?? 0),
          details: data.details ?? "",
          status: data.status ?? "pending",
        });
      }
      setLoading(false);
    })();
  }, [id]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch(`/api/admin/services/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: form.title,
        price: Number(form.price),
        details: form.details,
        status: form.status,
      }),
    });
    if (res.ok) {
      alert("تم تحديث الخدمة ✅");
      router.push("/admin/services");
    } else {
      alert("⚠️ خطأ أثناء التحديث");
    }
  }

  if (loading) return <p>جاري التحميل...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 space-y-4">
      <h1 className="text-xl font-bold">تعديل خدمة</h1>
      <form onSubmit={submit} className="space-y-3">
        <div>
          <label className="block mb-1">العنوان</label>
          <input
            className="w-full border p-2 rounded"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block mb-1">السعر</label>
          <input
            type="number"
            className="w-full border p-2 rounded"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
            required
            min={0}
          />
        </div>
        <div>
          <label className="block mb-1">التفاصيل</label>
          <textarea
            className="w-full border p-2 rounded"
            rows={4}
            value={form.details}
            onChange={(e) => setForm({ ...form, details: e.target.value })}
          />
        </div>
        <div>
          <label className="block mb-1">الحالة</label>
          <select
            className="w-full border p-2 rounded"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option value="pending">معلّقة</option>
            <option value="completed">مكتملة</option>
          </select>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          حفظ التعديلات
        </button>
      </form>
    </div>
  );
}
