"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewServicePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(""); // الصورة

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch("/api/admin/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        price: Number(price),
        image, // نرسل الصورة مع البيانات
      }),
    });

    router.push("/admin/services");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-md bg-white">
      <h1 className="text-xl font-bold mb-4 text-center">إضافة خدمة جديدة</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="اسم الخدمة"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          placeholder="وصف الخدمة"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="السعر"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="رابط الصورة (مثال: /category-cover.png)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          حفظ
        </button>
      </form>
    </div>
  );
}
