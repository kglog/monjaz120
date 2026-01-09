"use client";
import React from "react";

import { useEffect, useState } from 'react';

export default function VendorRatingsPage() {
  const [ratings, setRatings] = useState<any[] | null>(null); // ✅ نبدأ بـ null

  useEffect(() => {
    async function fetchRatings() {
      const res = await fetch('/api/get-ratings-by-vendor');
      const data = await res.json();

      if (data.success) {
        setRatings(data.ratings);
      } else {
        setRatings([]); // ✅ نحط مصفوفة فاضية إذا فشل
      }
    }

    fetchRatings();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>التقييمات الواردة:</h1>

      {ratings === null ? (
        <p>جاري التحميل...</p> // ✅ نعرض "جاري التحميل" إذا لسه ما وصلنا بيانات
      ) : ratings.length === 0 ? (
        <p>لا توجد تقييمات بعد.</p>
      ) : (
        <ul style={{ marginTop: '1rem' }}>
          {ratings.map((rating, index) => (
            <li key={index}>
              ✅ {rating.serviceName} - تقييم: {rating.rating}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
