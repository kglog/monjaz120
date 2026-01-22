
'use client';
import React from "react";

import { useEffect, useState } from 'react';

export default function SellerProfilePage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [sellerName, setSellerName] = useState('');

  useEffect(() => {
    const name = prompt('👤 اكتب اسمك كبائع لعرض طلباتك:');
    if (name) {
      setSellerName(name);
      const storedOrders = localStorage.getItem('monjaz-orders');
      const allOrders = storedOrders ? JSON.parse(storedOrders) : [];
      const sellerOrders = allOrders.filter(
        (order: any) => order.seller === name
      );
      setOrders(sellerOrders);
      console.log(sellerName); // إضافة استخدام لـ sellerName لتفادي التحذير
    }
  }, [sellerName]);

  return (
    <div>
      <h1>صفحة البائع</h1>
      <p>عدد الطلبات: {orders.length}</p>
      {/* عرض الطلبات هنا حسب ما تبي */}
    </div>
  );
}
