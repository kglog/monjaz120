"use client";
import { useState } from "react";
import { db } from "@/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function AddServicePage() {
  const [serviceName, setServiceName] = useState("");
  const [servicePrice, setServicePrice] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "services"), {
        name: serviceName,
        price: servicePrice,
      });
      alert("✅ تمت إضافة الخدمة بنجاح!");
    } catch (error) {
      console.error("خطأ:", error);
      alert("❌ حدث خطأ أثناء إضافة الخدمة.");
    }
  };

  return (
    <div>
      <h1>إضافة خدمة جديدة</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="اسم الخدمة"
          value={serviceName}
          onChange={(e) => setServiceName(e.target.value)}
          required
          className="border p-2 mb-2"
        />
        <input
          type="number"
          placeholder="سعر الخدمة"
          value={servicePrice}
          onChange={(e) => setServicePrice(e.target.value)}
          required
          className="border p-2 mb-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          إضافة الخدمة
        </button>
      </form>
    </div>
  );
}
