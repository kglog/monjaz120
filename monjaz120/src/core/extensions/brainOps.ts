import brain from "@/core/brain";

/**
 * 🧩 وحدة الذكاء التشغيلي الآمن – Platform BrainOps
 * تراقب النشاطات وتحلل الأداء وتصدر تنبيهات ذكية بدون التأثير على سرعة النظام.
 */

export const brainOps = {
  // تسجيل أي تصرف للمستخدمين أو النظام
  recordAction(action: string, context?: any) {
    brain.logEvent("action", { action, ...context });
  },

  // تحليل الأداء بشكل لحظي
  analyzePerformance() {
    const now = Date.now();
    const recent = brain.memory.filter(
      (e) => now - new Date(e.time).getTime() < 1000 * 60 * 10
    ); // آخر 10 دقائق
    const actions = recent.filter((e) => e.type === "action").length;

    if (actions > 200) {
      brain.logEvent("⚠️ overload_detected", { actions });
      return "🚨 النشاط عالي جدًا – تفعيل توزيع الحمل الذكي.";
    }

    if (actions === 0) {
      brain.logEvent("ℹ️ idle_state", {});
      return "🕊️ النظام هادئ حاليًا.";
    }

    return "✅ النشاط طبيعي ومستقر.";
  },

  // كشف الأنماط الغريبة (تحايل أو ضغط غير طبيعي)
  detectAnomalies() {
    const anomalies = brain.memory.filter((e) =>
      e.type.includes("security_alert")
    ).length;

    if (anomalies > 3) {
      brain.logEvent("🛡️ security_mode_enabled", { anomalies });
      return "🔒 تم تفعيل وضع الحماية الذكية مؤقتًا.";
    }

    return "🔍 لا توجد أنماط مريبة حاليًا.";
  },
};
