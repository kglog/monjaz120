import React from "react";
"use client";
import { useState } from "react";

export default function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="divide-y divide-gray-200 rounded-2xl border-2 border-black/80 bg-white">
      {items.map((it, i) => (
        <details
          key={i}
          open={open === i}
          onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open ? i : null)}
          className="p-4"
        >
          <summary className="cursor-pointer list-none select-none font-semibold">
            {it.q}
          </summary>
          <p className="mt-2 text-gray-700">{it.a}</p>
        </details>
      ))}
    </div>
  );
}
