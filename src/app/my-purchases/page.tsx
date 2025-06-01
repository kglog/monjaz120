"use client";
import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function MyPurchasesPage() {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const snapshot = await getDocs(collection(db, "purchases"));
        const purchasesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPurchases(purchasesData);
      } catch (error) {
        console.error("❌ خطأ أثناء جلب المشتريات:", error);
      }
    };

    fetchPurchases();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">مشترياتي</h1>
      {purchases.length === 0 ? (
        <p>ما عندك مشتريات حالياً.</p>
      ) : (
        <ul className="space-y-2">
          {purchases.map((purchase) => (
            <li
              key={purchase.id}
              className="border p-2 rounded shadow-sm hover:shadow-md"
            >
              <strong>المنتج:</strong> {purchase.item} <br />
              <strong>السعر:</strong> {purchase.price} ريال
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
