"use client";

"use client";

import Link from "next/link";
import { CATEGORY_MAP } from '@/lib/categoryData';

// Use canonical CATEGORY_MAP for listing
const categories = Object.values(CATEGORY_MAP).map((c) => ({ key: c.key, title: c.title }));

export default function CategoriesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">التصنيفات</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((c) => (
          <Link
            key={c.key}
            href={`/categories/${c.key}`}
            className="block bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden border border-black"
          >
            <div className="w-full h-36 bg-gradient-to-br from-white/60 to-[#bfe8f7]/12" />
            <div className="p-3 text-center font-semibold">{c.title}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

  // ASSISTANT_FINAL: true
