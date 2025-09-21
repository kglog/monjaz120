"use client";

import Image from "next/image";
import Link from "next/link";

const smartCategories = [
  {
    name: "حلول جاهزة",
    slug: "ready-solutions",
    image: "/no-image.png",
  },
  {
    name: "تطوير مخصص",
    slug: "custom-dev",
    image: "/no-image.png",
  },
  {
    name: "تصميم وواجهة",
    slug: "design-ui",
    image: "/no-image.png",
  },
  {
    name: "ذكاء اصطناعي وتلقائي",
    slug: "ai-automation",
    image: "/no-image.png",
  },
  {
    name: "أعمال وتحليل",
    slug: "business-analysis",
    image: "/no-image.png",
  },
  {
    name: "دعم وتشغيل",
    slug: "support",
    image: "/no-image.png",
  },
  {
    name: "من تحت الطاولة",
    slug: "under-table",
    image: "/no-image.png",
  },
  {
    name: "عروض محدودة",
    slug: "limited-offers",
    image: "/no-image.png",
  },
];

export default function CategoriesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">التصنيفات الذكية</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {smartCategories.map((category) => (
          <Link
            key={category.slug}
            href={`/categories/${category.slug}`}
            className="block bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden"
          >
            <Image
              src={category.image}
              alt={category.name}
              width={400}
              height={200}
              className="w-full h-36 object-cover"
            />
            <div className="p-3 text-center font-semibold">{category.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
