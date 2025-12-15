"use client";
<<<<<<< HEAD
=======
import React from "react";
>>>>>>> cf326c0 (chore: centralize CATALOG, unify category routing to ?sub=, make NAV and homepage read from catalog // ASSISTANT_FINAL: true)

import { useEffect, useState } from "react";
import Link from "next/link";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("/api/admin/users");
        const data = await res.json();
        setUsers(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("خطأ في جلب المستخدمين", err);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">المستخدمون</h1>
      {loading ? (
        <p className="text-gray-600">جاري تحميل المستخدمين...</p>
      ) : users.length === 0 ? (
        <p className="text-gray-600">لا يوجد مستخدمون حالياً</p>
      ) : (
        <table className="min-w-full bg-white border rounded-lg shadow">
          <thead>
            <tr className="bg-gray-100 text-right">
              <th className="py-3 px-4 border-b">#</th>
              <th className="py-3 px-4 border-b">الاسم</th>
              <th className="py-3 px-4 border-b">الإيميل</th>
              <th className="py-3 px-4 border-b">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{idx + 1}</td>
                <td className="py-2 px-4 border-b">{user.name}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">
                  <Link
                    href={`/admin/users/${user.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    عرض
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
