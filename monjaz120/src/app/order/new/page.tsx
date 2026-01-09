"use client";
import { useState } from "react";

export default function NewOrderPage(props: any) {
  const [loading, setLoading] = useState(false);
  const serviceId = props.searchParams?.serviceId || "";
  
  // قيم افتراضية عشان ما تكون فاضية
  const title = "طلب خدمة";
  const price = 100;

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId,
          title,
          price,
          details: "تفاصيل افتراضية للتجربة",
        }),
      });

      const data = await res.json();
      if (data.status === "success") {
        alert("✅ تم إنشاء الطلب بنجاح");
      } else {
        alert("❌ فشل: " + data.message);
      }
    } catch (err) {
      alert("⚠️ خطأ بالشبكة أو السيرفر");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">إنشاء طلب جديد</h1>
      <p>الخدمة المختارة: {serviceId || "غير محدد"}</p>
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        {loading ? "جاري الإرسال..." : "متابعة الدفع"}
      </button>
    </div>
  );
}
