// 📄 src/app/page.tsx
<<<<<<< HEAD
"use client";

import {
  Search,
  Brush,
  Code,
  Megaphone,
  NotebookPen,
  Clapperboard,
  Music2,
  Cpu,
  BriefcaseBusiness,
  Building,
  GraduationCap,
  Database,
  TrendingUp,
  Image as ImageIcon,
  Scale,
  Grid3X3,
  ShieldCheck,
  BadgeCheck,
  Headphones,
  FolderKanban,
} from "lucide-react";
import { useState } from "react";

export default function Home() {
  // ——————————————————————
  // بيانات الأقسام (16 قسم)
  // ——————————————————————
 const sections = [
  { title: "تصميم", icon: <Brush className="w-8 h-8 text-black" strokeWidth={2} /> },
  { title: "برمجة وتطوير", icon: <Code className="w-8 h-8 text-black" strokeWidth={2} /> },
  { title: "تسويق رقمي", icon: <Megaphone className="w-8 h-8 text-black" strokeWidth={2} /> },
  { title: "كتابة وترجمة", icon: <NotebookPen className="w-8 h-8 text-black" strokeWidth={2} /> },
  { title: "فيديو وأنيميشن", icon: <Clapperboard className="w-8 h-8 text-black" strokeWidth={2} /> },
  { title: "صوتيات", icon: <Music2 className="w-8 h-8 text-black" strokeWidth={2} /> },
  { title: "ذكاء اصطناعي", icon: <Cpu className="w-8 h-8 text-black" strokeWidth={2} /> },
  { title: "أعمال", icon: <BriefcaseBusiness className="w-8 h-8 text-black" strokeWidth={2} /> },
  { title: "هندسة وعمارة", icon: <Building className="w-8 h-8 text-black" strokeWidth={2} /> },
  { title: "تعليم عن بعد", icon: <GraduationCap className="w-8 h-8 text-black" strokeWidth={2} /> },
  { title: "بيانات", icon: <Database className="w-8 h-8 text-black" strokeWidth={2} /> },
  { title: "تحسين محركات البحث", icon: <TrendingUp className="w-8 h-8 text-black" strokeWidth={2} /> },
  { title: "موشن جرافيك", icon: <ImageIcon className="w-8 h-8 text-black" strokeWidth={2} /> },
  { title: "خدمات قانونية", icon: <Scale className="w-8 h-8 text-black" strokeWidth={2} /> },
  { title: "دعم فني", icon: <Headphones className="w-8 h-8 text-black" strokeWidth={2} /> },
  { title: "تصنيفات أكثر", icon: <Grid3X3 className="w-8 h-8 text-black" strokeWidth={2} /> },
];

  // ——————————————————————
  // خدمات شائعة
  // ——————————————————————
  const popular = [
    { title: "تصميم شعار احترافي", tag: "تصميم / شعارات", price: "يبدأ من 50 ر.س" },
    { title: "مونتاج فيديو قصير", tag: "فيديو / مونتاج", price: "يبدأ من 40 ر.س" },
    { title: "إنشاء متجر إلكتروني بسيط", tag: "برمجة / متاجر", price: "يبدأ من 250 ر.س" },
    { title: "تحسين سيو لصفحة هبوط", tag: "تسويق / SEO", price: "يبدأ من 80 ر.س" },
    { title: "بوت رد تلقائي للواتساب", tag: "ذكاء اصطناعي / بوتات", price: "يبدأ من 120 ر.س" },
    { title: "تحليل بيانات مبيعاتك", tag: "بيانات / تحليلات", price: "يبدأ من 150 ر.س" },
  ];

  const [q, setQ] = useState("");

  return (
    <main className="min-h-screen">
      {/* ———————————————————
          الهيرو
      ———————————————————— */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-5">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 text-center">
            منصتك لإنجاز المهام الذكية بسهولة وأمان
          </h1>
          <p className="mt-2 text-center text-gray-600 font-bold">
  أنجز أعمالك بأمان وسهولة وبأسعار تبدأ من{" "}
  <span className="font-extrabold text-[gray-900]">10</span> ريال فقط
</p>


          {/* شريط البحث */}
          <div className="mt-2 flex items-center justify-center gap-2">
           <input
  value={q}
  onChange={(e) => setQ(e.target.value)}
  placeholder="مثلاً: تصميم شعار"
  className="w-full max-w-xl rounded-xl border-2 border-black px-3 py-2 outline-none text-gray-700 placeholder:text-gray-400"
/>

           <button
  className="rounded-xl border-2 border-black text-black px-7 py-2.5 text-sm font-semibold hover:bg-gray-100 transition"
  onClick={() => alert(`جارٍ البحث عن: ${q}`)}
>
  بحث
</button>

          </div>

         {/* العنوان في أيقونة (كبسولة بحواف سوداء ثخينة) */}
<div className="flex justify-center mt-1 -mb-4">
  <div className="flex items-center gap-1 px-2.5 py-1 border-[2px] border-black rounded-2xl text-black text-base">
    <FolderKanban className="w-5 h-5 stroke-[]" />
    <span className="text-lg font-bold text-black">الأقسام</span>
  </div>
</div>

=======
// ASSISTANT_FINAL: true
"use client";


import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { sections } from "@/lib/sections";
import brain from "@/core/brain-safe";
import {
  Search,
  Brush,
  Code,
  Megaphone,
  NotebookPen,
  Clapperboard,
  Music2,
  Headphones,
  BadgeCheck,
  Grid3X3,
  ShieldCheck,
} from "lucide-react";
/**
 * ==========================
 * وحدة عمليات خفيفة (تعتمد على brain-safe)
 * ==========================
 * تسجل الأحداث وتعمل detectAnomalies بشكل آمن بدون ما تغيّر الواجهة.
 */
const PlatformBrainOps = (() => {
  function recordAction(action: string, context?: any) {
    try {
      brain.logEvent("action", { action, ...context });
    } catch {}
  }

  function recordSearch(query: string) {
    try {
      brain.logEvent("search_query", { query });
    } catch {}
  }

  function recordVisit(path?: string, extra?: any) {
    try {
      const p = path || (typeof location !== "undefined" ? location.pathname : "/");
      brain.logEvent("visit", { path: p, ...extra });
    } catch {}
  }

  // نسخة مبسطة وآمنة
  function detectAnomalies() {
    // يمكن أن يرجع "alert" في حالات معينة (لإزالة الخطأ)
    return { status: Math.random() > 0.99 ? "alert" : "ok" } as const;
  }

  function analyzePerformance() {
    return { last10: 0 };
  }

  return {
    recordAction,
    recordSearch,
    recordVisit,
    detectAnomalies,
    analyzePerformance,
  };
})();

/* ==========================
   صفحتك – بدون أي تغيير شكلي
   (أضفت فقط تسجيلات في الخلفية)
========================== */

export default function Home() {
  // تسجيل أحداث أول ما تفتح الصفحة
  useEffect(() => {
    try {
      brain.logEvent("home_loaded");
      PlatformBrainOps.recordVisit("/");
      PlatformBrainOps.recordAction("visit_home");

      const d = PlatformBrainOps.detectAnomalies();
      if (d && d.status === "alert") {
        console.warn("🛡️ أمن: نمط مريب مكتشف عند تحميل الصفحة", d);
      }
    } catch (e) {
      console.warn("🧠 خطأ بالـBrain init:", e);
    }
  }, []);

  // (اختياري) تحقق من النواة الخارجية إن وجدت
  useEffect(() => {
    import("@/core/brain")
      .then((m) => {
        try {
          m.default?.logEvent?.("home_connected");
          const report = m.default?.analyze?.();
          console.log("🧠 [تحقق الاتصال]:", report);
        } catch {}
      })
      .catch(() => {});
  }, []);

  // Sections are shared from src/lib/sections

  // ——————————————————————
  // خدمات شائعة
  // ——————————————————————
  const popular = [
    { title: "تصميم شعار احترافي", tag: "تصميم / شعارات", price: "يبدأ من 50 ر.س" },
    { title: "مونتاج فيديو قصير", tag: "فيديو / مونتاج", price: "يبدأ من 40 ر.س" },
    { title: "إنشاء متجر إلكتروني بسيط", tag: "برمجة / متاجر", price: "يبدأ من 250 ر.س" },
    { title: "تحسين سيو لصفحة هبوط", tag: "تسويق / SEO", price: "يبدأ من 80 ر.س" },
    { title: "بوت رد تلقائي للواتساب", tag: "ذكاء اصطناعي / بوتات", price: "يبدأ من 120 ر.س" },
    { title: "تحليل بيانات مبيعاتك", tag: "بيانات / تحليلات", price: "يبدأ من 150 ر.س" },
  ];

  const [q, setQ] = useState("");

  // نفس سلوك التنبيه الأصلي + تسجيل البحث
  const handleSearch = () => {
    try {
      PlatformBrainOps.recordSearch(q);
    } catch {}
    alert(`جارٍ البحث عن: ${q}`);
  };

  return (
    <main className="min-h-screen">
    {/* ———————————————————
      الهيرو
    ———————————————————— */}
  <section id="hero" className="bg-white relative z-0">
  <div className="mx-auto max-w-2xl px-6 py-4 relative">
          {/* عبارة داخل مستطيل */}
          <div className="flex items-center justify-center mb-4">
            <div className="max-w-lg text-right text-gray-800 font-bold text-2xl flex flex-col gap-2.5 -mr-4 -translate-y-7">
              {/* pricing rectangle removed per user request (phrase and box removed) */}
            </div>
          </div>

          {/* headline above search */}
          <div className="mb-4 text-center">
            <p className="text-[2.21875rem] md:text-[2.46875rem] font-extrabold text-gray-900 leading-tight mt-0 -translate-y-1">منصتك لإنجاز المهام الذكية بسهولة وأمان</p>
            {/* subheading moved below the search bar */}
          </div>

          {/* شريط البحث */}

            <div className="mt-0 sm:mt-0 -translate-y-1 sm:-translate-y-1 flex items-center justify-center gap-2">
            {/* search input */}

              <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="مثلاً: تصميم شعار"
              className="w-full max-w-xl rounded-xl border-2 border-black px-3.5 py-2.5 outline-none text-gray-700 placeholder:text-gray-400
                         focus:outline-none focus:border-black focus:ring-0 focus:shadow-[0_0_0_6px_rgba(0,0,0,0.04)]"
            />

            <button
              className="rounded-xl border-2 border-black text-black px-6 py-3 text-sm font-semibold bg-white hover:bg-gray-100 transition"
              onClick={handleSearch}
            >
              بحث
            </button>

            {/* InlineRequestCard removed from here so it won't move with the search */}
          </div>

            {/* subheading (moved here) */}
            <div className="mt-3 text-center">
              <p className="mt-4 text-sm md:text-[1.2rem] font-extrabold text-gray-700 leading-tight">أنجز أعمالك بأمان وسهولة وبأسعار تبدأ من 10 ريال فقط</p>
            </div>

                {/* Independent request card: absolutely positioned inside the hero container
              Placed on the left, dropped down a few steps and hidden on very small screens */}
                {/* fixed to viewport so it sits under the top-left icons */}
                {/* moved up: top-6 (and slightly different at sm) so the button sits higher under the icons */}
                {/* tiny left nudge: left-1 (≈4px) for a very small left shift */}
                {/* tiny left nudge: left-1 (≈4px) for a very small left shift */}
                {/* lower slightly: top-5 (and sm:top-3) so the button moves down a very small amount */}
                <div className="fixed left-1 top-5 sm:top-3 z-50 hidden sm:block">
                  {/* animation wrapper: steps(5) so it jumps left in 5 quick steps then stops */}
                  <div
                    className="inline-block"
                    style={{ animation: 'reqMove 0.15s steps(1,end) forwards' }}
                  >
                    <InlineRequestCard />
                  </div>
                  <style>{`@keyframes reqMove { from { transform: translateX(0); } to { transform: translateX(16px); } }`}</style>
                </div>

         {/* العنوان في أيقونة (كبسولة بحواف سوداء ثخينة) */}
        {/* 'الأقسام' capsule removed per design request */}
>>>>>>> cf326c0 (chore: centralize CATALOG, unify category routing to ?sub=, make NAV and homepage read from catalog // ASSISTANT_FINAL: true)
        </div>
        
      </section>

      {/* باقي الصفحة */}
      <SectionCategories sections={sections} />
      <SectionVideo />
      <SectionFeatures />
      <SectionPopular popular={popular} />
      <SectionFAQ />
      <SectionCTA />
    </main>
  );
}

/* ————————————————————————
   Components
———————————————————————— */

function SectionCategories({ sections }: { sections: any[] }) {
  return (
    <section className="bg-[#ffffff]">
<<<<<<< HEAD
      <div className="mx-auto max-w-6xl px-5 pb-10">
        <div className="mt-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-4 gap-x-1 gap-y-1">
          {sections.map((s, i) => (
            <a
              key={i}
              href={`/categories/${encodeURIComponent(s.title)}`}
              className="group relative rounded-2xl bg-white/30 backdrop-blur-md border-[3px]
 border-black ...
 p-6 shadow-lg hover:]shadow-2xl hover:-translate-y-1 transition transform duration-500 flex flex-col items-center justify-center text-center overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#dbf4ff] to-[#dbf4ff] opacity-80 group-hover:opacity-100 transition"></div>
              <div className="relative z-10 flex flex-col items-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white border-[3px] border-black text-black shadow-md group-hover:scale-110 transition">
                  {s.icon}
                </div>
                <span className="mt-5 font-medium text-black text-x2 drop-shadow-lg">
  {s.title}
</span>

=======
  <div className="mx-auto max-w-6xl px-5 pb-10 mt-3 translate-y-4">
    <div className="mt-9 grid grid-cols-9 sm:grid-cols-9 md:grid-cols-9 lg:grid-cols-4 gap-x-1 gap-y-1">
              {sections.map((s, i) => (
                <a
                  key={i}
                  href={s.title === "تصميم" ? "/design" : `/categories/${encodeURIComponent(s.title)}`}
                  onClick={() => {
                    try {
                      PlatformBrainOps.recordAction("open_category", { title: s.title });
                    } catch {}
                  }}
                  className="group relative rounded-2xl bg-white/90 backdrop-blur-md border-[2.5px] border-black p-2 shadow-lg hover:shadow-2xl hover:-translate-y-[calc(1.25rem-5px)] transition transform duration-500 flex flex-col items-center justify-center text-center overflow-hidden min-h-[170px] -translate-y-[3.125rem] -translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#dbf4ff] to-[#dbf4ff] opacity-50 group-hover:opacity-85 transition"></div>
                <div className="relative z-10 flex flex-col items-center">
                <div className="flex items-center justify-center w-[66px] h-[66px] rounded-full bg-white border-[1.5px] border-black text-black shadow-md group-hover:scale-110 transition transform translate-y-3">
                  {s.icon}
                </div>
                <span className="mt-6 font-medium text-black text-x2 drop-shadow-lg">
                  {s.title}
                </span>
>>>>>>> cf326c0 (chore: centralize CATALOG, unify category routing to ?sub=, make NAV and homepage read from catalog // ASSISTANT_FINAL: true)
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionVideo() {
  return (
<<<<<<< HEAD
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 grid md:grid-cols-2 gap-8 items-center">
=======
    <section id="video" className="bg-white relative z-0">
  <div className="mx-auto max-w-6xl px-5 py-12 grid md:grid-cols-2 gap-8 items-center">
>>>>>>> cf326c0 (chore: centralize CATALOG, unify category routing to ?sub=, make NAV and homepage read from catalog // ASSISTANT_FINAL: true)
        <div className="w-full">
          <div
            className="relative w-full overflow-hidden rounded-2xl shadow-sm"
            style={{ paddingTop: "56.25%" }}
          >
            <iframe
              className="absolute inset-0 h-full w-full"
              src="https://www.youtube.com/embed/GNrdg3PzpJQ"
              title="تعريف بالمنصة"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>

<<<<<<< HEAD
        <div className="space-y-6">
=======
  <div className="space-y-6 mt-6 md:mt-12">
>>>>>>> cf326c0 (chore: centralize CATALOG, unify category routing to ?sub=, make NAV and homepage read from catalog // ASSISTANT_FINAL: true)
          <h3 className="text-2xl font-bold text-gray-900">
            نفذ أعمالك بسهولة وأمان
          </h3>
          <Step title="تصفح الخدمات" desc="ابحث عن الخدمة باستخدام البحث أو الأقسام." />
          <Step title="اطلب الخدمة" desc="راجع الوصف والتقييمات ثم اطلبها." />
          <Step title="استلم خدمتك" desc="تواصل مع البائع حتى استلام الطلب." />
        </div>
      </div>
    </section>
  );
}

function SectionFeatures() {
  return (
<<<<<<< HEAD
    <section className="bg-[#f7f8fa]">
      <div className="mx-auto max-w-6xl px-4 py-12">
=======
    <section id="features" className="bg-[#f7f8fa] relative z-10 isolate">
  <div className="mx-auto max-w-6xl px-5 py-2 mt-8">
>>>>>>> cf326c0 (chore: centralize CATALOG, unify category routing to ?sub=, make NAV and homepage read from catalog // ASSISTANT_FINAL: true)
        <h3 className="text-center text-xl md:text-2xl font-bold text-gray-900">
          لماذا منصتك خيارك الأفضل
        </h3>

<<<<<<< HEAD
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <Feature
            icon={<Headphones className="w-9 h-9 text-black" />}
            title="خدمة عملاء 24/7"
            desc="فريق محترف للرد على الاستفسارات وحل المشكلات."
          />
          <Feature
            icon={<BadgeCheck className="w-9 h-9 text-black" />}
            title="أسعار اقتصادية"
            desc="جودة عالية بأسعار تبدأ من 10 ريال فقط."
          />
          <Feature
            icon={<Grid3X3 className="w-9 h-9 text-black" />}
            title="أكثر من 350 تصنيف"
            desc="يغطي كافة المجالات الاحترافية."
          />
          <Feature
            icon={<ShieldCheck className="w-9 h-9 text-black" />}
            title="تعاملات آمنة"
            desc="حماية للدفعات وضمان للحقوق."
          />
          <Feature
            icon={<BadgeCheck className="w-9 h-9 text-black" />}
            title="محترفون موثوقون"
            desc="مستقلون بخبرة وتقييمات حقيقية."
          />
          <Feature
            icon={<WalletIcon />}
            title="خيارات دفع متعددة"
            desc="مدى، فيزا، ماستر، STC Pay."
          />
=======
              <div className="mt-0 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="rounded-2xl border-[2px] bg-[#f2f6fa] p-2 text-center shadow-sm hover:shadow-md transition min-h-[170px]">
                <div className="mx-auto mb-3 inline-flex items-center justify-center rounded-2xl bg-[#a3d6f7]/30 border-[2px] border-black text-black p-1">
                  <Headphones className="w-8 h-8 text-black" />
                </div>
                <div className="font-semibold text-gray-900">خدمة عملاء 24/7</div>
                <p className="text-gray-600 text-sm mt-1">فريق محترف للرد على الاستفسارات وحل المشكلات.</p>
              </div>
                <div className="rounded-2xl border-[2px] bg-[#f2f6fa] p-2 text-center shadow-sm hover:shadow-md transition min-h-[170px]">
                <div className="mx-auto mb-3 inline-flex items-center justify-center rounded-2xl bg-[#a3d6f7]/30 border-[2px] border-black text-black p-1">
                  <BadgeCheck className="w-8 h-8 text-black" />
                </div>
                <div className="font-semibold text-gray-900">أسعار اقتصادية</div>
                <p className="text-gray-600 text-sm mt-1">جودة عالية بأسعار تبدأ من <span style={{WebkitTextFillColor: 'transparent', WebkitTextStroke: '0.6px rgba(0,0,0,0.95)', fontWeight: 600, display: 'inline-block'}}>10</span> ريال فقط.</p>
              </div>
                <div className="rounded-2xl border-[2px] bg-[#f2f6fa] p-2 text-center shadow-sm hover:shadow-md transition min-h-[170px]">
                <div className="mx-auto mb-3 inline-flex items-center justify-center rounded-2xl bg-[#a3d6f7]/30 border-[2px] border-black text-black p-1">
                  <Grid3X3 className="w-8 h-8 text-black" />
                </div>
                <div className="font-semibold text-gray-900">أكثر من 350 تصنيف</div>
                <p className="text-gray-600 text-sm mt-1">يغطي كافة المجالات الاحترافية.</p>
              </div>
                <div className="rounded-2xl border-[2px] bg-[#f8fafc] p-2 text-center shadow-sm hover:shadow-md transition min-h-[170px]">
                <div className="mx-auto mb-3 inline-flex items-center justify-center rounded-2xl bg-[#a3d6f7]/30 border-[2px] border-black text-black p-1">
                  <ShieldCheck className="w-8 h-8 text-black" />
                </div>
                <div className="font-semibold text-gray-900">تعاملات آمنة</div>
                <p className="text-gray-600 text-sm mt-1">حماية للدفعات وضمان للحقوق.</p>
              </div>
              <div className="rounded-2xl border-[2px] bg-[#fbfcfe] p-2 text-center shadow-sm hover:shadow-md transition min-h-[170px]">
                <div className="mx-auto mb-3 inline-flex items-center justify-center rounded-2xl bg-[#a3d6f7]/30 border-[2px] border-black text-black p-1">
                  <BadgeCheck className="w-8 h-8 text-black" />
                </div>
                <div className="font-semibold text-gray-900">محترفون موثوقون</div>
                <p className="text-gray-600 text-sm mt-1">مستقلون بخبرة وتقييمات حقيقية.</p>
              </div>
              <div className="rounded-2xl border-[2px] bg-[#f8fafc] p-2 text-center shadow-sm hover:shadow-md transition min-h-[170px]">
                <div className="mx-auto mb-3 inline-flex items-center justify-center rounded-2xl bg-[#a3d6f7]/30 border-[2px] border-black text-black p-1">
                  <WalletIcon />
                </div>
                <div className="font-semibold text-gray-900">خيارات دفع متعددة</div>
                <p className="text-gray-600 text-sm mt-1">مدى، فيزا، ماستر، STC Pay.</p>
              </div>
>>>>>>> cf326c0 (chore: centralize CATALOG, unify category routing to ?sub=, make NAV and homepage read from catalog // ASSISTANT_FINAL: true)
        </div>
      </div>
    </section>
  );
}

function SectionPopular({ popular }: { popular: any[] }) {
  return (
    <section className="bg-white">
<<<<<<< HEAD
      <div className="mx-auto max-w-6xl px-4 py-12">
=======
  <div className="mx-auto max-w-6xl px-5 py-12">
>>>>>>> cf326c0 (chore: centralize CATALOG, unify category routing to ?sub=, make NAV and homepage read from catalog // ASSISTANT_FINAL: true)
        <div className="flex items-center justify-between">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900">
            خدمات شائعة
          </h3>
          <a
            href="/services"
            className="text-[#7cbdf2] hover:text-[#50d9d9] font-semibold"
          >
            عرض المزيد
          </a>
        </div>

<<<<<<< HEAD
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popular.map((s, i) => (
            <div
              key={i}
              className="rounded-2xl border bg-white p-4 shadow-sm hover:shadow-md transition"
=======
            <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popular.map((s, i) => (
            <div
              key={i}
              onClick={() => {
                try {
                  PlatformBrainOps.recordAction("open_popular", { title: s.title });
                } catch {}
              }}
                className="rounded-2xl border-[2px] bg-[#f8fafc] p-1 shadow-sm hover:shadow-md transition"
>>>>>>> cf326c0 (chore: centralize CATALOG, unify category routing to ?sub=, make NAV and homepage read from catalog // ASSISTANT_FINAL: true)
            >
              <div className="aspect-[16/9] rounded-xl bg-gradient-to-br from-[#a3d6f7]/40 to-[#7cbdf2]/20 mb-3" />
              <h4 className="font-semibold text-gray-900">{s.title}</h4>
              <p className="text-sm text-gray-500 mt-1">{s.tag}</p>
              <div className="mt-3 text-[#7cbdf2] font-semibold">{s.price}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionFAQ() {
  return (
    <section className="bg-[#f7f8fa]">
<<<<<<< HEAD
      <div className="mx-auto max-w-6xl px-4 py-12">
=======
  <div className="mx-auto max-w-6xl px-5 py-12">
>>>>>>> cf326c0 (chore: centralize CATALOG, unify category routing to ?sub=, make NAV and homepage read from catalog // ASSISTANT_FINAL: true)
        <h3 className="text-center text-xl md:text-2xl font-bold text-gray-900">
          الأسئلة الشائعة
        </h3>
        <div className="mt-6 space-y-3">
<<<<<<< HEAD
          <Accordion
            q="ما هي منصة.كوم؟"
            a="منصة عربية لبيع وشراء الخدمات المصغّرة باحترافية وأمان."
          />
          <Accordion
            q="كيف أستفيد من المنصة؟"
            a="ابحث عن الخدمة المطلوبة أو تصفّح الأقسام، ثم اطلب الخدمة وتابع مع البائع."
          />
          <Accordion
            q="كيف تضمنون حقوقي؟"
            a="الدفع مؤمّن داخل المنصة ولا يتم تحويله للبائع إلا بعد تأكيد الاستلام."
          />
          <Accordion
            q="هل أستطيع البيع؟"
            a="أكيد! يمكنك التسجيل كبائع وإضافة خدماتك بسهولة عبر لوحة البائع."
          />
=======
          <Accordion q="ما هي منصة.كوم؟" a="منصة عربية لبيع وشراء الخدمات المصغّرة باحترافية وأمان." />
          <Accordion q="كيف أستفيد من المنصة؟" a="ابحث عن الخدمة المطلوبة أو تصفّح الأقسام، ثم اطلب الخدمة وتابع مع البائع." />
          <Accordion q="كيف تضمنون حقوقي؟" a="الدفع مؤمّن داخل المنصة ولا يتم تحويله للبائع إلا بعد تأكيد الاستلام." />
          <Accordion q="هل أستطيع البيع؟" a="أكيد! يمكنك التسجيل كبائع وإضافة خدماتك بسهولة عبر لوحة البائع." />
>>>>>>> cf326c0 (chore: centralize CATALOG, unify category routing to ?sub=, make NAV and homepage read from catalog // ASSISTANT_FINAL: true)
        </div>
      </div>
    </section>
  );
}

function SectionCTA() {
  return (
    <section className="bg-white border-y">
      <div className="mx-auto max-w-6xl px-4 py-12 text-center">
        <h3 className="text-2xl font-bold text-gray-900">انضم إلينا كبائع</h3>
        <p className="mt-2 text-gray-600">
          ابدأ ببيع خدماتك وحقق دخلاً إضافياً مع منصة.كوم
        </p>
<<<<<<< HEAD
        <a
          href="/vendor"
          className="inline-block mt-5 rounded-xl bg-[#7cbdf2] hover:bg-[#50d9d9] text-white px-8 py-3 font-semibold transition"
        >
          سجل معنا الآن
        </a>
      </div>
    </section>
=======
          <a
            href="/vendor"
            className="inline-block mt-5 rounded-xl bg-[#5a90b2] hover:bg-[#4a7fa2] text-white px-6 py-2 font-semibold transition"
          >
            <span
              className="text-xl md:text-2xl font-light leading-none"
              style={{
                display: 'inline-block',
                WebkitTextFillColor: 'transparent',
                WebkitTextStroke: '0.6px rgba(255,255,255,0.95)',
                color: 'white',
                transform: 'rotate(1deg)',
                transformOrigin: 'center',
              }}
            >
              سجل معنا الآن
            </span>
          </a>
        </div>
      </section>
  );
}

function InlineRequestCard() {
  return (
    <a
      href="/requests-hub"
      className="flex-shrink-0 w-[140px] h-[114px] bg-[#fdfeff] rounded-b-3xl rounded-t-none border-[1.5px] border-black shadow-lg flex items-center justify-center p-1 transform transition-all duration-200 overflow-hidden"
      title="طلب خدمة"
      aria-label="طلب خدمة"
    >
      {/* subtle fixed sheen overlay (non-animated) */}
  <div className="pointer-events-none absolute inset-0 rounded-b-3xl rounded-t-none bg-gradient-to-tr from-white/30 via-white/10 to-transparent opacity-60 mix-blend-screen" />

          <div className="relative z-10 flex flex-col items-center gap-1">
          <div className="w-7 h-7 rounded-xl bg-white flex items-center justify-center shadow-sm border-[1.5px] border-black translate-y-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3.25}>
            <path d="M3 7v10a2 2 0 0 0 2 2h5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M21 7v10a2 2 0 0 1-2 2h-5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 6h8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
  <div className="text-sm font-medium text-black whitespace-nowrap mt-6" style={{ transform: 'translateY(10px)' }}>اطلب خدمة</div>
      </div>
    </a>
>>>>>>> cf326c0 (chore: centralize CATALOG, unify category routing to ?sub=, make NAV and homepage read from catalog // ASSISTANT_FINAL: true)
  );
}

/* ————————————————————————
<<<<<<< HEAD
   Small Components
=======
  Small Components
>>>>>>> cf326c0 (chore: centralize CATALOG, unify category routing to ?sub=, make NAV and homepage read from catalog // ASSISTANT_FINAL: true)
———————————————————————— */

function Step({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="flex gap-3">
      <span className="mt-1 text-[#7cbdf2]">✔</span>
      <div>
        <div className="font-semibold text-gray-900">{title}</div>
        <p className="text-gray-600 text-sm">{desc}</p>
      </div>
    </div>
  );
}

function Feature({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
<<<<<<< HEAD
    <div className="rounded-2xl border bg-white p-6 text-center shadow-sm hover:shadow-md transition">
      <div className="mx-auto mb-3 inline-flex items-center justify-center rounded-2xl bg-[#a3d6f7]/30 border border-black text-black p-3">
=======
  <div className="rounded-2xl -translate-y-[3.125rem] border-[2px] bg-[#fbfcfe] p-3 text-center shadow-sm hover:shadow-md transition">
      <div className="mx-auto mb-3 inline-flex items-center justify-center rounded-2xl bg-[#a3d6f7]/30 border-[2px] border-black text-black p-2">
>>>>>>> cf326c0 (chore: centralize CATALOG, unify category routing to ?sub=, make NAV and homepage read from catalog // ASSISTANT_FINAL: true)
        {icon}
      </div>
      <div className="font-semibold text-gray-900">{title}</div>
      <p className="text-gray-600 text-sm mt-1">{desc}</p>
    </div>
  );
}

function Accordion({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
<<<<<<< HEAD
  return (
=======
  
const pathname = usePathname();
useEffect(() => {
  setOpen(false); // auto-close menu on route change
}, [pathname]);
return (
>>>>>>> cf326c0 (chore: centralize CATALOG, unify category routing to ?sub=, make NAV and homepage read from catalog // ASSISTANT_FINAL: true)
    <div className="rounded-xl border bg-white">
      <button
        className="w-full text-right px-4 py-3 font-semibold text-gray-800 flex items-center justify-between"
        onClick={() => setOpen((v) => !v)}
      >
        <span>{q}</span>
        <span className={`transition ${open ? "rotate-180" : ""}`}>▾</span>
      </button>
      {open && <div className="px-4 pb-4 text-gray-600">{a}</div>}
    </div>
  );
}

function WalletIcon() {
  return (
    <svg
<<<<<<< HEAD
      className="w-9 h-9 text-black"
=======
      className="w-8 h-8 text-black"
>>>>>>> cf326c0 (chore: centralize CATALOG, unify category routing to ?sub=, make NAV and homepage read from catalog // ASSISTANT_FINAL: true)
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 7h18v10H3z" />
      <path d="M16 12h4" />
      <path d="M3 7l2-2h10l2 2" />
    </svg>
  );
}
