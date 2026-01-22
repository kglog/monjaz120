import React from "react";
// src/app/settings/page.tsx
export default function SettingsPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-primary text-white p-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold">إعدادات الحساب</h1>
        <p className="text-sm mt-2">تحكم في تفضيلاتك هنا</p>
      </header>

      <form className="w-full max-w-md bg-white text-black rounded shadow p-4 space-y-4">
        <div>
          <label htmlFor="language" className="block text-sm font-bold mb-1">اللغة:</label>
          <select id="language" className="w-full p-2 border rounded">
            <option>العربية</option>
            <option>English</option>
          </select>
        </div>

        <div>
          <label htmlFor="notifications" className="block text-sm font-bold mb-1">التنبيهات:</label>
          <select id="notifications" className="w-full p-2 border rounded">
            <option>مفعل</option>
            <option>معطل</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-secondary hover:bg-secondary-dark text-white font-bold py-2 px-4 rounded shadow hover:shadow-lg transition-all duration-300"
        >
          حفظ الإعدادات
        </button>
      </form>
    </main>
  );
}
