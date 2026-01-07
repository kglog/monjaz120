"use client";
import React, { useState } from 'react';

type Toast = { id: string; title: string; msg?: string };

export const toastsStore: { push?: (t: Toast) => void } = {};

export default function Toasts() {
  const [items, setItems] = useState<Toast[]>([]);

  toastsStore.push = (t: Toast) => {
    setItems((s) => [t, ...s].slice(0, 5));
    setTimeout(() => {
      setItems((s) => s.filter((x) => x.id !== t.id));
    }, 6000);
  };

  return (
    <div className="fixed top-4 left-4 z-50 flex flex-col items-start gap-3">
      {items.map((it) => (
  <div key={it.id} className="bg-[#ffffff] border p-3 rounded shadow-md w-80">
          <div className="font-semibold">{it.title}</div>
          {it.msg && <div className="text-sm text-slate-600">{it.msg}</div>}
        </div>
      ))}
    </div>
  );
}

// ASSISTANT_FINAL: true
