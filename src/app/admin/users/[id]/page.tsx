"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditUserPage() {
  const { id } = useParams(); // نجيب الـ id من الرابط
  const router = useRouter();

  const [user, setUser] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);

  // جلب بيانات المستخدم
  useEffect(() => {
    async function fetchUser() {
      const res = await fetch(`/api/admin/users/${id}`);
      const data = await res.json();
      if (data) setUser(data);
      setLoading(false);
    }
    fetchUser();
  }, [id]);

  // تحديث المستخدم
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch(`/api/admin/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (res.ok) {
      alert("تم تحديث المستخدم ✅");
      router.push("/admin/users"); // رجوع للقائمة
    } else {
      alert("⚠️ صار خطأ أثناء التحديث");
    }
  }

  if (loading) return <p>جاري التحميل...</p>;

  return (
    <div style={{ maxWidth: 400, margin: "auto", marginTop: 50 }}>
      <h1>تعديل المستخدم</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>الاسم</label>
          <input
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label>البريد</label>
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
          />
        </div>
        <button type="submit">حفظ التعديلات</button>
      </form>
    </div>
  );
}
