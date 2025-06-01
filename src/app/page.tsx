import { ShoppingCartIcon } from "@heroicons/react/24/solid";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-primary text-white transition duration-300 ease-in-out">
      <header className="text-center py-10">
        <h1 className="text-4xl font-bold">مرحبًا بك في منصتي</h1>
        <p className="text-lg mt-2">أفضل مكان للخدمات المصغرة والاحترافية</p>
      </header>

      {/* استخدم أيقونة جاهزة من Heroicons بدلاً من SVG */}
      <ShoppingCartIcon className="h-20 w-20 text-secondary mb-4" />

      <section className="mt-10 flex flex-col items-center">
        <button
          type="button"
          className="bg-secondary hover:bg-secondary-dark text-white font-bold py-2 px-4 rounded shadow hover:shadow-lg transition-all duration-300"
        >
          تصفح الخدمات
        </button>
      </section>
    </main>
  );
}
