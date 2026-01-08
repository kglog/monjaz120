import React from "react";
"use client";
import { useEffect, useState } from "react";

type Feature = { key: string; name: string; defaultOn: boolean };
const FEATURES: Feature[] = [
  { key: "auto_mode", name: "تشغيل تلقائي", defaultOn: true },
  { key: "gray_zone", name: "المنطقة الرمادية", defaultOn: true },
  { key: "spy_traps", name: "مصائد الجواسيس", defaultOn: true },
  { key: "rescue", name: "زر الطوارئ", defaultOn: true },
  { key: "deals", name: "العروض اليومية", defaultOn: true },
];

export default function SmartToggles() {
  const [state, setState] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const initial: Record<string, boolean> = {};
    FEATURES.forEach(f => {
      const s = localStorage.getItem(`monjaz:feat:${f.key}`);
      initial[f.key] = s ? s === "1" : f.defaultOn;
    });
    setState(initial);
  }, []);

  const toggle = (k: string) => setState(s => {
    const v = !s[k];
    localStorage.setItem(`monjaz:feat:${k}`, v ? "1" : "0");
    return { ...s, [k]: v };
  });

  return (
    <div className="flex flex-wrap gap-2">
      {FEATURES.map(f => (
        <button
          key={f.key}
          onClick={() => toggle(f.key)}
          className={`px-3 py-1.5 rounded-full border text-sm ${
            state[f.key] ? "bg-black text-white" : "bg-white"
          }`}
          title="واجهة تحكم محلية — للعرض فقط"
        >
          {f.name} {state[f.key] ? "✅" : "⛔"}
        </button>
      ))}
    </div>
  );
}
// ASSISTANT_FINAL: true
