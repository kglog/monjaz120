"use client";
import React from 'react';
import Link from "next/link";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import ServiceCardUnified, { ServiceItem, SellerLevel } from "@/components/services/ServiceCardUnified";

type Breadcrumb = { label: string; href?: string };

function FilterBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 text-base font-bold text-slate-900">{title}</div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function CheckRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3 text-sm text-slate-700">
      <span>{label}</span>
      <input
        type="checkbox"
        className="h-4 w-4 accent-slate-900"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
    </label>
  );
}

export default function ServiceCategoryTemplate({
  title,
  subtitle,
  breadcrumbs,
  placeholder,
  backHref = "/design",
  backLabel = "رجوع للأقسام",
  services,
  showBudgetFilters = false,
  showDeliveryFilters = false,
  showLanguageFilters = false,
  showDealsOnly = false,
}: {
  title: string;
  subtitle: string;
  breadcrumbs: Breadcrumb[];
  placeholder: string;
  services: ServiceItem[];
  backHref?: string;
  backLabel?: string;

  // إضافات (لو تبغاها لبعض الأقسام)، مع بقاء الشكل موحّد
  showBudgetFilters?: boolean;
  showDeliveryFilters?: boolean;
  showLanguageFilters?: boolean;
  showDealsOnly?: boolean;
}) {
  const [q, setQ] = useState("");
  const [minRating4, setMinRating4] = useState(false);
  const [minRating45, setMinRating45] = useState(false);
  const [only5, setOnly5] = useState(false);

  const [levelNew, setLevelNew] = useState(false);
  const [levelActive, setLevelActive] = useState(false);
  const [levelPro, setLevelPro] = useState(false);

  const [onlyOnline, setOnlyOnline] = useState(false);
  const [onlyVerified, setOnlyVerified] = useState(false);

  // اختياري لبعض الأقسام
  const [budgetMin, setBudgetMin] = useState<number>(10);
  const [budgetMax, setBudgetMax] = useState<number>(2000);
  const [delivery, setDelivery] = useState<string>("any");
  const [lang, setLang] = useState<string>("any");
  const [todayDeals, setTodayDeals] = useState<boolean>(false);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    const minRating = only5 ? 5 : minRating45 ? 4.5 : minRating4 ? 4 : 0;

    const levelsPicked = new Set<SellerLevel>();
    if (levelNew) levelsPicked.add("new");
    if (levelActive) levelsPicked.add("active");
    if (levelPro) levelsPicked.add("pro");

    return services.filter((s) => {
      if (query) {
        const hay = `${s.title} ${s.sellerName}`.toLowerCase();
        if (!hay.includes(query)) return false;
      }

      if (minRating > 0 && s.rating < minRating) return false;

      if (levelsPicked.size > 0) {
        const lvl = s.sellerLevel ?? "new";
        if (!levelsPicked.has(lvl)) return false;
      }

      if (onlyOnline && !s.isOnline) return false;
      if (onlyVerified && !s.isVerified) return false;

      if (showBudgetFilters) {
        if (s.currency !== "USD") {
          if (s.price < budgetMin || s.price > budgetMax) return false;
        }
      }

      // delivery/lang/todayDeals هنا Placeholder للتماسك الشكلي (تربطه ببياناتك لاحقًا)
      if (showDealsOnly && todayDeals) {
        // لو عندك حقل dealsOnly في البيانات اربطه هنا
      }
      if (showDeliveryFilters && delivery !== "any") {
        // اربطه ببياناتك لاحقًا
      }
      if (showLanguageFilters && lang !== "any") {
        // اربطه ببياناتك لاحقًا
      }

      return true;
    });
  }, [
    q,
    minRating4,
    minRating45,
    only5,
    levelNew,
    levelActive,
    levelPro,
    onlyOnline,
    onlyVerified,
    budgetMin,
    budgetMax,
    delivery,
    lang,
    todayDeals,
    services,
    showBudgetFilters,
    showDeliveryFilters,
    showLanguageFilters,
    showDealsOnly,
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-14">
      {/* Hero / Breadcrumb */}
      <div className="mt-6 rounded-3xl border border-slate-200 bg-gradient-to-b from-[#dbf4ff] to-white p-8">
        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
          {breadcrumbs.map((b, i) => (
            <span key={`${b.label}-${i}`} className="flex items-center gap-2">
              {b.href ? (
                <Link href={b.href} className="hover:text-slate-700">
                  {b.label}
                </Link>
              ) : (
                <span className="text-slate-700">{b.label}</span>
              )}
              {i !== breadcrumbs.length - 1 && <span className="text-slate-400">/</span>}
            </span>
          ))}
        </div>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900">{title}</h1>
        <p className="mt-2 max-w-3xl text-slate-600">{subtitle}</p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm"
          >
            <SlidersHorizontal className="h-4 w-4" />
            فلترة
          </button>

          <div className="relative w-full sm:flex-1">
            <Search className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={placeholder}
              className="w-full rounded-2xl border border-slate-200 bg-white py-3 pr-11 pl-4 text-sm outline-none focus:border-slate-300"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
        {/* Left */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <div className="text-xl font-extrabold text-slate-900">
              {filtered.length} خدمة — {title}
            </div>
            <Link href={backHref} className="text-sm font-semibold text-slate-600 hover:text-slate-900">
              {backLabel} ‹
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((s) => (
              <ServiceCardUnified key={s.id} item={s} />
            ))}
          </div>
        </section>

        {/* Right Filters */}
        <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
          <FilterBox title="تقييم الخدمة">
            <CheckRow label="★ 4 أو أكثر" checked={minRating4} onChange={(v) => (setMinRating4(v), v && (setMinRating45(false), setOnly5(false)))} />
            <CheckRow label="★ 4.5 أو أكثر" checked={minRating45} onChange={(v) => (setMinRating45(v), v && (setMinRating4(false), setOnly5(false)))} />
            <CheckRow label="★ 5" checked={only5} onChange={(v) => (setOnly5(v), v && (setMinRating4(false), setMinRating45(false)))} />
          </FilterBox>

          <FilterBox title="مستوى البائع">
            <CheckRow label="بائع جديد" checked={levelNew} onChange={setLevelNew} />
            <CheckRow label="بائع نشيط" checked={levelActive} onChange={setLevelActive} />
            <CheckRow label="بائع مميز" checked={levelPro} onChange={setLevelPro} />
          </FilterBox>

          <FilterBox title="حالة البائع">
            <CheckRow label="متواجد حالياً" checked={onlyOnline} onChange={setOnlyOnline} />
            <CheckRow label="هوية موثقة" checked={onlyVerified} onChange={setOnlyVerified} />
          </FilterBox>

          {showBudgetFilters && (
            <FilterBox title="الميزانية (ر.س)">
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  value={budgetMin}
                  onChange={(e) => setBudgetMin(Number(e.target.value || 0))}
                  className="w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm"
                />
                <input
                  type="number"
                  value={budgetMax}
                  onChange={(e) => setBudgetMax(Number(e.target.value || 0))}
                  className="w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm"
                />
              </div>
            </FilterBox>
          )}

          {showDeliveryFilters && (
            <FilterBox title="مدة التسليم">
              <select
                value={delivery}
                onChange={(e) => setDelivery(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm"
              >
                <option value="any">أي مدة</option>
                <option value="1-2">1-2 يوم</option>
                <option value="3-5">3-5 أيام</option>
                <option value="7+">7+ أيام</option>
              </select>
            </FilterBox>
          )}

          {showLanguageFilters && (
            <FilterBox title="اللغة">
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm"
              >
                <option value="any">الكل</option>
                <option value="ar">العربية</option>
                <option value="en">الإنجليزية</option>
              </select>
            </FilterBox>
          )}

          {showDealsOnly && (
            <FilterBox title="عروض اليوم فقط">
              <CheckRow label="عروض اليوم فقط" checked={todayDeals} onChange={setTodayDeals} />
            </FilterBox>
          )}
        </aside>
      </div>
    </div>
  );
}

// ASSISTANT_FINAL: true
