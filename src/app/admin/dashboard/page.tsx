// src/app/admin/dashboard/page.tsx

"use client";

import React from "react";

export default function AdminDashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">لوحة تحكم المشرف</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-white shadow rounded-md">
          <p className="text-sm text-gray-500">عدد المستخدمين</p>
          <p className="text-xl font-semibold">123</p>
        </div>
        <div className="p-4 bg-white shadow rounded-md">
          <p className="text-sm text-gray-500">عدد الخدمات</p>
          <p className="text-xl font-semibold">56</p>
        </div>
        <div className="p-4 bg-white shadow rounded-md">
          <p className="text-sm text-gray-500">طلبات قيد التنفيذ</p>
          <p className="text-xl font-semibold">8</p>
        </div>
        <div className="p-4 bg-white shadow rounded-md">
          <p className="text-sm text-gray-500">البلاغات</p>
          <p className="text-xl font-semibold">3</p>
        </div>
      </div>
    </div>
  );
}
