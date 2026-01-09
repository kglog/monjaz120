// 📄 src/app/categories/[slug]/page.tsx
"use client";
export const dynamic = "force-dynamic";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { CATALOG } from '@/data/catalog';
import brain from "@/core/brain-safe";
import HeroShared from "@/components/HeroShared";
import CategoryCard from "@/components/CategoryCard";
import RelatedPills from "@/components/RelatedPills";
import { CATEGORY_MAP } from "@/lib/categoryData";
import { Code, NotebookPen, Megaphone, Clapperboard, Music2, Cpu, Globe, Image, Smartphone, Database, TrendingUp } from "lucide-react";

export default function CategoryPage() {
  const routeParams = useParams<{ slug?: string }>();
  const searchParams = useSearchParams();
  const name = decodeURIComponent(routeParams.slug ?? "");
  const subQuery = searchParams?.get("sub") || null;

  const [q, setQ] = useState("");

  useEffect(() => {
    if (!name) return;
    try {
      brain.logEvent("open_category", { title: name });
      brain.logEvent("visit", { path: `/categories/${encodeURIComponent(name)}` });
    } catch {}
  }, [name]);

  // حاول نلاقي بيانات التصنيف من CATEGORY_MAP بمقارنة العنوان العربي أو المفتاح الداخلي
  // هذا يسمح لكل من المسارات العربية (مثال: /categories/أعمال) والإنجليزية (مثال: /categories/business)
  let matched =
    Object.values(CATEGORY_MAP).find((c) => c.title === name || c.key === name || encodeURIComponent(c.title) === routeParams.slug) || null;

  // لو ما لقيناش تطابق دقيق، نحاول نطابق الاسم مع العناوين الشائعة أو الفئات الفرعية
  // هذا يغطي حالات مثل /categories/تحسين محركات البحث أو /categories/موشن جرافيك
  let overrideTitle: string | null = null;
  if (!matched) {
    const found = Object.values(CATEGORY_MAP).find((c) =>
      c.popular.some((p) => p.title === name || p.title.includes(name)) || c.subcategories.some((s) => s === name || s.includes(name))
    );
    if (found) {
      matched = found;
      overrideTitle = name; // نعرض العنوان المطلوب (مثلاً تحسين محركات البحث) لكن نستخدم بيانات الفئة الأم
    }
  }

  function IconForCategory(key: string | undefined) {
    switch (key) {
      case "programming":
        return <Code className="w-4 h-4" />;
      case "writing":
        return <NotebookPen className="w-4 h-4" />;
      case "marketing":
        return <Megaphone className="w-4 h-4" />;
      case "video":
        return <Clapperboard className="w-4 h-4" />;
      case "audio":
        return <Music2 className="w-4 h-4" />;
      case "ai":
        return <Cpu className="w-4 h-4" />;
      default:
        return <Code className="w-4 h-4" />;
    }
  }

  function IconForSubcategory(sub: string) {
    const s = sub.toLowerCase();
    if (s.includes("موقع") || s.includes("مواقع") || s.includes("موقع إلكتروني") || s.includes("مواقع")) return <Globe className="w-5 h-5" />;
    if (s.includes("وورد")) return <Globe className="w-5 h-5" />;
    if (s.includes("تطبيق") || s.includes("جوال") || s.includes("موبايل")) return <Smartphone className="w-5 h-5" />;
    if (s.includes("شعار") || s.includes("logo") || s.includes("هوية")) return <Image className="w-5 h-5" />;
    if (s.includes("مونتاج") || s.includes("فيديو") || s.includes("موشن")) return <Clapperboard className="w-5 h-5" />;
    if (s.includes("صوت") || s.includes("تعليق")) return <Music2 className="w-5 h-5" />;
    if (s.includes("سيو") || s.includes("تحسين")) return <TrendingUp className="w-5 h-5" />;
    if (s.includes("بيانات") || s.includes("تحليل")) return <Database className="w-5 h-5" />;
    if (s.includes("كتابة") || s.includes("ترج")) return <NotebookPen className="w-5 h-5" />;
    return <Code className="w-5 h-5" />;
  }

  // عناصر افتراضية عند عدم وجود تطابق
  const fallbackItems = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: `خدمة ${name} #${i + 1}`,
    desc: `وصف مختصر لخدمة ضمن قسم ${name}.`,
  }));

  const filteredItems = (matched ? matched.popular.map((p, idx) => ({ id: idx + 1, title: p.title, desc: p.tag })) : fallbackItems).filter(
    (it) => !q.trim() || it.title.includes(q.trim()) || it.desc.includes(q.trim())
  );

  if (!name) {
    return (
      <main className="min-h-screen max-w-6xl mx-auto px-4 py-10">
        <p className="text-gray-600">القسم غير محدد.</p>
      </main>
    );
  }

  // إذا وجدنا تطابق نُظهر النسق الموحد (Hero + بطاقات + حبوب ذات صلة)
  if (matched) {
    const displayTitle = overrideTitle ?? matched.hero.title;
    // verify sub from query param if present, and ensure it exists in CATALOG
    let validatedSub: string | null = null;
    if (subQuery) {
      try {
        const subs = (CATALOG as any)[matched.title] || [];
        if (subs.includes(subQuery)) validatedSub = subQuery;
      } catch {}
    }
    return (
      <main dir="rtl" className="min-h-screen bg-[rgb(249,251,253)] text-slate-900">
        <HeroShared title={displayTitle} subtitle={matched.hero.subtitle} cta={matched.hero.cta} />

        {/* small quick-links row generated from matched.popular - mirrors the cards below */}
        <div className="mx-auto max-w-7xl px-4">
          {/* Removed duplicated small pills in hero — kept the larger popular section below */}
        </div>

        <section id="popular" className="py-14">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="mb-8 text-center text-2xl font-bold text-slate-800">خدمات شائعة في {displayTitle}</h2>
            <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {matched!.subcategories.map((sub) => {
                const cardHref = `/categories/${encodeURIComponent(matched!.title)}?sub=${encodeURIComponent(sub)}`;
                return (
                  <Link key={sub} href={cardHref} className="block">
                    <CategoryCard title={sub} tag={''} icon={IconForSubcategory(sub)} />
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section id="catalog" className="py-16">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="mb-10 text-center text-3xl font-extrabold text-slate-900">تصفّح خدمات {displayTitle}</h2>
            <div className="grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {matched!.subcategories.map((sub) => {
                const subHref = `/categories/${encodeURIComponent(matched!.title)}?sub=${encodeURIComponent(sub)}`;
                return (
                  <Link key={sub} href={subHref} className="block">
                    <div className="rounded-2xl border border-black bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                      <h3 className="mb-4 text-lg font-bold text-slate-800">
                        <span className="me-2 text-[#bfe8f7]">◆</span>{sub}
                      </h3>
                      <ul className="space-y-2 text-slate-700">
                        <li className="flex items-center justify-between rounded-lg px-2 py-1 hover:bg-[#bfe8f7]/10">
                          <div className="flex items-center gap-3">
                            <span className="text-slate-700">خدمات متعلقة بـ {sub}</span>
                          </div>
                          <span className="text-slate-300">›</span>
                        </li>
                      </ul>
                    </div>
                  </Link>
                );
              })}
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

  // وإلا نستخدم السلوك القديم (قائمة خدمات افتراضية + بحث)
  return (
    <main className="min-h-screen max-w-6xl mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">قسم: {name}</h1>

        <div className="flex gap-2">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="بحث داخل القسم…"
            className="rounded-xl border-2 border-black px-3 py-2 outline-none"
          />
          <button
            onClick={() => {
              try {
                brain.logEvent("action", {
                  action: "category_search_click",
                  query: q,
                  category: name,
                });
              } catch {}
            }}
            className="rounded-xl border-2 border-black px-4 py-2 font-semibold hover:bg-gray-100"
          >
            بحث
          </button>
        </div>
      </div>

      <p className="mt-3 text-gray-600">
        هذه صفحة القسم <span className="font-semibold">{name}</span>. تقدر تضيف هنا قائمة خدمات
        حقيقية، فلاتر، أو أي محتوى.
      </p>

      <div className="mt-6">
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredItems.map((it) => (
            <Link
              key={it.id}
              href={`/services/${it.id}`}
              className="block text-left"
              onClick={() => {
                try {
                  brain.logEvent("action", {
                    action: "open_service_card",
                    service_id: it.id,
                    category: name,
                  });
                } catch {}
              }}
            >
              <CategoryCard title={it.title} tag={it.desc} />
            </Link>
          ))}
        </div>
      </div>

      <a
        href="/"
        className="inline-block mt-8 px-4 py-2 border-2 border-black rounded-xl font-semibold"
        onClick={() => {
          try {
            brain.logEvent("action", {
              action: "back_to_home_from_category",
              category: name,
            });
          } catch {}
        }}
      >
        ⟵ رجوع للصفحة الرئيسية
      </a>
    </main>
  );
}

// ASSISTANT_FINAL: true
