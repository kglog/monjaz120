// src/app/users/page.tsx
export default function UsersPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-primary text-white p-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold">إدارة المستخدمين</h1>
        <p className="text-sm mt-2">تحكم في بيانات المستخدمين بسهولة</p>
      </header>

      <div className="w-full max-w-2xl bg-white text-black rounded shadow p-4 space-y-4">
        <div className="flex justify-between items-center">
          <span className="font-bold">مستخدم: أحمد</span>
          <button className="bg-red-600 text-white px-2 py-1 rounded">حذف</button>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-bold">مستخدم: سارة</span>
          <button className="bg-red-600 text-white px-2 py-1 rounded">حذف</button>
        </div>

        {/* إضافة مستخدمين وهميين للتجربة */}
      </div>
    </main>
  );
}
