"use client";
import React from 'react';
import Link from 'next/link';

export default function RequestButton() {
  return (
  <Link href="/requests-hub" title="ماحصلت طلبك؟ اضغط هنا" className="ml-3 px-3 py-2 rounded-md bg-[#ffffff]/90 border shadow-sm text-sm font-medium text-slate-800 hover:bg-[#ffffff]">
      طلب خدمة
    </Link>
  );
}

// ASSISTANT_FINAL: true
