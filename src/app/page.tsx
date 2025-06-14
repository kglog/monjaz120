export default function HomePage() {
  return (
    <main dir="rtl" className="min-h-screen bg-[#fff3cd] text-[#856404] font-sans p-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">مرحبًا بك في منصتي</h1>
        <p className="text-lg">أفضل مكان للخدمات المصغّرة والاحترافية</p>
      </section>

      <section className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
        <div className="bg-white shadow p-6 rounded hover:scale-105 transition">
          💻 <p className="mt-2">برمجة وتطوير</p>
        </div>
        <div className="bg-white shadow p-6 rounded hover:scale-105 transition">
          🎨 <p className="mt-2">تصميم</p>
        </div>
        <div className="bg-white shadow p-6 rounded hover:scale-105 transition">
          📢 <p className="mt-2">تسويق رقمي</p>
        </div>
        <div className="bg-white shadow p-6 rounded hover:scale-105 transition">
          ✍️ <p className="mt-2">كتابة وترجمة</p>
        </div>
        <div className="bg-white shadow p-6 rounded hover:scale-105 transition">
          🎧 <p className="mt-2">صوتيات</p>
        </div>
        <div className="bg-white shadow p-6 rounded hover:scale-105 transition">
          📈 <p className="mt-2">أعمال</p>
        </div>
      </section>
    </main>
  );
}
