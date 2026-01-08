"use client";

import React from 'react';
import Link from "next/link";
// ASSISTANT_FINAL: true
import { Star, User2 } from "lucide-react";

export type SellerLevel = "new" | "active" | "pro";

export type ServiceItem = {
  id: string;
  title: string;
  sellerName: string;
  price: number;
  currency?: "SAR" | "USD";
  rating: number; // 0..5
  isVerified?: boolean;
  isOnline?: boolean;
  sellerLevel?: SellerLevel;
  sellerStatus?: string | null;
  href?: string;
  imageUrl?: string | null;
};

function Stars({ value }: { value: number }) {
  const full = Math.round(Math.max(0, Math.min(5, value)));
  return (
    <div className="flex items-center gap-1" aria-label={`التقييم ${value} من 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < full ? "fill-amber-400 text-amber-400" : "text-slate-300"}`}
        />
      ))}
    </div>
  );
}

function formatPrice(price: number, currency: "SAR" | "USD") {
  if (currency === "USD") return `$${price.toFixed(2)}`;
  return `${price.toLocaleString("ar-SA")} ريال`;
}

export default function ServiceCardUnified({ item }: { item: ServiceItem }) {
  const href = item.href ?? "#";
  const currency = item.currency ?? "SAR";

  return (
    <div className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      <div className="relative h-44 w-full bg-gradient-to-b from-[#dbf4ff] to-white">
        {item.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.imageUrl} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-slate-400">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M21 7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7Z"
                stroke="currentColor"
                strokeWidth="1.6"
              />
              <path
                d="m7 14 2.5-2.5L14 16l2-2 3 3"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.5 10.2a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4Z"
                fill="currentColor"
              />
            </svg>
          </div>
        )}

        {item.isVerified && (
          <span className="absolute right-3 top-3 rounded-full border border-black bg-white/90 px-3 py-1 text-xs text-slate-700">
            هوية موثقة
          </span>
        )}
      </div>

      <div className="p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h3 className="line-clamp-2 text-base font-semibold text-slate-900">{item.title}</h3>
        </div>

        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-slate-700">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-black bg-slate-50">
              <User2 className="h-4 w-4" />
            </span>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{item.sellerName}</span>
              <span className="mt-1 inline-block rounded-full border border-black bg-white/80 text-xs px-2 py-0.5 text-slate-700">{item.sellerStatus ?? 'متواجد حالياً'}</span>
            </div>
          </div>
          <Stars value={item.rating} />
        </div>

        <div className="mb-4 flex items-center justify-between">
          <div className="text-sm text-slate-500">تبدأ من</div>
          <div className="text-lg font-bold text-slate-900">{formatPrice(item.price, currency)}</div>
        </div>

        <Link
          href={href}
          className="block w-full rounded-2xl border border-slate-200 bg-[#dbf4ff] px-4 py-3 text-center text-sm font-semibold text-slate-900 transition hover:bg-[#d3e5f5]"
        >
          استكشف الخدمة
        </Link>
      </div>
    </div>
  );
}

// ASSISTANT_FINAL: true
