

'use client';
import React from "react";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function BecomeSellerPage() {
  const router = useRouter();

  useEffect(() => {
    // تحويل المستخدم لصفحة البائع
    router.push('/vendor/add-service');
  }, []);

  return (
    <main className="flex items-center justify-center min-h-screen">
      <p className="text-xl text-gray-600">جاري تحويلك لتصبح بائعًا...</p>
    </main>
  );
}
