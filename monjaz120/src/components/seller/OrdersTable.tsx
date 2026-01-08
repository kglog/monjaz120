"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Order = {
  id: string;
  buyerName?: string;
  total?: number;
  status?: string;
  createdAt?: string;
};

export default function OrdersTable({ orders, sellerView }: { orders: Order[]; sellerView?: boolean }) {
  const [filter, setFilter] = useState<string>("all");
  const router = useRouter();

  const statuses = useMemo(() => {
    const mapStatusLabel = (code?: string) => {
    if (!code) return "لم يتغير";
    const c = String(code).toLowerCase();
    if (c === "new" || c === "pending") return "بانتظار التعليمات";
    if (c === "pending_payment" || c === "payment_pending") return "بانتظار الدفع";
    if (c === "in_progress" || c === "inprogress" || c === "started") return "جاري تنفيذها";
    if (c === "review" || c === "under_review") return "قيد المراجعة";
    if (c === "awaiting_delivery" || c === "awaiting" || c === "awaiting_pickup") return "بانتظار الاستلام";
    if (c === "refund_requested" || c === "refund_pending") return "بانتظار الاسترداد";
    if (c === "refunded" || c === "returned") return "مسترد";
    if (c === "completed" || c === "done") return "تم تسليمها";
    if (c === "cancelled" || c === "canceled" || c === "void") return "ملغية";
    if (c === "rejected" || c === "refused") return "مرفوض";
    if (c === "on_hold" || c === "hold") return "معلق";
    return "لم يتغير";
  };

    const s = new Set<string>();
    orders.forEach((o) => s.add(mapStatusLabel(o.status || undefined)));
    return Array.from(s);
  }, [orders]);

  const mapStatusLabel = (code?: string) => {
    if (!code) return "لم يتغير";
    const c = String(code).toLowerCase();
    if (c === "new" || c === "pending") return "بانتظار التعليمات";
    if (c === "in_progress" || c === "inprogress" || c === "started") return "جاري تنفيذها";
    if (c === "awaiting_delivery" || c === "awaiting" || c === "awaiting_pickup") return "بانتظار الاستلام";
    if (c === "completed" || c === "done") return "تم تسليمها";
    if (c === "cancelled" || c === "canceled" || c === "void") return "ملغية";
    return "لم يتغير";
  };

  const filtered = orders.filter((o) => (filter === "all" ? true : mapStatusLabel(o.status || undefined) === filter));

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm text-gray-600">مجموع الطلبات: <strong>{orders.length}</strong></div>
        <div className="flex items-center gap-2">
          <label className="text-sm">حالة:</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="border rounded px-2 py-1">
            <option value="all">الكل</option>
            {statuses.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-gray-500 border-b">
              <th className="py-2">#</th>
              <th>المشتري</th>
              <th>المجموع</th>
              <th>الحالة</th>
              <th>تاريخ</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((o, i) => {
              const handleOpen = () => {
                if (sellerView) router.push(`/seller/orders/${o.id}`);
              };

              const handleKey = (e: React.KeyboardEvent) => {
                if (!sellerView) return;
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  router.push(`/seller/orders/${o.id}`);
                }
              };

              return (
                <tr
                  key={o.id}
                  className={`border-b even:bg-gray-50 ${sellerView ? "hover:bg-gray-50 cursor-pointer" : ""}`}
                  onClick={handleOpen}
                  role={sellerView ? "button" : undefined}
                  tabIndex={sellerView ? 0 : undefined}
                  onKeyDown={handleKey}
                >
                  <td className="py-2">{i + 1}</td>
                  <td>{o.buyerName || "مستخدم"}</td>
                  <td className="font-semibold">{`${o.total ?? 0} ر.س`}</td>
                  <td><span className="px-2 py-0.5 rounded text-xs bg-gray-100">{mapStatusLabel(o.status || undefined)}</span></td>
                  <td className="text-xs text-gray-500">{o.createdAt ? new Date(o.createdAt).toLocaleDateString() : "-"}</td>
                  <td>
                    <button
                      className="text-sm text-cyan-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/seller/orders/${o.id}`);
                      }}
                    >
                      عرض
                    </button>
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="py-4 text-center text-gray-500">لا توجد طلبات للحالة المحددة.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ASSISTANT_FINAL: true
