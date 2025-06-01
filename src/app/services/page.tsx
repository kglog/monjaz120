// src/app/services/page.tsx
export default function ServicesPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-primary text-white p-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold">خدماتنا</h1>
        <p className="text-sm mt-2">تصفح جميع الخدمات المتاحة في المنصة</p>
      </header>

      <div className="w-full max-w-2xl bg-white text-black rounded shadow p-4 space-y-4">
        <div className="p-2 border-b">
          <h2 className="font-bold text-lg">خدمة تصميم مواقع</h2>
          <p className="text-sm">نوفر خدمات تصميم مواقع احترافية لجميع احتياجاتك.</p>
        </div>

        <div className="p-2 border-b">
          <h2 className="font-bold text-lg">خدمة كتابة محتوى</h2>
          <p className="text-sm">كتابة مقالات ونصوص تسويقية بجودة عالية.</p>
        </div>

        <div className="p-2 border-b">
          <h2 className="font-bold text-lg">خدمة استشارات أعمال</h2>
          <p className="text-sm">نساعدك في تطوير مشروعك عبر نصائح وإستراتيجيات.</p>
        </div>

        {/* إضافة المزيد من الخدمات لاحقًا */}
      </div>
    </main>
  );
}
