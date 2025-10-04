"use client";

import { useEffect, useState } from "react";

export default function EditAccountPage() {
  const [user, setUser] = useState<{ name: string; email: string; job?: string; bio?: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) return <div className="text-center py-10">جارٍ تحميل البيانات...</div>;

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">
        تعديل الملف الشخصي
      </h1>

      <form className="space-y-6">
        {/* الاسم */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">الاسم</label>
          <input
            type="text"
            defaultValue={user.name}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
          />
        </div>

        {/* البريد */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">البريد الإلكتروني</label>
          <input
            type="email"
            defaultValue={user.email}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
          />
        </div>

        {/* المسمى الوظيفي */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">المسمى الوظيفي</label>
          <input
            type="text"
            defaultValue={user.job || ""}
            placeholder="مثال: مترجم، مصمم، مطور..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
          />
        </div>

        {/* النبذة */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">النبذة التعريفية</label>
          <textarea
            defaultValue={user.bio || ""}
            rows={4}
            placeholder="اكتب نبذة مختصرة عن نفسك..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
          />
        </div>

        {/* صورة الحساب */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">صورة الحساب</label>
          <input
            type="file"
            accept="image/*"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none"
          />
        </div>

        {/* الأزرار */}
        <div className="flex justify-between mt-6">
          <button
            type="submit"
            className="bg-cyan-600 text-white px-6 py-2 rounded-lg hover:bg-cyan-700 transition"
          >
            حفظ التعديلات
          </button>
          <a
            href="/account"
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            إلغاء
          </a>
        </div>
      </form>
    </main>
  );
}
