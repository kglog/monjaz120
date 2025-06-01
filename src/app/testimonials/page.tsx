// src/app/testimonials/page.tsx
export default function TestimonialsPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-primary text-white p-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold">آراء العملاء</h1>
        <p className="text-sm mt-2">استمتع بقراءة تجارب العملاء الرائعين</p>
      </header>

      <div className="w-full max-w-2xl bg-white text-black rounded shadow p-4 space-y-4">
        <div className="p-2 border-b">
          <h2 className="font-bold text-lg">خالد</h2>
          <p className="text-sm">خدمة رائعة وفريق محترف!</p>
        </div>

        <div className="p-2 border-b">
          <h2 className="font-bold text-lg">منى</h2>
          <p className="text-sm">أعجبني التفاعل والسرعة في الإنجاز.</p>
        </div>

        <div className="p-2 border-b">
          <h2 className="font-bold text-lg">سامي</h2>
          <p className="text-sm">أفضل موقع للتعاملات الرقمية.</p>
        </div>

        {/* إضافة المزيد من التقييمات لاحقًا */}
      </div>
    </main>
  );
}
