// src/app/purchases/page.tsx
"use client";
import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function PurchasesPage() {
  const [purchases, setPurchases] = useState<any[]>([]);

  useEffect(() => {
    const fetchPurchases = async () => {
      const querySnapshot = await getDocs(collection(db, "purchases"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPurchases(data);
    };

    fetchPurchases();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">مشترياتي</h1>
      {purchases.length === 0 ? (
        <p>لا يوجد مشتريات.</p>
      ) : (
        <ul className="space-y-2">
          {purchases.map((purchase) => (
            <li key={purchase.id} className="border p-2 rounded">
              <strong>الخدمة:</strong> {purchase.serviceName} <br />
              <strong>السعر:</strong> {purchase.price} ريال <br />
              <strong>تاريخ الشراء:</strong>{" "}
              {new Date(purchase.createdAt.seconds * 1000).toLocaleDateString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
