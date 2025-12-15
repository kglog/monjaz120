import React from "react";

type Props = {
  title: string;
  tag?: string;
  icon?: React.ReactNode;
};

export default function CategoryCard({ title, tag, icon }: Props) {
  return (
    <div className="group relative rounded-2xl border border-black bg-white p-5 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl bg-black" />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#bfe8f7]/60 bg-gradient-to-br from-[#bfe8f7]/30 to-white text-[#66c6e0] shadow-[0_1px_0_0_rgba(0,0,0,0.03)]">
            {icon}
          </div>
          <div className="text-lg font-semibold">{title}</div>
        </div>
        {tag && <span className="text-xs rounded-full bg-[#bfe8f7]/22 px-2 py-1 text-black border border-black">{tag}</span>}
      </div>
      <div className="mt-4 h-24 rounded-xl bg-gradient-to-br from-white/60 to-[#bfe8f7]/12 border border-black overflow-hidden" />
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-black hover:underline">استكشف</span>
        <span className="text-slate-400 group-hover:translate-x-1 transition-transform">→</span>
      </div>
    </div>
  );
}

// ASSISTANT_FINAL: true
