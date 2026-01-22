"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type PendingOrder = {
  serviceId: string;
  title: string;
  price: string;   // جاي من الـ query كنص
  details: string;
};

export default function CheckoutPage() {
  const router = useRouter();
  const [order, setOrder] = useState<PendingOrder | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("pendingOrder");
    if (raw) setOrder(JSON.parse(raw));
  }, []);

  if (!order) {
    return (
      <div className="max-w-xl mx-auto mt-16 p-6 text-center">
        <p className="text-red-600">لا يوجد طلب معلّق.</p>
        <div className="mt-4">
          <Link href="/categories/ai" className="text-blue-600 underline">
            العودة للمتجر
          </Link>
        </div>
      </div>
    );
  }

  function handleConfirm() {
    // تخزين بسيط كأنها قاعدة بيانات محلية
    const raw = localStorage.getItem("orders");
    const orders = raw ? JSON.parse(raw) : [];
    if (order) {
      orders.push({
        ...order,
        price: Number(order.price),
        id: crypto.randomUUID(),
        status: "pending",
        createdAt: new Date().toISOString(),
      });
    }
    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.removeItem("pendingOrder");
    router.push("/success");
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-6 text-right">تأكيد الطلب</h1>

      <div className="space-y-2 text-right mb-6">
        <p>الخدمة: <span className="font-semibold">{order.title}</span></p>
        <p>السعر: <span className="text-green-600">{order.price} ريال</span></p>
        <p>وصفك: <span className="text-gray-700 whitespace-pre-wrap">{order.details}</span></p>
      </div>

      <div className="flex items-center justify-between">
        <Link
          href={`/order/new?serviceId=${encodeURIComponent(order.serviceId)}&title=${encodeURIComponent(order.title)}&price=${order.price}`}
          className="rounded-xl border px-4 py-2 hover:bg-gray-50"
        >
          رجوع للتعديل
        </Link>

        <button
          onClick={handleConfirm}
          className="rounded-xl bg-emerald-600 px-5 py-2 font-semibold text-white hover:opacity-90"
        >
          تأكيد والدفع
        </button>
      </div>
    </div>
  );
}
