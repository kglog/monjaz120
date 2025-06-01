// src/app/about/page.tsx
export default function AboutPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-primary text-white p-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold">من نحن</h1>
        <p className="text-sm mt-2">تعرف أكثر عن منصتنا وفريق العمل</p>
      </header>

      <div className="w-full max-w-2xl bg-white text-black rounded shadow p-4 space-y-4">
        <p>
          منصتنا تم إنشاؤها لتقديم أفضل الحلول للعملاء والبائعين. هدفنا تقديم بيئة آمنة
          ومريحة للجميع، وتحقيق أعلى جودة في الخدمات.
        </p>

        <p>
          فريقنا يتكون من مطورين وخبراء تصميم وتسويق، يعملون معًا لتطوير المنصة بشكل مستمر
          وتقديم أفضل تجربة ممكنة.
        </p>

        <p>
          لأي استفسار أو تعاون، تواصل معنا عبر صفحة <a href="/contact" className="text-blue-500 underline">تواصل معنا</a>.
        </p>
      </div>
    </main>
  );
}
