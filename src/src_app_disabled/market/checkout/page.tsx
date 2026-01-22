// src/app/market/checkout/page.tsx
"use client"; // هذا يخلي الصفحة تعتمد على الـ client

import React, { useEffect, useState } from "react";

interface OrderData {
  orderId: string;
  total: number;
}

export default function CheckoutPage() {
  const [orderData, setOrderData] = useState<OrderData | null>(null);

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
      <h1>صفحة الدفع</h1>
      {orderData ? (
        <div>
          <p>معرّف الطلب: {orderData.orderId}</p>
          <p>المجموع: ${orderData.total}</p>
        </div>
      ) : (
        <p>جاري تحميل بيانات الطلب...</p>
      )}
    </div>
  );
}
