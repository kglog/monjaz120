"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

type Settings = {
  language: string;
  notifications: { messages: boolean; orders: boolean; withdrawals: boolean };
  payment: { bankName?: string; iban?: string; paypal?: string };
  privacy: { showEmail: boolean; showPhone: boolean; profilePublic: boolean };
  theme: "light" | "dark" | "system";
  security: { twoFA: boolean };
};

const defaultSettings: Settings = {
  language: "العربية",
  notifications: { messages: true, orders: true, withdrawals: true },
  payment: { bankName: "", iban: "", paypal: "" },
  privacy: { showEmail: false, showPhone: false, profilePublic: true },
  theme: "system",
  security: { twoFA: false },
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [status, setStatus] = useState<string | null>(null);
  const [pwOld, setPwOld] = useState("");
  const [pwNew, setPwNew] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem("settings");
      if (raw) {
        const parsed = JSON.parse(raw);
        setSettings((s) => ({ ...s, ...parsed }));
      }
      console.log("[settings] loaded from localStorage:", raw);
    } catch (e) {
      console.error("settings load error", e);
    }
  }, []);

  const save = () => {
    try {
      localStorage.setItem("settings", JSON.stringify(settings));
      console.log("[settings] saved:", settings);
      setStatus("تم حفظ الإعدادات");
      setTimeout(() => setStatus(null), 2500);
    } catch (err) {
      console.error("save settings error", err);
      setStatus("فشل الحفظ");
      setTimeout(() => setStatus(null), 2500);
    }
  };

  const handleExport = () => {
    const userRaw = localStorage.getItem("user") || "{}";
    const payload = { settings, user: JSON.parse(userRaw) };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "account-export.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDeleteAccount = () => {
    if (!confirm("هل أنت متأكد من حذف حسابك؟ هذه العملية لا يمكن التراجع عنها.")) return;
    try {
      localStorage.removeItem("user");
      localStorage.removeItem("settings");
      setStatus("تم حذف الحساب — سيتم إعادة التوجيه...");
      setTimeout(() => { window.location.href = "/"; }, 1000);
    } catch (err) {
      console.error("delete account error", err);
      setStatus("فشل حذف الحساب");
      setTimeout(() => setStatus(null), 2500);
    }
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pwNew || pwNew !== pwConfirm) { setStatus("كلمة المرور الجديدة غير مطابقة"); setTimeout(() => setStatus(null), 2500); return; }
    // For dev: we don't have server auth; we just show success and clear fields
    console.log("[settings] change password (dev-only)");
    setPwOld(""); setPwNew(""); setPwConfirm("");
    setStatus("تم تغيير كلمة المرور (تجريبي)");
    setTimeout(() => setStatus(null), 2500);
  };

  return (
    <main className="min-h-screen p-8">
      <header className="max-w-4xl mx-auto text-center mb-8">
        <h1 className="text-3xl font-bold">إعدادات الحساب</h1>
        <p className="text-sm mt-2 text-gray-600">تحكم في تفضيلاتك وبيانات الدفع والأمان هنا</p>
      </header>

      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 space-y-6">
          {/* Profile / Payments / Notifications / Security / Privacy */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold mb-2">الملف الشخصي</h2>
            <p className="text-sm text-gray-500 mb-3">تحديث بيانات الحساب الأساسية.</p>
            <Link href="/edit-account" className="inline-block px-3 py-2 bg-cyan-600 text-white rounded">فتح صفحة تعديل الحساب</Link>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold mb-2">المدفوعات والسحب</h2>
            <p className="text-sm text-gray-500 mb-3">تم نقل إعدادات الحسابات البنكية وإدارة طرق السحب إلى صفحة مخصّصة. اضغط زر "حسابات بنكية" لإضافة أو تعديل حسابات السحب.</p>
            <a href="/account/bank-accounts" className="inline-block px-3 py-2 bg-cyan-600 text-white rounded">الحسابات البنكية</a>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold mb-2">التنبيهات</h2>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2"><input type="checkbox" checked={settings.notifications?.messages ?? defaultSettings.notifications.messages} onChange={(e) => setSettings(s => ({ ...s, notifications: { ...s.notifications, messages: e.target.checked } }))} /> رسائل داخل التطبيق</label>
              <label className="flex items-center gap-2"><input type="checkbox" checked={settings.notifications?.orders ?? defaultSettings.notifications.orders} onChange={(e) => setSettings(s => ({ ...s, notifications: { ...s.notifications, orders: e.target.checked } }))} /> طلبات جديدة</label>
              <label className="flex items-center gap-2"><input type="checkbox" checked={settings.notifications?.withdrawals ?? defaultSettings.notifications.withdrawals} onChange={(e) => setSettings(s => ({ ...s, notifications: { ...s.notifications, withdrawals: e.target.checked } }))} /> إشعارات السحب</label>
            </div>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold mb-2">الأمان</h2>
            <p className="text-sm text-gray-500 mb-3">إجراءات أمان الحساب.</p>
            <form onSubmit={handleChangePassword} className="space-y-2">
              <div>
                <label className="block text-sm">كلمة المرور الحالية</label>
                <input type="password" value={pwOld} onChange={(e) => setPwOld(e.target.value)} className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block text-sm">كلمة المرور الجديدة</label>
                <input type="password" value={pwNew} onChange={(e) => setPwNew(e.target.value)} className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block text-sm">تأكيد كلمة المرور</label>
                <input type="password" value={pwConfirm} onChange={(e) => setPwConfirm(e.target.value)} className="w-full p-2 border rounded" />
              </div>
              <div>
                <button type="submit" className="px-4 py-2 bg-cyan-600 text-white rounded">تغيير كلمة المرور</button>
              </div>
            </form>
            <div className="mt-3">
              <label className="flex items-center gap-2"><input type="checkbox" checked={settings.security?.twoFA ?? defaultSettings.security.twoFA} onChange={(e) => setSettings(s => ({ ...s, security: { twoFA: e.target.checked } }))} /> تفعيل المصادقة الثنائية (2FA)</label>
            </div>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold mb-2">الخصوصية</h2>
            <label className="flex items-center gap-2"><input type="checkbox" checked={settings.privacy?.profilePublic ?? defaultSettings.privacy.profilePublic} onChange={(e) => setSettings(s => ({ ...s, privacy: { ...s.privacy, profilePublic: e.target.checked } }))} /> جعل الملف العام متاحًا للبحث</label>
            <label className="flex items-center gap-2"><input type="checkbox" checked={settings.privacy?.showEmail ?? defaultSettings.privacy.showEmail} onChange={(e) => setSettings(s => ({ ...s, privacy: { ...s.privacy, showEmail: e.target.checked } }))} /> إظهار البريد الإلكتروني في الملف</label>
            <label className="flex items-center gap-2"><input type="checkbox" checked={settings.privacy?.showPhone ?? defaultSettings.privacy.showPhone} onChange={(e) => setSettings(s => ({ ...s, privacy: { ...s.privacy, showPhone: e.target.checked } }))} /> إظهار رقم الجوال</label>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-2">المظهر واللغة</h3>
            <div>
              <label className="block text-sm mb-1">اللغة</label>
              <select value={settings.language ?? defaultSettings.language} onChange={(e) => setSettings(s => ({ ...s, language: e.target.value }))} className="w-full p-2 border rounded">
                <option value="العربية">العربية</option>
                <option value="English">English</option>
              </select>
            </div>
            <div className="mt-3">
              <label className="block text-sm mb-1">المظهر</label>
              <select value={settings.theme ?? defaultSettings.theme} onChange={(e) => setSettings(s => ({ ...s, theme: e.target.value as any }))} className="w-full p-2 border rounded">
                <option value="system">نظام الجهاز</option>
                <option value="light">فاتح</option>
                <option value="dark">داكن</option>
              </select>
            </div>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-2">التكاملات</h3>
            <p className="text-sm text-gray-500 mb-2">ربط حسابات الدفع وطرق السحب الآن مُدارة من صفحة المدفوعات داخل الحساب.</p>
            <a href="/account/bank-accounts" className="inline-block px-3 py-2 bg-cyan-600 text-white rounded">إدارة المدفوعات والسحب</a>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-2">الفوترة والبيانات</h3>
            <div className="space-y-2">
              <button onClick={save} className="w-full px-3 py-2 bg-cyan-600 text-white rounded">حفظ الإعدادات</button>
              <button onClick={handleExport} className="w-full px-3 py-2 border rounded">تصدير بيانات الحساب</button>
              <button onClick={handleDeleteAccount} className="w-full px-3 py-2 border text-red-600 rounded">حذف الحساب نهائيًا</button>
              {status && <div className="text-sm text-center text-green-600">{status}</div>}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}

// ASSISTANT_FINAL: true
