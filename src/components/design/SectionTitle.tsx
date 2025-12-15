import React from "react";
export default function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
      {children}
    </h2>
  );
}
