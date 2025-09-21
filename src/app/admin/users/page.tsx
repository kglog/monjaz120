"use client";

import { useEffect, useState } from "react";

type User = { id: number; name: string; email: string; role: string };

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    const res = await fetch("/api/admin/users", { cache: "no-store" });
    const data = await res.json();
    setUsers(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  if (loading) return <p>جاري التحميل...</p>;

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">قائمة المستخدمين</h1>
        <a
          href="/admin/users/new"
          className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
        >
          + إضافة مستخدم
        </a>
      </div>

      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">الاسم</th>
            <th className="p-2 border">البريد الإلكتروني</th>
            <th className="p-2 border">الدور</th>
            <th className="p-2 border">إجراءات</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr><td className="p-3 text-center" colSpan={4}>لا يوجد مستخدمون</td></tr>
          ) : users.map((user) => (
            <tr key={user.id} className="text-center border-t">
              <td className="p-2 border">{user.name}</td>
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border">
                {user.role === "بائع"
                  ? <span className="bg-green-500 text-white px-2 py-1 rounded">بائع</span>
                  : <span className="bg-blue-500 text-white px-2 py-1 rounded">مشتري</span>}
              </td>
              <td className="p-2 border flex justify-center gap-2">
                <a
                  href={`/admin/users/${user.id}`}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  تعديل
                </a>
                <button
                  onClick={async () => {
                    if (!confirm("تأكيد حذف المستخدم؟")) return;
                    const res = await fetch(`/api/admin/users/${user.id}`, { method: "DELETE" });
                    if (res.ok) { alert("تم الحذف ✅"); load(); }
                    else { alert("⚠️ خطأ أثناء الحذف"); }
                  }}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  حذف
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
