"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function BalancePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('user');
      if (raw) setUser(JSON.parse(raw));
    } catch (e) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) return <div className="p-6">جارٍ التحميل...</div>;

  const isSeller = user && (user.role === 'seller' || user.role === 'vendor');

  if (!isSeller) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8">
        <div className="max-w-xl text-center">
          <h1 className="text-3xl font-bold mb-4">هذه الميزة مخصّصة للبائعين</h1>
          <p className="text-gray-600 mb-6">صفحة الرصيد مرخّصة للبائعين لعرض رصيدهم، السحوبات، وتفاصيل المدفوعات. لا يمكنك الوصول إلى هذه الصفحة بحسـب دورك الحالي.</p>
          <div className="flex items-center justify-center gap-3">
            <Link href="/seller/dashboard" className="px-4 py-2 bg-cyan-600 text-white rounded">لوحة البائع</Link>
            <Link href="/" className="px-4 py-2 border rounded">العودة للرئيسية</Link>
          </div>
        </div>
      </div>
    );
  }

  // Simple seller balance placeholder (replace with real data later)
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">رصيد الحساب</h1>
      <p className="text-sm text-gray-600 mb-6">هنا تجد ملخّصًا واضحًا لحالة رصيدك كمزوّد خدمات — ما تملكه الآن، ما هو مؤجل، وما يمكنك سحبه فورًا.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white border rounded shadow-sm">
          <div className="text-sm text-gray-500">الرصيد الكلّي</div>
          <div className="text-3xl font-bold mt-2">0 ر.س</div>
          <div className="text-xs text-gray-500 mt-2">إجمالي المبلغ الموجود في حسابك الآن — يشمل المبالغ المتاحة والمؤجلة.</div>
        </div>

        <div className="p-4 bg-white border rounded shadow-sm">
          <div className="text-sm text-gray-500">المبالغ المؤجلة</div>
          <div className="text-3xl font-bold mt-2">0 ر.س</div>
          <div className="text-xs text-gray-500 mt-2">الأرباح التي تحت فترة الحماية (عادةً 14 يومًا) قبل تفعيلها للسحب.</div>
        </div>

        <div className="p-4 bg-white border rounded shadow-sm">
          <div className="text-sm text-gray-500">الأرباح الجاهزة للسحب</div>
          <div className="text-3xl font-bold mt-2">0 ر.س</div>
          <div className="text-xs text-gray-500 mt-2">المبلغ الذي يمكنك طلب سحبه الآن إلى حسابك البنكي أو خدمة الدفع.</div>
        </div>
      </div>

      <div className="mt-6">
        <button className="px-4 py-2 bg-cyan-600 text-white rounded">طلب سحب</button>
        <p className="text-sm text-gray-500 mt-3">ملاحظة: هذه النافذة مكانية؛ سيتم ربطها ببيانات حقيقية وعمليات السحب لاحقًا.</p>
      </div>
    </div>
  );
}

// ASSISTANT_FINAL: true
