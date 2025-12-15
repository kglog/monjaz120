"use client";

// نجيب النواة الحقيقية
import real from "./brain";

// نصدّر واجهة آمنة تمنع الكراش لو تأخر real لحظة
const brainSafe = {
  logEvent: (...args: unknown[]) => {
    try { if (real?.logEvent) (real.logEvent as (...a: unknown[]) => void)(...args); } catch {}
  },
  analyze: (...args: unknown[]) => {
    try { if (real?.analyze) return (real.analyze as (...a: unknown[]) => string)(...args); } catch { return "—"; }
  },
  load: () => {
    try { real?.load?.(); } catch {}
  },
  save: () => {
    try { real?.save?.(); } catch {}
  },
  // لو ودك تضيف دوال ثانية من النواة… كرر نفس النمط فوق
};

export default brainSafe;
