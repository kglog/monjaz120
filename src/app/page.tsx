export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-gray-800 p-6">
      <section className="text-center mt-20">
        <h1 className="text-4xl font-bold mb-4 text-black">مرحبًا بك في منصتي</h1>
        <p className="text-lg mb-8">أفضل مكان للخدمات المصغّرة والاحترافية</p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto text-right">
          <button className="bg-blue-100 hover:bg-blue-200 p-4 rounded">💻 برمجة وتطوير</button>
          <button className="bg-purple-100 hover:bg-purple-200 p-4 rounded">🎨 تصميم</button>
          <button className="bg-yellow-100 hover:bg-yellow-200 p-4 rounded">📢 تسويق رقمي</button>
          <button className="bg-green-100 hover:bg-green-200 p-4 rounded">✍️ كتابة وترجمة</button>
          <button className="bg-pink-100 hover:bg-pink-200 p-4 rounded">🎧 صوتيات</button>
          <button className="bg-gray-100 hover:bg-gray-200 p-4 rounded">📈 أعمال</button>
        </div>
      </section>
    </main>
  );
}
