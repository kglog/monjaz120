"use client";
import React from "react";
import Link from "next/link";
import HeroShared from "@/components/HeroShared";
import CategoryCard from "@/components/CategoryCard";
import RelatedPills from "@/components/RelatedPills";
import { CATEGORY_MAP } from "@/lib/categoryData";
import { Music2, Headphones } from "lucide-react";

export default function AudioPage() {
  const data = CATEGORY_MAP.audio;

  return (
    <main dir="rtl" className="min-h-screen bg-[rgb(249,251,253)] text-slate-900">
      <HeroShared title={data.hero.title} subtitle={data.hero.subtitle} cta={data.hero.cta} />

      {/* Removed duplicated small pills in hero — kept the larger popular section below */}

      <section id="popular" className="py-14">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-8 text-center text-2xl font-bold text-slate-800">خدمات شائعة في {data.title}</h2>
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {data.popular.map((p) => (
              <CategoryCard
                key={p.title}
                title={p.title}
                tag={p.tag}
                icon={<Music2 className="w-5 h-5" />}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="catalog" className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-10 text-center text-3xl font-extrabold text-slate-900">تصفّح خدمات {data.title}</h2>
          <div className="grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data.subcategories.map((sub) => (
              <div key={sub} className="rounded-2xl border border-black bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="mb-4 text-lg font-bold text-slate-800">{sub}</h3>
                <ul className="space-y-2 text-slate-700">
                    <li className="flex items-center justify-between rounded-lg px-2 py-1 hover:bg-[#bfe8f7]/25">
                    <span>خدمات متعلقة بـ {sub}</span>
                    <span className="text-slate-300">›</span>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-6 text-center text-2xl font-bold text-slate-800">خدمات ذات صلة</h2>
        </div>
        <RelatedPills items={["مونتاج صوتي", "موسيقى خلفية", "أداء صوتي", "IVR"]} />
      </section>
    </main>
  );
}

// ASSISTANT_FINAL: true
