// src/app/blog/page.tsx
export default function BlogPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-primary text-white p-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold">مدونتنا</h1>
        <p className="text-sm mt-2">تعرف على آخر المقالات والأخبار</p>
      </header>

      <div className="w-full max-w-2xl bg-white text-black rounded shadow p-4 space-y-4">
        <div className="p-2 border-b">
          <h2 className="font-bold text-lg">أهمية التواجد الرقمي للأعمال</h2>
          <p className="text-sm">في هذا المقال، نستعرض كيف يساعد التواجد الرقمي في نمو مشروعك.</p>
        </div>

        <div className="p-2 border-b">
          <h2 className="font-bold text-lg">أفضل استراتيجيات التسويق الرقمي</h2>
          <p className="text-sm">دليلك الشامل لبناء حملة تسويق ناجحة على الإنترنت.</p>
        </div>

        {/* إضافة المزيد من المقالات لاحقًا */}
      </div>
    </main>
  );
}
