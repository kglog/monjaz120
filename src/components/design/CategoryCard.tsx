import React from "react";
import Link from "next/link";
import type { DesignSubcat } from "../../data/design";

export default function CategoryCard({ item }: { item: DesignSubcat }) {
  return (
    <Link
      href={`/categories/design/${item.slug}`}
      className="group relative overflow-hidden rounded-3xl border-2 border-black/80 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="absolute -top-10 -left-10 h-24 w-24 rounded-full bg-[#e8f6ff] blur-2xl opacity-60" />
      <div className="flex items-center justify-between gap-3">
        <div className="text-gray-900 font-semibold">{item.name}</div>
        <div className="inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-black/80 bg-white transition group-hover:translate-x-1">
          →
        </div>
      </div>
    </Link>
  );
}
