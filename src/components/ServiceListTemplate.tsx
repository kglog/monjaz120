"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Filter, Star, Image as ImageIcon, User, ChevronLeft, Home } from "lucide-react";

type Card = {
  id: string;
  title: string;
  seller?: string;
  priceFrom?: string | number;
  rating?: number;
  images?: string[];
  sellerStatus?: string | null;
  sellerLevel?: string | null;
};

export default function ServiceListTemplate({
  title,
  subtitle,
  categoryKey,
}: {
  title: string;
  subtitle?: string;
  categoryKey?: string;
}) {
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(9);
  const [services, setServices] = useState<Card[]>([]);
  const [loadingServices, setLoadingServices] = useState(false);
  const [levelNew, setLevelNew] = useState(false);
  const [levelActive, setLevelActive] = useState(false);
  const [levelPro, setLevelPro] = useState(false);
  const [onlyOnline, setOnlyOnline] = useState(false);
  const [onlyVerified, setOnlyVerified] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoadingServices(true);
      try {
        const q = categoryKey ? `?category=${encodeURIComponent(categoryKey)}` : '';
        const res = await fetch(`/api/seller/services${q}`);
        const json = await res.json();
        if (mounted && json?.ok && Array.isArray(json.services)) {
          const items: Card[] = json.services.map((s: any) => ({
            id: String(s.id),
            title: s.title || s.name || 'خدمة',
            seller: s.seller || s.author || 'بائع',
            priceFrom: s.priceFrom || s.price || '—',
            rating: typeof s.rating === 'number' ? s.rating : 0,
            images: s.images || [],
            // try several likely fields for seller status; fallback to a visible default so every card shows the badge
            sellerStatus:
              s.sellerStatus || s.seller_status || s.seller_state || s.status || s.sellerStatusText || 'متواجد حالياً',
            sellerLevel: s.sellerLevel || s.seller_level || s.seller_type || null,
          }));
          setServices(items);
        }
      } catch (err) {
        console.error('failed to load services', err);
      } finally {
        setLoadingServices(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

// ASSISTANT_FINAL: true

  const filtered = services.filter((c) => {
    if (!((c.title || '').toLowerCase().includes(query.toLowerCase()))) return false;

    // seller level filtering
    const levelsPicked = new Set<string>();
    if (levelNew) levelsPicked.add('new');
    if (levelActive) levelsPicked.add('active');
    if (levelPro) levelsPicked.add('pro');
    if (levelsPicked.size > 0) {
      const lvl = (c.sellerLevel || 'new').toString().toLowerCase();
      if (!levelsPicked.has(lvl)) return false;
    }

    // seller status filtering
    if (onlyOnline && !(c.sellerStatus || '').toLowerCase().includes('متواجد')) return false;
    if (onlyVerified && !(c.sellerStatus || '').toLowerCase().includes('هوية')) return false;

    return true;
  });

  return (
    <main dir="rtl" className="min-h-screen bg-white text-slate-800">
      <section className="bg-gradient-to-b from-[#d3e5f5] to-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <nav aria-label="breadcrumb" className="mb-4 text-sm text-slate-600">
            <ol className="flex items-center gap-2">
              <li className="flex items-center gap-1">
                <Home className="size-4" />
                <Link href="/" className="hover:underline">الرئيسية</Link>
              </li>
              <li className="opacity-60">/</li>
              {categoryKey && (
                <>
                  <li>
                    <Link href={`/${categoryKey}`} className="hover:underline">{title}</Link>
                  </li>
                  <li className="opacity-60">/</li>
                </>
              )}
              <li className="font-bold text-slate-900">{title}</li>
            </ol>
          </nav>

          <div className="flex flex-col items-center text-center">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">{title}</h1>
            {subtitle && <p className="mt-2 text-slate-700">{subtitle}</p>}

            <div className="mt-6 flex w-full max-w-xl items-center gap-2">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-500" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={`ابحث في ${title}...`}
                  className="w-full rounded-2xl border border-black bg-white py-3 pl-10 pr-4 outline-none focus:border-black focus:ring-2 focus:ring-black/10"
                />
              </div>
              <button className="inline-flex items-center gap-2 rounded-2xl bg-white/70 px-4 py-3 text-slate-700 border border-black hover:bg-white" type="button">
                <Filter className="size-5" />
                فلترة
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-12 gap-6">
          <aside className="col-span-12 lg:col-span-3 space-y-6">
            <div className="rounded-2xl border border-black bg-white p-4 shadow-sm text-center">
              <h3 className="mb-2 font-semibold text-slate-900 text-center">تقييم الخدمة</h3>
              <div className="text-sm text-slate-700 space-y-1 flex flex-col items-center">
                {['4★ أو أكثر', '4.5★ أو أكثر', '5★'].map((t, i) => (
                  <label key={i} className="flex cursor-pointer items-center gap-2 py-1">
                    <input type="checkbox" className="size-4 rounded border border-black" />
                    <span>{t}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-black bg-white p-4 shadow-sm text-center">
              <h3 className="mb-2 font-semibold text-slate-900 text-center">مستوى البائع</h3>
              <div className="text-sm text-slate-700 space-y-1 flex flex-col items-center">
                  <label className="flex cursor-pointer items-center gap-2 py-1">
                    <input type="checkbox" className="size-4 rounded border border-black" checked={levelNew} onChange={(e) => setLevelNew(e.target.checked)} />
                    <span>بائع جديد</span>
                  </label>
                  <label className="flex cursor-pointer items-center gap-2 py-1">
                    <input type="checkbox" className="size-4 rounded border border-black" checked={levelActive} onChange={(e) => setLevelActive(e.target.checked)} />
                    <span>بائع نشيط</span>
                  </label>
                  <label className="flex cursor-pointer items-center gap-2 py-1">
                    <input type="checkbox" className="size-4 rounded border border-black" checked={levelPro} onChange={(e) => setLevelPro(e.target.checked)} />
                    <span>بائع مميز</span>
                  </label>
              </div>
            </div>

              <div className="rounded-2xl border border-black bg-white p-4 shadow-sm text-center">
                <h3 className="mb-2 font-semibold text-slate-900 text-center">حالة البائع</h3>
                <div className="text-sm text-slate-700 space-y-1 flex flex-col items-center">
                  <label className="flex cursor-pointer items-center gap-2 py-1">
                    <input type="checkbox" className="size-4 rounded border border-black" checked={onlyOnline} onChange={(e) => setOnlyOnline(e.target.checked)} />
                    <span>متواجد حالياً</span>
                  </label>
                  <label className="flex cursor-pointer items-center gap-2 py-1">
                    <input type="checkbox" className="size-4 rounded border border-black" checked={onlyVerified} onChange={(e) => setOnlyVerified(e.target.checked)} />
                    <span>هوية موثقة</span>
                  </label>
                </div>
              </div>
          </aside>

          <div className="col-span-12 lg:col-span-9">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">{filtered.length} خدمة — {title}</h2>
              <Link href={`/${categoryKey || 'categories'}`} className="inline-flex items-center gap-1 text-sky-700 hover:underline">
                رجوع للأقسام
                <ChevronLeft className="size-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.slice(0, visibleCount).map((card) => (
                <article key={card.id} className="group rounded-2xl border border-black bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                  <div className="relative aspect-[16/10] bg-gradient-to-br from-slate-100 to-[#d3e5f5] flex items-center justify-center overflow-hidden">
                    {card.images && card.images.length ? (
                      <img src={`/api/static/uploads?name=${encodeURIComponent(card.images[0].split('/').pop() || '')}`} alt={card.title} className="w-full h-full object-cover" />
                    ) : (
                      <>
                        <ImageIcon className="size-6 text-slate-400" />
                        <span className="sr-only">هنا صورة العرض</span>
                      </>
                    )}
                    <div className="absolute top-3 right-3 rounded-full bg-white/90 px-2 py-1 text-xs text-slate-700 border border-black">هوية موثقة</div>
                  </div>

                  <div className="p-4">
                    <h3 className="line-clamp-2 text-slate-900 font-semibold group-hover:text-sky-700 transition-colors text-sm -translate-y-[2px]">{card.title}</h3>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-3 text-sm text-slate-600">
                        <div className="size-7 rounded-full bg-slate-200 grid place-content-center">
                          <User className="size-4 text-slate-500" />
                        </div>
                        <div className="flex flex-col">
                          <span className="truncate font-medium">{card.seller}</span>
                          {card.sellerStatus && (
                            <span className="mt-1 inline-block rounded-full border border-black bg-white/80 text-xs px-2 py-0.5 text-slate-700">{card.sellerStatus}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-amber-500" aria-label="rating">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`size-4 ${i < (card.rating || 0) ? "fill-amber-400" : ""}`} />
                        ))}
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between -translate-y-[2px]">
                      <span className="text-slate-700 text-sm">تبدأ من</span>
                      <span className="font-bold text-slate-900">{card.priceFrom}</span>
                    </div>

                    <Link href={`/services/${card.id}`} className="mt-4 inline-block w-full rounded-xl bg-[#d3e5f5] text-black py-2.5 border border-black/10 hover:bg-[#c8e0f2] text-sm text-center">
                      استكشف الخدمة
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-6 flex justify-center">
              {visibleCount < filtered.length && (
                <button className="rounded-2xl border border-black px-4 py-2 bg-white" onClick={() => setVisibleCount((c) => c + 9)}>
                  تحميل المزيد
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {false && <div />} {/* reserved for modal logic if needed by pages */}
    </main>
  );
}

// ASSISTANT_FINAL: true
