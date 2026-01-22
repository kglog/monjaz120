import React from "react";
import Link from "next/link";
import { translateTag } from "@/lib/tagTranslations";

export default function RelatedPills({ items }: { items: string[] }) {
  return (
    <div className="mx-auto max-w-7xl px-4">
      <div className="flex flex-wrap justify-center gap-3">
        {items.map((pill) => (
          <Link
            key={pill}
            href={`/categories/${encodeURIComponent(pill)}`}
            className="rounded-full border border-black bg-[#bfe8f7]/20 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-sky-50 transition-colors"
          >
            {translateTag(pill)}
          </Link>
        ))}
      </div>
    </div>
  );
}
// ASSISTANT_FINAL: true
