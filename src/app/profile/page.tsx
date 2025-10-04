"use client";

import { useEffect, useState } from "react";
import { User } from "lucide-react";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="bg-white min-h-screen py-8">
      {/* صورة واسم */}
      <div className="flex flex-col items-center">
        <div className="w-28 h-28 rounded-full bg-orange-600 flex items-center justify-center text-white text-4xl font-bold shadow-md">
          {user?.username
            ? user.username.charAt(0).toUpperCase()
            : <User className="w-12 h-12" />}
        </div>
        <h1 className="mt-4 text-xl font-bold text-gray-800">
          {user?.username || "اسم المستخدم"}
        </h1>
        <p className="text-sm text-gray-500">
          مستخدم جديد • <span className="text-green-600">متصل الآن</span>
        </p>
      </div>

      {/* أزرار */}
      <div className="flex justify-center mt-6">
        <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition">
          تعديل الملف الشخصي
        </button>
      </div>

      {/* الأقسام */}
      <div className="max-w-4xl mx-auto mt-10 grid md:grid-cols-2 gap-6">
        {/* نبذة */}
        <div className="bg-gray-50 border rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-2">نبذة عني</h2>
          <p className="text-gray-600 text-sm">
            {user?.bio || "لم يكتب نبذة شخصية"}
          </p>
        </div>

        {/* إحصائيات */}
        <div className="bg-gray-50 border rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-2">إحصائيات</h2>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>تاريخ التسجيل: 27 سبتمبر 2025</li>
            <li>آخر تواجد: الآن</li>
          </ul>
        </div>

        {/* توثيقات */}
        <div className="bg-gray-50 border rounded-lg p-4 shadow-sm col-span-2">
          <h2 className="text-lg font-semibold mb-2">توثيقات</h2>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>البريد الإلكتروني: <span className="text-green-600 font-bold">✓</span></li>
            <li>رقم الجوال: <span className="text-red-600 font-bold">✗</span></li>
            <li>الهوية الشخصية: <span className="text-red-600 font-bold">✗</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
