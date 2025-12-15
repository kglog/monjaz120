import React from "react";
"use client";
import { useEffect, useMemo, useState } from "react";
import { Deal } from "../../lib/deals";
import Link from "next/link";

function useCountdown(endIso: string) {
  const end = useMemo(() => new Date(endIso).getTime(), [endIso]);
  const [left, setLeft] = useState(end - Date.now());
  useEffect(() => {
    const id = setInterval(() => setLeft(end - Date.now()), 1000);
    return () => clearInterval(id);
  }, [end]);
  if (left < 0) return "انتهى";
  const s = Math.floor(left / 1000);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const ss = s % 60;
  return `${h.toString().padStart(2,"0")}:${m.toString().padStart(2,"0")}:${ss.toString().padStart(2,"0")}`;
}

export default function DesignDeals({ deals, lang="ar" }: { deals: Deal[]; lang?: "ar"|"en" }) {
  if (!deals?.length) return null;
  return (
    <div className="rounded-2xl border border-sky-200 bg-sky-50 p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="font-bold text-sky-900">{lang==="ar" ? "صفقات اليوم" : "Deals of the Day"}</div>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        {deals.map(d => {
          const t = useCountdown(d.endsAt);
          return (
            <div key={d.id} className="rounded-xl border border-sky-200 bg-white p-3 flex items-center justify-between">
              <div>
                <div className="font-semibold text-sky-900">{lang==="ar" ? d.titleAr : d.titleEn}</div>
                <div className="text-sm text-gray-600">{lang==="ar" ? "ينتهي خلال" : "Ends in"}: {t}</div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-sky-900">{d.price} ر.س</div>
                <Link href={`/design/${d.subcategory}`} className="text-sm text-sky-700 underline">احجز العرض</Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
