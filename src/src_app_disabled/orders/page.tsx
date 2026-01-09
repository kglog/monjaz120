"use client";

import { useEffect, useMemo, useState } from "react";

type Order = {
  id: string;
  serviceId: string;
  title: string;
  price: number;
  details?: string | null;
  status?: "pending" | "accepted" | "completed" | "rejected" | string;
  createdAt: string;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const [statusFilter, setStatusFilter] = useState<
    "all" | "pending" | "accepted" | "completed" | "rejected"
  >("all");
  const [query, setQuery] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      if (res.ok && data.status === "success") setOrders(data.orders || []);
      else setOrders([]);
    } catch {
      setOrders([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const badgeClass = (s?: string) => {
    switch (s) {
      case "accepted":
        return "border-green-600 text-green-700 bg-green-50";
      case "completed":
        return "border-blue-600 text-blue-700 bg-blue-50";
      case "rejected":
        return "border-red-600 text-red-700 bg-red-50";
      default:
        return "border-amber-600 text-amber-700 bg-amber-50";
    }
  };

  const updateStatus = async (id: string, status: "accepted" | "completed" | "rejected") => {
    const res = await fetch(`/api/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) await load();
    else alert("فشل تحديث الحالة");
  };

  const remove = async (id: string) => {
    if (!confirm("تأكيد حذف الطلب؟")) return;
    const res = await fetch(`/api/orders/${id}`, { method: "DELETE" });
    if (res.ok) await load();
    else alert("فشل حذف الطلب");
  };

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return orders.filter((o) => {
      const statusOk = statusFilter === "all" ? true : (o.status || "pending") === statusFilter;
      const text = `${o.title} ${o.serviceId}`.toLowerCase();
      const queryOk = q === "" ? true : text.includes(q);
      return statusOk && queryOk;
    });
  }, [orders, statusFilter, query]);

  if (loading) return <p className="text-center mt-10">⏳ جاري التحميل...</p>;

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">📦 لوحة الطلبات</h1>

      {/* 🔍 شريط أدوات: فلترة + بحث */}
      <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between mb-4">
        <div className="flex flex-wrap gap-2">
          {[
            { k: "all", t: "الكل" },
            { k: "pending", t: "بإنتظار" },
            { k: "accepted", t: "مقبول" },
            { k: "completed", t: "مكتمل" },
            { k: "rejected", t: "مرفوض" },
          ].map((b) => (
            <button
              key={b.k}
              onClick={() =>
                setStatusFilter(b.k as "all" | "pending" | "accepted" | "completed" | "rejected")
              }
              className={`rounded-md border-2 px-3 py-1 text-sm ${
                statusFilter === b.k
                  ? "border-black bg-black text-white"
                  : "border-black hover:bg-gray-50"
              }`}
            >
              {b.t}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث بالعنوان أو الخدمة…"
            className="border-2 border-black rounded-md px-3 py-2 w-72"
          />
          <button
            onClick={() => setQuery("")}
            className="border-2 border-black rounded-md px-3 py-2 hover:bg-gray-50"
          >
            مسح
          </button>
        </div>
      </div>

      {/* ✅ زر تصدير الطلبات */}
      <div className="mb-4">
        <button
          onClick={async () => {
            const res = await fetch("/api/orders/export");
            const data = await res.json();
            if (data.url) {
              window.open(data.url, "_blank");
            }
          }}
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
        >
          📤 تصدير الطلبات
        </button>
      </div>

      {/* ✅ جدول الطلبات */}
      {shown.length === 0 ? (
        <p className="text-center text-gray-500">لا توجد نتائج مطابقة</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-2 border-black rounded-lg bg-white">
            <thead>
              <tr className="bg-gray-50">
                <th className="border-2 border-black px-3 py-2">#</th>
                <th className="border-2 border-black px-3 py-2">العنوان</th>
                <th className="border-2 border-black px-3 py-2">الخدمة</th>
                <th className="border-2 border-black px-3 py-2">السعر</th>
                <th className="border-2 border-black px-3 py-2">الحالة</th>
                <th className="border-2 border-black px-3 py-2">التفاصيل</th>
                <th className="border-2 border-black px-3 py-2">التاريخ</th>
                <th className="border-2 border-black px-3 py-2">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {shown.map((o, idx) => (
                <tr key={o.id}>
                  <td className="border-2 border-black px-3 py-2 text-center">{idx + 1}</td>
                  <td className="border-2 border-black px-3 py-2">{o.title}</td>
                  <td className="border-2 border-black px-3 py-2">{o.serviceId}</td>
                  <td className="border-2 border-black px-3 py-2">{o.price} ريال</td>
                  <td className="border-2 border-black px-3 py-2">
                    <span
                      className={`inline-block rounded-lg border px-2 py-1 text-sm ${badgeClass(
                        o.status
                      )}`}
                    >
                      {o.status || "pending"}
                    </span>
                  </td>
                  <td className="border-2 border-black px-3 py-2">{o.details || "—"}</td>
                  <td className="border-2 border-black px-3 py-2">
                    {new Date(o.createdAt).toLocaleString()}
                  </td>
                  <td className="border-2 border-black px-3 py-2">
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => updateStatus(o.id, "accepted")}
                        className="border-2 border-black rounded-md px-2 py-1 text-sm hover:bg-gray-50"
                      >
                        قبول
                      </button>
                      <button
                        onClick={() => updateStatus(o.id, "completed")}
                        className="border-2 border-black rounded-md px-2 py-1 text-sm hover:bg-gray-50"
                      >
                        إكمال
                      </button>
                      <button
                        onClick={() => updateStatus(o.id, "rejected")}
                        className="border-2 border-black rounded-md px-2 py-1 text-sm hover:bg-gray-50"
                      >
                        رفض
                      </button>
                      <button
                        onClick={() => remove(o.id)}
                        className="border-2 border-black rounded-md px-2 py-1 text-sm text-red-600 hover:bg-red-50"
                      >
                        حذف
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
