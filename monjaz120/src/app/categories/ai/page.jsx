"use client";
import CategoryCard from "@/components/CategoryCard";
import RelatedPills from "@/components/RelatedPills";
<<<<<<< HEAD
import { CATEGORY_MAP } from '@/lib/categoryData';

// Prefer canonical data from CATEGORY_MAP; fall back to local defaults if missing
const aiCategory = CATEGORY_MAP['ai'];
const matched = aiCategory ? {
  title: aiCategory.title,
  hero: aiCategory.hero,
  popular: aiCategory.popular.slice(0, 6).map(p => ({ title: p.title, tag: p.tag })),
  subcategories: aiCategory.subcategories || [],
} : {
=======

const matched = {
>>>>>>> 00718cd219b2fc648988ef78590cdd3567cd44d0
  title: "ذكاء اصطناعي",
  hero: { title: "ذكاء اصطناعي", subtitle: "نماذج وواجهات ذكية لأتمتة الأعمال وإنتاج المحتوى.", cta: "استكشف حلول الذكاء" },
  popular: [
    { title: "بوتات دردشة", tag: "بوتات" },
    { title: "توليد صور AI", tag: "صور" },
  ],
  subcategories: ["بوتات دردشة/واتساب", "توليد صور بالـAI", "أتمتة وتقارير", "نماذج مخصّصة"],
};

export default function AIPage() {
  return (
    <main dir="rtl" className="min-h-screen bg-[rgb(249,251,253)] text-slate-900">
      <section className="py-14">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-3xl font-extrabold text-center mb-4">{matched.hero.title}</h1>
          <p className="text-center text-slate-600">{matched.hero.subtitle}</p>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-8 text-center text-2xl font-bold text-slate-800">خدمات شائعة في {matched.title}</h2>
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {matched.popular.map((p) => (
              <CategoryCard key={p.title} title={p.title} tag={p.tag} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-6 text-center text-2xl font-bold text-slate-800">خدمات ذات صلة</h2>
        </div>
        <RelatedPills items={matched.subcategories.slice(0, 6)} />
      </section>
    </main>
  );
}
