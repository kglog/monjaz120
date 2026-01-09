'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function EditUserPage() {
  const { id } = useParams();
  const router = useRouter();

  const [user, setUser] = useState({
    name: '',
    email: '',
    role: '',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // تحميل بيانات المستخدم الحالي
    const fetchUser = async () => {
      const res = await fetch(`/api/admin/users/${id}`);
      const data = await res.json();
      if (data.status === 'success') {
        setUser(data.user);
      }
      setLoading(false);
    };
    fetchUser();
  }, [id]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch(`/api/admin/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    if (data.status === 'success') {
      alert('✅ تم تحديث المستخدم بنجاح');
      router.push('/admin/users');
    } else {
      alert('❌ حدث خطأ أثناء التحديث');
    }
  };

  if (loading) return <div className="p-4">جاري التحميل...</div>;

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded shadow mt-6">
      <h1 className="text-2xl font-bold mb-4 text-center">تعديل المستخدم</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">الاسم</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">البريد الإلكتروني</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">الدور</label>
          <select
            name="role"
            value={user.role}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          >
            <option value="">اختر الدور</option>
            <option value="مشتري">مشتري</option>
            <option value="بائع">بائع</option>
            <option value="مشرف">مشرف</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded w-full"
        >
          حفظ التعديلات
        </button>
      </form>
    </div>
  );
}
