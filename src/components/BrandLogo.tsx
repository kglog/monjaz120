"use client";
import React from "react";

export default function BrandLogo() {
  return (
    <span className="inline-flex items-center gap-2 select-none">
      <svg
        className="w-6 h-6 flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" fill="#0ea5e9" />
        <path d="M7 12l3 3 7-7" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>

      <span className="font-bold leading-none whitespace-nowrap">
        منصة.<span className="text-[#f59e0b]">كوم</span>
      </span>
    </span>
  );
}

// ASSISTANT_FINAL: true
