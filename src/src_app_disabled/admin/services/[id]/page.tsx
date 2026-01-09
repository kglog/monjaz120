"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function AdminEditServicePage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchService() {
      try {
        const res = await fetch(`/api/services/${id}`);
        if (!res.ok) throw new Error("not found");
        const s = await res.json();
        setTitle(s.title || "");
        setDescription(s.description || "");
        setPrice(String(s.price ?? ""));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchService();
  }, [id]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch(`/api/services/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, price }),
    });
    if (res.ok) {
      alert("تم حفظ التعديلات");
      router.push("/admin/services");
    } else {
      alert("تعذر حفظ التعديلات");
    }
  }

  async function handleDelete() {
    if (!confirm("متأكد من حذف الخدمة؟")) return;
    const res = await fetch(`/api/services/${id}`, { method: "DELETE" });
    if (res.ok) {
      alert("تم حذف الخدمة");
      router.push("/admin/services");
    } else {
      alert("تعذر حذف الخدمة");
    }
  }

  if (loading) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-10">
        <p className="text-gray-600">جاري تحميل البيانات...</p>
      </main>
    );
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">تعديل خدمة</h1>
      <form onSubmit={handleSave} className="space-y-4">
        <input
          type="text"
          placeholder="عنوان الخدمة"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <textarea
          placeholder="وصف الخدمة"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          placeholder="السعر"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <div className="flex gap-3">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            حفظ
          </button>
          <button type="button" onClick={handleDelete} className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700">
            حذف
          </button>
        </div>
      </form>
    </main>
  );
}
