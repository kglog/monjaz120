// src/app/announcements/page.tsx
export default function AnnouncementsPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-primary text-white p-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold">لوحة الإعلانات</h1>
        <p className="text-sm mt-2">تابع أحدث الإعلانات هنا!</p>
      </header>

      <div className="w-full max-w-2xl bg-white text-black rounded shadow p-4 space-y-4">
        <div className="p-2 border-b">
          <h2 className="font-bold text-lg">تحديث جديد!</h2>
          <p className="text-sm">تم إضافة صفحة الدفع وتحسين واجهة المستخدم.</p>
        </div>

        <div className="p-2 border-b">
          <h2 className="font-bold text-lg">تنبيه مهم</h2>
          <p className="text-sm">يرجى تحديث بيانات ملفك الشخصي لضمان أفضل خدمة.</p>
        </div>

        {/* إضافة إعلانات لاحقًا */}
      </div>
    </main>
  );
}
