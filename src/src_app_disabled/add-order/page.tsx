"use client";

import { useState } from "react";

export default function AddOrderPage() {
  const [serviceId, setServiceId] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [details, setDetails] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceId, title, price, details }),
      });
      if (res.ok) {
        alert("تم إنشاء الطلب بنجاح");
        setServiceId("");
        setTitle("");
        setPrice("");
        setDetails("");
      } else {
        alert("تعذر إنشاء الطلب");
      }
    } catch (err) {
      console.error("خطأ:", err);
    }
  };

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">إنشاء طلب جديد</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="معرف الخدمة"
          value={serviceId}
          onChange={(e) => setServiceId(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="عنوان الطلب"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          placeholder="السعر بالريال"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <textarea
          placeholder="تفاصيل إضافية"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          إنشاء
        </button>
      </form>
    </main>
  );
}
