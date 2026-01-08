// src/app/forgot-password/page.tsx
export default function ForgotPasswordPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-primary text-white p-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold">نسيت كلمة المرور؟</h1>
        <p className="text-sm mt-2">أدخل بريدك الإلكتروني لإعادة تعيين كلمة المرور</p>
      </header>

      <form className="w-full max-w-md bg-white text-black rounded shadow p-4 space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-bold mb-1">البريد الإلكتروني:</label>
          <input
            type="email"
            id="email"
            placeholder="you@example.com"
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-secondary hover:bg-secondary-dark text-white font-bold py-2 px-4 rounded shadow hover:shadow-lg transition-all duration-300"
        >
          إرسال رابط إعادة التعيين
        </button>
      </form>
    </main>
  );
}
