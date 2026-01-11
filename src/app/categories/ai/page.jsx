export const dynamic = "force-dynamic";
export const revalidate = 0;
import CategoryCard from "@/components/CategoryCard";
import RelatedPills from "@/components/RelatedPills";
import { CATEGORY_MAP } from '@/lib/categoryData';

// Prefer canonical data from CATEGORY_MAP; fall back to local defaults if missing
const aiCategory = CATEGORY_MAP['ai'];
const matched = aiCategory ? {
  title: aiCategory.title,
  hero: aiCategory.hero,
  popular: (aiCategory?.popular ?? []).slice(0, 6).map(p => ({ title: p.title, tag: p.tag })),
  subcategories: aiCategory.subcategories || [],
} : {
  title: "Ø°ÙƒØ§Ø¡ Ø§ØµØ·Ù†Ø§Ø¹ÙŠ",
  hero: { title: "Ø°ÙƒØ§Ø¡ Ø§ØµØ·Ù†Ø§Ø¹ÙŠ", subtitle: "Ù†Ù…Ø§Ø°Ø¬ ÙˆÙˆØ§Ø¬Ù‡Ø§Øª Ø°ÙƒÙŠØ© Ù„Ø£ØªÙ…ØªØ© Ø§Ù„Ø£Ø¹Ù…Ø§Ù„ ÙˆØ¥Ù†ØªØ§Ø¬ Ø§Ù„Ù…Ø­ØªÙˆÙ‰.", cta: "Ø§Ø³ØªÙƒØ´Ù Ø­Ù„ÙˆÙ„ Ø§Ù„Ø°ÙƒØ§Ø¡" },
  popular: [
    { title: "Ø¨ÙˆØªØ§Øª Ø¯Ø±Ø¯Ø´Ø©", tag: "Ø¨ÙˆØªØ§Øª" },
    { title: "ØªÙˆÙ„ÙŠØ¯ ØµÙˆØ± AI", tag: "ØµÙˆØ±" },
  ],
  subcategories: ["Ø¨ÙˆØªØ§Øª Ø¯Ø±Ø¯Ø´Ø©/ÙˆØ§ØªØ³Ø§Ø¨", "ØªÙˆÙ„ÙŠØ¯ ØµÙˆØ± Ø¨Ø§Ù„Ù€AI", "Ø£ØªÙ…ØªØ© ÙˆØªÙ‚Ø§Ø±ÙŠØ±", "Ù†Ù…Ø§Ø°Ø¬ Ù…Ø®ØµÙ‘ØµØ©"],
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
          <h2 className="mb-8 text-center text-2xl font-bold text-slate-800">Ø®Ø¯Ù…Ø§Øª Ø´Ø§Ø¦Ø¹Ø© ÙÙŠ {matched.title}</h2>
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {matched.popular.map((p) => (
              <CategoryCard key={p.title} title={p.title} tag={p.tag} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-6 text-center text-2xl font-bold text-slate-800">Ø®Ø¯Ù…Ø§Øª Ø°Ø§Øª ØµÙ„Ø©</h2>
        </div>
        <RelatedPills items={matched.subcategories.slice(0, 6)} />
      </section>
    </main>
  );
}

