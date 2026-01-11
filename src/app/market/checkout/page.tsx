// src/app/market/checkout/page.tsx
"use client"; // هذا يخلي الصفحة تعتمد على الـ client

import React, { useEffect, useState } from "react";

export default function CheckoutPage() {
  const [orderData, setOrderData] = useState<{ orderId: string; total: number } | null>(null);

  useEffect(() => {
    // هنا تقدر تسوي أي منطق جلب بيانات (مثلاً من Firebase)
    const fetchData = async () => {
      try {
        // جرب جلب بيانات افتراضية للتجربة
        const dummyData = { orderId: "12345", total: 200 };
        setOrderData(dummyData);
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Checkout Page</h1>
      {orderData ? (
        <div>
          <p>Order ID: {orderData.orderId}</p>
          <p>Total: ${orderData.total}</p>
        </div>
      ) : (
        <p>Loading order data...</p>
      )}
    </div>
  );
}
