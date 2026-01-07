import React from "react";
export default function SafetyBadges() {
  return (
    <div className="grid sm:grid-cols-3 gap-3">
      <div className="rounded-2xl border border-sky-200 bg-sky-50 p-3 shadow-sm">
        <div className="text-sm font-semibold text-sky-900">سعر نهائي شامل الضريبة</div>
        <div className="text-xs text-sky-800/80 mt-1">شفافية كاملة للعميل</div>
      </div>
      <div className="rounded-2xl border border-sky-200 bg-sky-50 p-3 shadow-sm">
        <div className="text-sm font-semibold text-sky-900">دفع آمن (Mada / STC Pay / Apple Pay)</div>
        <div className="text-xs text-sky-800/80 mt-1">تكامل Tap/PayTabs</div>
      </div>
      <div className="rounded-2xl border border-sky-200 bg-sky-50 p-3 shadow-sm">
        <div className="text-sm font-semibold text-sky-900">تحكيم واضح وتقييمات موثوقة</div>
        <div className="text-xs text-sky-800/80 mt-1">إجراءات نزاع مضادة للتلاعب</div>
      </div>
    </div>
  );
}
