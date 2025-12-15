"use client";
import React from "react";
import { CATEGORY_MAP } from "@/lib/categoryData";

export default function HeroShared({ title, subtitle, cta }: { title: string; subtitle?: string; cta?: string }) {
  // try to find the category key by matching the Arabic title from CATEGORY_MAP
  const categoryEntry = Object.entries(CATEGORY_MAP).find(([, v]) => v.title === title || v.hero?.title === title);
  const categoryKey = categoryEntry ? categoryEntry[0] : null;
  const href = categoryKey ? `/categories/${encodeURIComponent(categoryKey)}` : "#catalog";

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#bfe8f7]/25 via-[#bfe8f7]/20 to-transparent" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 text-center">
        <h1>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full bg-[#bfe8f7] px-7 py-2 text-3xl md:text-4xl font-extrabold tracking-tight text-white border border-black shadow-lg hover:shadow-2xl transform-gpu hover:-translate-y-1 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#bfe8f7]/35"
          >
            {title}
          </button>
        </h1>
        {subtitle && <p className="mt-4 text-center text-slate-600">{subtitle}</p>}

        {cta && (
          <div className="relative mt-8 flex justify-center">
            {/* CTA link - must be interactive */}
            <a
              href={href}
              className="relative z-10 pointer-events-auto group inline-flex items-center gap-1 rounded-full px-4 py-1
                         text-white bg-[#bfe8f7] hover:bg-[#bfe8f7]
                         transition-all duration-200 shadow-sm hover:shadow-md
                         hover:-translate-y-1 hover:scale-[1.01] transform-gpu
                         focus:outline-none focus:ring-4 focus:ring-[#bfe8f7]/30 overflow-hidden border border-black"
            >
              <span
                className="relative z-20 text-xl md:text-2xl font-light leading-none"
                style={{
                  display: 'inline-block',
                  WebkitTextFillColor: "transparent",
                  WebkitTextStroke: "0.9px white",
                  textShadow: "-0.9px -0.9px 0 #fff, 0.9px -0.9px 0 #fff, -0.9px 0.9px 0 #fff, 0.9px 0.9px 0 #fff",
                  color: "white",
                  transform: 'none',
                }}
              >
                {cta}
              </span>
              <span
                className="relative z-20 transition-transform duration-200"
                style={{ display: 'inline-block', transform: 'none', marginLeft: '0.25rem' }}
              >
                ↗
              </span>
            </a>

            {/* decorative gloss and overlays - must not catch pointer events */}
            <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent" aria-hidden="true" />
            <span className="pointer-events-none absolute left-1/2 top-1/2 h-[140%] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/8 blur-[12px]" aria-hidden="true" />
          </div>
        )}
      </div>
    </section>
  );
}

// ASSISTANT_FINAL: true
