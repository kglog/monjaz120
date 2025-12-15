"use client";


/**
 * 🧠 منصة.كوم - النواة الذكية الصامتة (Smart Silent Analysis)
 * تسجّل، تحلل، وتتعلم من التفاعل بدون أي ظهور للمستخدم.
 */

interface BrainEvent {
  type: string;
  details?: any;
  time: string;
}

const brain = {
  memory: [] as BrainEvent[],

  // 🔹 تسجيل الأحداث العامة
  logEvent(type: string, details?: any) {
    const entry = { type, details, time: new Date().toISOString() };
    this.memory.push(entry);
    if (this.memory.length > 500) this.memory.shift();
    console.log("🧠 [منصة.كوم] حدث:", type, details || "");
    this.save();
  },

  // 🔹 حفظ الذاكرة محلياً
  save() {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("monjaz_brain_v1", JSON.stringify(this.memory));
    }
  },

  // 🔹 استرجاع الأحداث السابقة
  load() {
    if (typeof localStorage !== "undefined") {
      const stored = localStorage.getItem("monjaz_brain_v1");
      if (stored) this.memory = JSON.parse(stored);
    }
  },

  // 🔹 التحليل الذكي الصامت
  analyze() {
    if (this.memory.length < 5) return "📊 لم تُجمع بيانات كافية بعد.";

    const now = Date.now();
    const recent = this.memory.filter(
      (e) => now - new Date(e.time).getTime() < 1000 * 60 * 30 // آخر 30 دقيقة
    );

    const visits = recent.filter((e) => e.type.includes("visit")).length;
    const actions = recent.filter((e) => e.type.includes("action")).length;

    if (visits > 5 && actions > 10) {
      return "🔥 المستخدم نشط جدًا.";
    } else if (actions === 0 && visits > 3) {
      return "🕐 المستخدم يتصفح بدون تفاعل.";
    } else if (visits < 2) {
      return "🌙 النشاط منخفض.";
    } else {
      return "✅ الوضع مستقر.";
    }
  },

  // 🔹 تقرير دوري صامت (للمطور فقط)
  silentReport() {
    const result = this.analyze();
    console.log("🤫 [تحليل صامت]:", result);
  },

  // 🔹 التهيئة عند التشغيل
  init() {
    this.load();
    this.logEvent("brain_started");
    setInterval(() => this.silentReport(), 1000 * 60 * 10); // كل 10 دقائق تحليل صامت
  },
};

// ✅ التفعيل عند الاستدعاء
if (typeof window !== "undefined") {
  setTimeout(() => brain.init(), 2000);
}

export default brain;
