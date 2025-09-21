"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewUserPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", role: "بائع" });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      alert("تم إنشاء المستخدم ✅");
      router.push("/admin/users");
    } else {
      alert("⚠️ خطأ أثناء الإنشاء");
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 space-y-4">
      <h1 className="text-xl font-bold">إضافة مستخدم جديد</h1>
      <form onSubmit={submit} className="space-y-3">
        <div>
          <label className="block mb-1">الاسم</label>
          <input
            className="w-full border p-2 rounded"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block mb-1">البريد</label>
          <input
            type="email"
            className="w-full border p-2 rounded"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block mb-1">الدور</label>
          <select
            className="w-full border p-2 rounded"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="بائع">بائع</option>
            <option value="مشتري">مشتري</option>
          </select>
        </div>
        <button className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700">
          حفظ
        </button>
      </form>
    </div>
  );
}
