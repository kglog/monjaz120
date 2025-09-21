"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";

type Props = {
  id: string;
  title: string;
  seller: string;
  price: number; // بالريال
  rating: number; // 0-5
  badge?: string; // اختياري مثل: "الأكثر مبيعًا"
};

export default function ServiceCard({ id, title, seller, price, rating, badge }: Props) {
  const router = useRouter();

  const handleOrder = () => {
    // وجّه لصفحة الطلب/الدفع مع تمرير بيانات الخدمة كاملة
    router.push(
      `/order/new?serviceId=${encodeURIComponent(id)}&title=${encodeURIComponent(title)}&price=${price}`
    );
  };

  return (
    <div className="rounded-2xl border border-gray-200 shadow-sm p-5 bg-white hover:shadow-md transition">
      {!!badge && (
        <div className="mb-3 inline-flex items-center rounded-full border px-3 py-1 text-[12px] font-medium">
          {badge}
        </div>
      )}

      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-2xl">🤖</div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold leading-snug">{title}</h3>
          <p className="mt-1 text-sm text-gray-500">البائع: {seller}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-green-700 font-semibold">{price} ريال</span>
        </div>

        <div className="flex items-center gap-1 text-amber-500">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`h-4 w-4 ${i < Math.round(rating) ? "fill-current" : ""}`} />
          ))}
          <span className="ms-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <Link
          href={`/services/${id}`}
          className="text-center rounded-xl border px-4 py-2 text-sm font-medium hover:bg-gray-50"
        >
          عرض التفاصيل
        </Link>

        <button
          onClick={handleOrder}
          className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
        >
          اطلب الآن
        </button>
      </div>
    </div>
  );
}
