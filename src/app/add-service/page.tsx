// src/app/add-service/page.tsx
export default function AddServicePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-primary text-white p-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold">إضافة خدمة جديدة</h1>
        <p className="text-sm mt-2">قم بإضافة خدمتك وابدأ ببيعها الآن</p>
      </header>

      <form className="w-full max-w-md bg-white text-black rounded shadow p-4 space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-bold mb-1">عنوان الخدمة:</label>
          <input
            type="text"
            id="title"
            placeholder="مثلاً: تصميم شعار احترافي"
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-bold mb-1">وصف الخدمة:</label>
          <textarea
            id="description"
            placeholder="وصف مختصر للخدمة"
            className="w-full p-2 border rounded"
          ></textarea>
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-bold mb-1">سعر الخدمة (ريال):</label>
          <input
            type="number"
            id="price"
            placeholder="مثلاً: 50"
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-secondary hover:bg-secondary-dark text-white font-bold py-2 px-4 rounded shadow hover:shadow-lg transition-all duration-300"
        >
          إضافة الخدمة
        </button>
      </form>
    </main>
  );
}
