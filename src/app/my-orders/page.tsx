"use client";

import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const snapshot = await getDocs(collection(db, "orders"));
        const ordersData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(ordersData);
      } catch (error) {
        console.error("❌ خطأ أثناء جلب الطلبات:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">طلباتي</h1>
      {orders.length === 0 ? (
        <p>ما عندك طلبات حالياً.</p>
      ) : (
        <ul className="space-y-2">
          {orders.map((order) => (
            <li
              key={order.id}
              className="border p-2 rounded shadow-sm hover:shadow-md"
            >
              <strong>الخدمة:</strong> {order.serviceName} <br />
              <strong>الحالة:</strong> {order.status} <br />
              <strong>السعر:</strong> {order.price} ريال
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
