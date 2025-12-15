import React from "react";
"use client";
import { useState } from "react";
import { DESIGN_CATEGORIES } from "../../lib/design/categories";
import Link from "next/link";

const PLANS = [
  { key: "fast", label: "سريع 24 ساعة" },
  { key: "eco", label: "باقة اقتصادية" },
  { key: "pro", label: "باقة احترافية" },
];

export default function SubcategoryBar() {
  const [active, setActive] = useState<string>("logo");
  return (
    <div className="space-y-3">
      <div className="flex gap-2 overflow-x-auto pb-1">
        {DESIGN_CATEGORIES.slice(0, 8).map((c: any) => (
          <button
            key={c.key}
            onClick={() => setActive(c.key)}
            className={`px-3 py-2 rounded-xl border whitespace-nowrap ${
              active === c.key ? "bg-sky-900 text-white border-sky-900" : "bg-white border-sky-200 text-sky-900"
            }`}
            title={c.descAr}
          >
            {c.nameAr}
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        {PLANS.map(p => (
          <Link
            key={p.key}
            href={`/design/${active}`}
            className="px-3 py-1.5 rounded-full border border-black text-slate-900 bg-white hover:bg-sky-50 text-sm"
            title="يعرض خدمات مناسبة لهذا الخيار"
          >
            {p.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
