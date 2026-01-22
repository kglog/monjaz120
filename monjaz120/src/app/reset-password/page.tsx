import React from "react";
// src/app/reset-password/page.tsx
export default function ResetPasswordPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-primary text-white p-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold">إعادة تعيين كلمة المرور</h1>
        <p className="text-sm mt-2">أدخل كلمة المرور الجديدة لتأمين حسابك</p>
      </header>

      <form className="w-full max-w-md bg-white text-black rounded shadow p-4 space-y-4">
        <div>
          <label htmlFor="newPassword" className="block text-sm font-bold mb-1">كلمة المرور الجديدة:</label>
          <input
            type="password"
            id="newPassword"
            placeholder="••••••••"
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-bold mb-1">تأكيد كلمة المرور:</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="••••••••"
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-secondary hover:bg-secondary-dark text-white font-bold py-2 px-4 rounded shadow hover:shadow-lg transition-all duration-300"
        >
          إعادة تعيين
        </button>
      </form>
    </main>
  );
}
