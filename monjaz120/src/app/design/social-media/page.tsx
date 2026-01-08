"use client";

import { useEffect, useState } from "react";
import useCurrentUser from "../../components/useCurrentUser";
import Link from "next/link";
import {
  Search,
  Filter,
  Star,
  ShieldCheck,
  Image as ImageIcon,
  User,
  Sparkles,
  ChevronLeft,
  Home,
} from "lucide-react";

type Card = {
  id: string;
  title: string; // عنوان الخدمة
  seller?: string; // اسم البائع
  sellerStatus?: string | null;
  priceFrom?: string | number; // يبدأ من
  rating?: number; // تقيـيم شكلي
  images?: string[];
};

// Dynamic services loaded from dev API (reads data/seller-services.json)
const INITIAL: Card[] = [];

export default function SocialMediaPage() {
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(9);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [services, setServices] = useState<Card[]>(INITIAL);
  const [loadingServices, setLoadingServices] = useState(false);

  const filtered = services.filter((c) =>
    (c.title || "").toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoadingServices(true);
      try {
        const res = await fetch('/api/seller/services');
        const json = await res.json();
        if (mounted && json?.ok && Array.isArray(json.services)) {
          // normalize to Card and filter to this category (social-media)
              const items: Card[] = json.services
            .map((s: any) => ({
              id: String(s.id),
              title: s.title || s.name || 'خدمة',
              seller: s.seller || s.author || 'بائع',
              sellerStatus: s.sellerStatus || s.seller_status || s.seller_state || s.status || s.sellerStatusText || 'متواجد حالياً',
              priceFrom: s.priceFrom || s.price || s.priceFrom || '—',
              rating: typeof s.rating === 'number' ? s.rating : 0,
              images: s.images || [],
              // keep original extra fields if present
            }))
            .filter((it: any, idx: number) => {
              // try common keys for category/subcategory
              const src = json.services[idx];
              const keys = [src.subcategory, src.category, src.slug, src.type].map((v: any) => (v ? String(v).toLowerCase() : ''));
              return keys.includes('social') || keys.includes('social-media') || keys.includes('social_media');
            });
          setServices(items);
        }
      } catch (err) {
        console.error('failed to load services', err);
      } finally {
        setLoadingServices(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <main dir="rtl" className="min-h-screen bg-white text-slate-800">
      {/* Hero */}
  <section className="bg-gradient-to-b from-[#d3e5f5] to-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 py-10">
          {/* breadcrumb */}
          <nav aria-label="breadcrumb" className="mb-4 text-sm text-slate-600">
            <ol className="flex items-center gap-2">
              <li className="flex items-center gap-1">
                <Home className="size-4" />
                <Link href="/" className="hover:underline">الرئيسية</Link>
              </li>
              <li className="opacity-60">/</li>
              <li>
                <Link href="/design" className="hover:underline">التصميم</Link>
              </li>
              <li className="opacity-60">/</li>
              <li className="font-semibold text-slate-700">تصاميم سوشيال ميديا</li>
              <li className="opacity-60">/</li>
              <li className="font-bold text-slate-900">سوشيال ميديا</li>
            </ol>
          </nav>

          <div className="flex flex-col items-center text-center">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">سوشيال ميديا</h1>
            <p className="mt-2 text-slate-700">أعمال إبداعية على يد مصممين محترفين — سعر نهائي شامل الضريبة وعمولتنا تُدار داخليًا.</p>

            <div className="mt-6 flex w-full max-w-xl items-center gap-2">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-500" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="ابحث عن خدمة سوشيال ميديا…"
                  className="w-full rounded-2xl border border-black bg-white py-3 pl-10 pr-4 outline-none focus:border-black focus:ring-2 focus:ring-black/10"
                />
              </div>
              <button
                className="inline-flex items-center gap-2 rounded-2xl bg-white/70 px-4 py-3 text-slate-700 border border-black hover:bg-white"
                type="button"
              >
                <Filter className="size-5" />
                فلترة
              </button>
            </div>

            {/* شريط ضمانات صغير */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-700">
                  {process.env.NEXT_PUBLIC_SHOW_INTERNAL_BADGE === "true" && (
                    <>
                      <Dot />
                      <Badge icon={<User className="size-4" />} text="العمولة تُدار داخليًا – لا تظهر للعميل" />
                    </>
                  )}
            </div>
          </div>
        </div>
      </section>

      {/* محتوى */}
      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* الشريط الجانبي (شكلي) */}
          <aside className="col-span-12 lg:col-span-3 space-y-6">
            <SideCard title="تقييم الخدمة">
              {['4★ أو أكثر', '4.5★ أو أكثر', '5★'].map((t, i) => (
                <label key={i} className="flex cursor-pointer items-center gap-2 py-1">
                  <input type="checkbox" className="size-4 rounded border border-black" />
                  <span>{t}</span>
                </label>
              ))}
            </SideCard>

            <SideCard title="مستوى البائع">
              {['بائع جديد', 'بائع نشيط', 'بائع مميز'].map((t, i) => (
                <label key={i} className="flex cursor-pointer items-center gap-2 py-1">
                  <input type="checkbox" className="size-4 rounded border border-black" />
                  <span>{t}</span>
                </label>
              ))}
            </SideCard>

            <SideCard title="حالة البائع">
              {['متواجد حالياً', 'هوية موثقة'].map((t, i) => (
                <label key={i} className="flex cursor-pointer items-center gap-2 py-1">
                  <input type="checkbox" className="size-4 rounded border border-black" />
                  <span>{t}</span>
                </label>
              ))}
            </SideCard>
          </aside>

          {/* الشبكة */}
          <div className="col-span-12 lg:col-span-9">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">{filtered.length} خدمة — سوشيال ميديا</h2>
              <Link href="/design" className="inline-flex items-center gap-1 text-sky-700 hover:underline">
                رجوع للأقسام
                <ChevronLeft className="size-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.slice(0, visibleCount).map((card) => (
                <ServiceCard
                  key={card.id}
                  card={card}
                  onOpen={() => {
                    setSelectedCard(card);
                    setIsModalOpen(true);
                  }}
                />
              ))}
            </div>

            <div className="mt-6 flex justify-center">
              {visibleCount < filtered.length && (
                <button
                  className="rounded-2xl border border-black px-4 py-2 bg-white"
                  onClick={() => setVisibleCount((c) => c + 9)}
                >
                  تحميل المزيد
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {isModalOpen && selectedCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white overflow-auto">
            <div className="p-4">
              <div className="relative aspect-[16/9] bg-gradient-to-br from-slate-100 to-[#d3e5f5] flex items-center justify-center rounded-lg overflow-hidden">
                {selectedCard.images && selectedCard.images.length ? (
                  <img
                    src={`/api/static/uploads?name=${encodeURIComponent(selectedCard.images[0].split('/').pop() || '')}`}
                    alt={selectedCard.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon className="size-12 text-slate-400" />
                )}
              </div>
              <h3 className="mt-4 text-lg font-semibold">{selectedCard.title}</h3>
              <p className="text-sm text-slate-600">بائع: {selectedCard.seller}</p>
              <div className="mt-3 flex items-center gap-3">
                <span className="font-bold text-slate-900">{selectedCard.priceFrom}</span>
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`size-4 ${i < selectedCard.rating ? "fill-amber-400" : ""}`} />
                  ))}
                </div>
              </div>
              <div className="mt-4 flex gap-2 items-center">
                <Link href={`/services/${selectedCard.id}`} className="rounded-xl bg-sky-100 px-4 py-2">
                  اذهب للتفاصيل
                </Link>

                  {/* Upload - production signed S3 flow: show only to sellers */}
                  <UploadForSellers selectedCard={selectedCard} />

                <button
                  className="ml-auto rounded-xl border border-slate-300 px-4 py-2 bg-white"
                  onClick={() => {
                    setIsModalOpen(false);
                    setSelectedCard(null);
                  }}
                >
                  إغلاق
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

/* ============== Components ============== */

function ServiceCard({ card, onOpen }: { card: Card; onOpen?: () => void }) {
  return (
  <article
    role="button"
    tabIndex={0}
    onClick={() => onOpen && onOpen()}
    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpen && onOpen()}
    className="group rounded-2xl border border-black bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden cursor-pointer"
  >
      {/* صورة Placeholder (البائع يرفع لاحقًا) */}
      <div className="relative aspect-[16/10] bg-gradient-to-br from-slate-100 to-[#d3e5f5] flex items-center justify-center overflow-hidden">
        {card.images && card.images.length ? (
          <img
            src={`/api/static/uploads?name=${encodeURIComponent(card.images[0].split('/').pop() || '')}`}
            alt={card.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <>
            <ImageIcon className="size-6 text-slate-400" />
            <span className="sr-only">هنا صورة العرض</span>
          </>
        )}
        {/* علامة هوية موثقة (شكلية) */}
        <div className="absolute top-3 right-3 rounded-full bg-white/90 px-2 py-1 text-xs text-slate-700 border border-black">هوية موثقة</div>
      </div>

      <div className="p-4">
        <h3 className="line-clamp-2 text-slate-900 font-semibold group-hover:text-sky-700 transition-colors text-sm -translate-y-[2px]">{card.title}</h3>

        <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <div className="size-7 rounded-full bg-slate-200 grid place-content-center">
                <User className="size-4 text-slate-500" />
              </div>
              <div className="flex flex-col">
                <span className="truncate font-medium">{card.seller}</span>
                <span className="mt-1 inline-block rounded-full border border-black bg-white/80 text-xs px-2 py-0.5 text-slate-700">{card.sellerStatus ?? 'متواجد حالياً'}</span>
              </div>
            </div>
          <div className="flex items-center gap-1 text-amber-500" aria-label="rating">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`size-4 ${i < card.rating ? "fill-amber-400" : ""}`} />
            ))}
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between -translate-y-[2px]">
          <span className="text-slate-700 text-sm">تبدأ من</span>
          <span className="font-bold text-slate-900">{card.priceFrom}</span>
        </div>

        <button
          type="button"
          className="mt-4 w-full rounded-xl bg-[#d3e5f5] text-black py-2.5 border border-black/10 hover:bg-[#c8e0f2] text-sm"
        >
          استكشف الخدمة
        </button>
      </div>
    </article>
  );
}

function SideCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-black bg-white p-4 shadow-sm text-center">
      <h3 className="mb-2 font-semibold text-slate-900 text-center">{title}</h3>
      <div className="text-sm text-slate-700 space-y-1 flex flex-col items-center">{children}</div>
    </div>
  );
}

function Badge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/70 px-3 py-1.5">
      {icon}
      <span className="text-slate-700">{text}</span>
    </div>
  );
}

function Dot() {
  return <span className="mx-1 text-slate-400">•</span>;
}

function UploadForSellers(_: { selectedCard: Card | null }) {
  // Upload UI removed by request: do not render any upload control.
  // Keeping the component stub to avoid editing many call sites across the codebase.
  return null;
}

// ASSISTANT_FINAL: true
