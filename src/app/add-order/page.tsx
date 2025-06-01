"use client";

import { useState } from "react";
import { db } from "@/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function AddOrderPage() {
  const [orderName, setOrderName] = useState("");
  const [orderDetails, setOrderDetails] = useState("");
  const router = useRouter();

  const handleAddOrder = async (e: any) => {
    e.preventDefault();

    if (!orderName || !orderDetails) {
      alert("✅ يرجى تعبئة كل الحقول!");
      return;
    }

    try {
      await addDoc(collection(db, "orders"), {
        name: orderName,
        details: orderDetails,
        createdAt: new Date(),
      });
      alert("🎉 تمت إضافة الطلب بنجاح!");
      setOrderName("");
      setOrderDetails("");
      router.push("/orders");
    } catch (error) {
      console.error("❌ خطأ أثناء إضافة الطلب:", error);
      alert("❌ حدث خطأ، حاول مرة أخرى.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-primary">إضافة طلب جديد</h1>
      <form onSubmit={handleAddOrder} className="space-y-4">
        <input
          type="text"
          placeholder="اسم الطلب"
          value={orderName}
          onChange={(e) => setOrderName(e.target.value)}
          className="border p-2 w-full rounded"
          required
        />
        <textarea
          placeholder="تفاصيل الطلب"
          value={orderDetails}
          onChange={(e) => setOrderDetails(e.target.value)}
          className="border p-2 w-full rounded"
          required
        />
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition"
        >
          إضافة الطلب
        </button>
      </form>
    </div>
  );
}
