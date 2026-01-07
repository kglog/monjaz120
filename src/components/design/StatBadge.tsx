import React from "react";
export default function StatBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border-2 border-black/80 bg-white/60 backdrop-blur px-3 py-1 text-sm">
      {children}
    </span>
  );
}
