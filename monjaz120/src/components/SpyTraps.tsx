"use client";
import React from "react";
// ASSISTANT_FINAL: true
import { useEffect } from "react";
import { trapHit, riskNote } from "@/lib/brain/hooks";
/** نقاط ساخنة غير مرئية تكشف فضول غير طبيعي */
export default function SpyTraps() {
  useEffect(() => {
    // مفاتيح شائعة لفتح أدوات المطور/عرض الكود
    const onKey = (e: KeyboardEvent) => {
      // Guard e.key since some synthetic events or unusual event objects may omit it
      const k = (e && (e.key as string)) ? (e.key as string).toLowerCase() : "";
      if ((e.ctrlKey || e.metaKey) && (k === "u" || (e.shiftKey && k === "i"))) {
        trapHit("devtools_combo", { key: k });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  // فخّ رابط تمويهي (1px) — لو انضغط/انمر عليه نسجل
  const onTrapHover = () => trapHit("ui_trap_hover", { area: "header" });
  const onTrapClick = () => trapHit("ui_trap_click", { area: "header" });
  return (
    <>
      {/* hotspot شبه شفّاف فوق الهيدر */}
      <div
        className="fixed top-2 left-2 h-2 w-2 opacity-0"
        style={{ pointerEvents: "auto", zIndex: 60 }}
        onMouseEnter={onTrapHover}
        onClick={onTrapClick}
        aria-hidden
      />
      {/* فخّ محاولة تحديد نص العنوان بشكل متكرر */}
      <div
        className="sr-only"
        onCopy={() => riskNote("suspicious_copy", { where: "sr_only" })}
        onCut={() => riskNote("suspicious_cut", { where: "sr_only" })}
      />
    </>
  );
}
