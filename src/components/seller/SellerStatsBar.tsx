"use client";

import React, { useEffect, useState } from "react";

type Stats = {
  rating?: number;
  ratingsCount?: number;
  ordersCount?: number;
  totalEarnings?: number;
  servicesCount?: number;
  ordersByStatus?: Record<string, number>;
  customersCount?: number | null;
  commsSuccessPercent?: number | null;
  avgResponseMs?: number | null;
};

export default function SellerStatsBar({ userId }: { userId?: string }) {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        // try vendor dashboard endpoint first
        const [dashRes, svcRes, ordersRes] = await Promise.all([
          fetch("/api/vendor/dashboard").then((r) => r.json()).catch(() => ({})),
          fetch("/api/seller/services").then((r) => r.json()).catch(() => ({ services: [] })),
          fetch("/api/seller/orders").then((r) => r.json()).catch(() => ({ orders: [] })),
        ]);

        if (!mounted) return;

        const servicesCount = Array.isArray(svcRes?.services) ? svcRes.services.length : (dashRes.servicesCount ?? 0);

        // helper: map backend status codes to Arabic labels used in UI
        const mapStatusLabel = (code?: string) => {
          // Map backend status codes to concise, neutral Arabic labels
          if (!code) return "أخرى";
          const c = String(code).toLowerCase();
          if (c === "new" || c === "pending") return "معلق";
          if (c === "in_progress" || c === "inprogress" || c === "started") return "قيد التنفيذ";
          if (c === "awaiting_delivery" || c === "awaiting" || c === "awaiting_pickup") return "بانتظار الاستلام";
          if (c === "completed" || c === "done") return "مكتملة";
          if (c === "cancelled" || c === "canceled" || c === "void") return "ملغاة";
          return "أخرى";
        };

        // count orders by mapped status label
        const orders = Array.isArray(ordersRes?.orders) ? ordersRes.orders : (dashRes.orders || []);
        const ordersByStatus: Record<string, number> = {};
        if (Array.isArray(orders)) {
          orders.forEach((o: any) => {
            const st = mapStatusLabel(o.status || o.state);
            ordersByStatus[st] = (ordersByStatus[st] || 0) + 1;
          });
        }

        // compute customers count (unique buyers) if orders include buyer/buyerId fields
        let customersCount: number | null = null;
        try {
          if (Array.isArray(orders) && orders.length > 0) {
            const buyers = new Set<string>();
            orders.forEach((o: any) => {
              const b = o.buyer || o.buyerId || o.customerId || o.userId || o.client || null;
              if (b) buyers.add(String(b));
            });
            customersCount = buyers.size;
          } else if (typeof dashRes.customersCount === 'number') {
            customersCount = dashRes.customersCount;
          }
        } catch (e) {
          customersCount = null;
        }

        // try to compute communication success % and average response from dashRes or orders messages
        let commsSuccessPercent: number | null = null;
        let avgResponseMs: number | null = null;
        try {
          if (typeof dashRes.communicationSuccessRate === 'number') {
            commsSuccessPercent = Math.round(dashRes.communicationSuccessRate * 100);
          }
          if (typeof dashRes.avgResponseMs === 'number') {
            avgResponseMs = dashRes.avgResponseMs;
          }

          // fallback: try to infer from orders if each order has messages array with timestamps
          if (commsSuccessPercent === null || avgResponseMs === null) {
            const responseTimes: number[] = [];
            let commSuccessCount = 0;
            let commTotal = 0;
            if (Array.isArray(orders) && orders.length > 0) {
              orders.forEach((o: any) => {
                const msgs = o.messages || o.conversation || o.chat || null;
                if (Array.isArray(msgs) && msgs.length > 0) {
                  commTotal++;
                  // consider communication successful if seller sent at least one message
                  const sellerMsg = msgs.find((m: any) => String(m.from || m.sender || '').toLowerCase().includes('seller') || (m.fromId && (m.fromId === userId)));
                  if (sellerMsg) commSuccessCount++;

                  // compute naive response time: find first buyer message then first seller reply after it
                  const buyerMsgs = msgs.filter((m: any) => !String(m.from || m.sender || '').toLowerCase().includes('seller'));
                  if (buyerMsgs.length > 0) {
                    const firstBuyer = buyerMsgs[0];
                    const sellerReply = msgs.find((m: any) => {
                      try {
                        return (
                          (new Date(m.createdAt || m.created_at || m.time)).getTime() >
                          (new Date(firstBuyer.createdAt || firstBuyer.created_at || firstBuyer.time)).getTime() &&
                          (String(m.from || m.sender || '').toLowerCase().includes('seller') || (m.fromId && (m.fromId === userId)))
                        );
                      } catch (e) {
                        return false;
                      }
                    });
                    if (sellerReply) {
                      try {
                        const t1 = new Date(firstBuyer.createdAt || firstBuyer.created_at || firstBuyer.time).getTime();
                        const t2 = new Date(sellerReply.createdAt || sellerReply.created_at || sellerReply.time).getTime();
                        if (!isNaN(t1) && !isNaN(t2) && t2 > t1) responseTimes.push(t2 - t1);
                      } catch (e) { /* ignore */ }
                    }
                  }
                }
              });
            }
            if (commsSuccessPercent === null && commTotal > 0) commsSuccessPercent = Math.round((commSuccessCount / commTotal) * 100);
            if (avgResponseMs === null && responseTimes.length > 0) {
              avgResponseMs = Math.round(responseTimes.reduce((s, n) => s + n, 0) / responseTimes.length);
            }
          }
        } catch (e) {
          // ignore and leave null
        }

        setStats({
          rating: dashRes.rating ?? 0,
          ratingsCount: dashRes.ratingsCount ?? 0,
          ordersCount: dashRes.ordersCount ?? Object.keys(ordersByStatus).reduce((s, k) => s + ordersByStatus[k], 0),
          totalEarnings: dashRes.totalEarnings ?? dashRes.revenue ?? 0,
          servicesCount,
          ordersByStatus,
          customersCount,
          commsSuccessPercent,
          avgResponseMs,
        });
      } catch (err) {
        console.error("SellerStatsBar load error:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, [userId]);

  if (loading) return <div className="p-4">جارٍ تحميل الإحصاءات...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 -mt-40 mb-6">
      <div className="py-0 px-2 bg-white border border-black rounded text-center flex flex-col justify-center max-w-xs">
        <div className="text-sm text-gray-500">التقييم</div>
        <div className="text-sm font-semibold text-cyan-600 leading-tight">{stats?.rating ?? 0} ★</div>
        <div className="text-[10px] text-gray-500">({stats?.ratingsCount ?? 0})</div>
      </div>

  <div className="py-0 px-2 bg-white border border-black rounded text-center flex flex-col justify-center">
        <div className="text-sm text-gray-500">عدد الخدمات</div>
        <div className="text-sm font-semibold text-cyan-600 leading-tight">{stats?.servicesCount ?? 0}</div>
      </div>

  <div className="py-0 px-2 bg-white border border-black rounded text-center flex flex-col justify-center">
        <div className="text-sm text-gray-500">إجمالي الطلبات</div>
        <div className="text-sm font-semibold text-cyan-600 leading-tight">{stats?.ordersCount ?? 0}</div>
      </div>

  <div className="py-0 px-2 bg-white border border-black rounded text-center flex flex-col justify-center">
        <div className="text-sm text-gray-500">عدد العملاء</div>
        <div className="text-sm font-semibold text-cyan-600 leading-tight">{(typeof stats?.customersCount === 'number') ? stats?.customersCount : 'لم يحسب بعد'}</div>
      </div>

  <div className="p-3 bg-white border border-black rounded text-center col-span-1 md:col-span-2 text-sm">
        <div className="text-sm text-gray-500">حالات الطلبات</div>
        <div className="mt-2">
          {/* show a vertical list of canonical statuses with counts (0 when missing) */}
          {(() => {
            const ordered = [
              "معلق",
              "قيد التنفيذ",
              "بانتظار الاستلام",
              "مكتملة",
              "ملغاة",
              "أخرى",
            ];

            return (
              <>
                <ul className="text-sm text-gray-700 space-y-2 text-right">
                  {ordered.map((label) => (
                    <li key={label} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{label}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          aria-hidden
                          className="inline-block w-3 h-3 border border-black rounded-sm bg-white"
                        />
                        <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded">{stats?.ordersByStatus?.[label] ?? 0}</span>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                  <div className="p-3 bg-white border border-black rounded text-center text-sm">
                    <div className="text-sm text-gray-500">نجاح التواصلات</div>
                    <div className="text-base font-semibold text-cyan-600">{typeof stats?.commsSuccessPercent === 'number' ? `${stats?.commsSuccessPercent}%` : 'لم يحسب بعد'}</div>
                    <div className="text-xs text-gray-500">متوسط سرعة الرد: {typeof stats?.avgResponseMs === 'number' ? `${Math.round((stats!.avgResponseMs || 0) / 1000)}s` : 'لم يحسب بعد'}</div>
                  </div>

                  <div className="p-3 bg-white border border-black rounded text-center text-sm">
                    <div className="text-sm text-gray-500">الإيرادات</div>
                    <div className="text-base font-semibold text-slate-900">{`${stats?.totalEarnings ?? 0} ر.س`}</div>
                  </div>
                </div>
              </>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
