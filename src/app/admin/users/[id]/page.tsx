"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function AdminUserPage() {
  const params = useParams();
  const { id } = params as { id: string };

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(`/api/admin/users/${id}`);
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("خطأ في جلب بيانات المستخدم", err);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchUser();
  }, [id]);

  if (loading) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-10">
        <p className="text-gray-600">جاري تحميل بيانات المستخدم...</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-10">
        <p className="text-red-600">المستخدم غير موجود</p>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-4">بيانات المستخدم</h1>
      <div className="bg-white border rounded-lg p-6 shadow">
        <p><strong>الاسم:</strong> {user.name}</p>
        <p><strong>البريد:</strong> {user.email}</p>
        <p><strong>الدور:</strong> {user.role}</p>
      </div>
    </main>
  );
}
