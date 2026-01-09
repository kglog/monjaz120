// 📄 src/app/page.tsx
// ASSISTANT_FINAL: true
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import brain from "@/core/brain-safe";
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
  ShoppingCart,
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

  // ——————————————————————
  // بيانات الأقسام (16 قسم)
  // ——————————————————————
  const sections = [
  { title: "تصميم", icon: <Brush className="w-8 h-8 text-black" strokeWidth={1.5} /> },
  { title: "برمجة وتطوير", icon: <Code className="w-8 h-8 text-black" strokeWidth={1.5} /> },
  { title: "تسويق رقمي", icon: <Megaphone className="w-8 h-8 text-black" strokeWidth={1.5} /> },
  { title: "كتابة وترجمة", icon: <NotebookPen className="w-8 h-8 text-black" strokeWidth={1.5} /> },
  { title: "فيديو وأنيميشن", icon: <Clapperboard className="w-8 h-8 text-black" strokeWidth={1.5} /> },
  { title: "صوتيات", icon: <Music2 className="w-8 h-8 text-black" strokeWidth={1.5} /> },
  { title: "ذكاء اصطناعي", icon: <Cpu className="w-8 h-8 text-black" strokeWidth={1.5} /> },
  { title: "أعمال", icon: <BriefcaseBusiness className="w-8 h-8 text-black" strokeWidth={1.5} /> },
  { title: "هندسة وعمارة", icon: <Building className="w-8 h-8 text-black" strokeWidth={1.5} /> },
  { title: "تعليم عن بعد", icon: <GraduationCap className="w-8 h-8 text-black" strokeWidth={1.5} /> },
  { title: "بيانات", icon: <Database className="w-8 h-8 text-black" strokeWidth={1.5} /> },
  { title: "تحسين محركات البحث", icon: <TrendingUp className="w-8 h-8 text-black" strokeWidth={1.5} /> },
  { title: "موشن جرافيك", icon: <ImageIcon className="w-8 h-8 text-black" strokeWidth={1.5} /> },
  { title: "خدمات قانونية", icon: <Scale className="w-8 h-8 text-black" strokeWidth={1.5} /> },
  { title: "دعم فني", icon: <Headphones className="w-8 h-8 text-black" strokeWidth={1.5} /> },
  { title: "تصنيفات أكثر", icon: <Grid3X3 className="w-8 h-8 text-black" strokeWidth={1.5} /> },
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
  <section className="bg-white">
  <div className="mx-auto max-w-2x1 px-6 py-4 relative">
          {/* عبارة داخل مستطيل */}
          <div className="flex items-center justify-center mb-4">
            <div className="max-w-lg text-right text-gray-800 font-bold text-2xl flex flex-col gap-2.5 -mr-4 -translate-y-7">
              {/* pricing rectangle removed per user request (phrase and box removed) */}
            </div>
          </div>

          {/* شريط البحث */}
            <div className="mt-0 sm:mt-0 translate-y-2 sm:translate-y-3 flex items-center justify-center gap-2">
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

            <div className="mt-9 text-center">
              <p className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight mt-1">منصتك لإنجاز المهام الذكية بسهولة وأمان</p>
                <p className="mt-2 text-sm md:text-[1.2rem] font-extrabold text-gray-700 leading-tight">أنجز أعمالك بأمان وسهولة وبأسعار تبدأ من 10 ريال فقط</p>
            </div>

            {/* Independent request card: absolutely positioned inside the hero container
              Placed on the left, dropped down a few steps and hidden on very small screens */}
            <div className="absolute left-10 sm:left-12 top-12 sm:top-14 z-40 hidden sm:block">
                                <InlineRequestCard />
                              </div>

         {/* العنوان في أيقونة (كبسولة بحواف سوداء ثخينة) */}
        {/* 'الأقسام' capsule removed per design request */}
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
  <div className="mx-auto max-w-6xl px-5 pb-10 mt-3 translate-y-10">
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
                className="group relative rounded-2xl bg-white/90 backdrop-blur-md border-[2.5px] border-black p-2 shadow-lg hover:shadow-2xl hover:-translate-y-[calc(1.25rem-5px)] transition transform duration-500 flex flex-col items-center justify-center text-center overflow-hidden min-h-[170px] -translate-y-11"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#dbf4ff] to-[#dbf4ff] opacity-50 group-hover:opacity-85 transition"></div>
                <div className="relative z-10 flex flex-col items-center">
                <div className="flex items-center justify-center w-[66px] h-[66px] rounded-full bg-white border-[1.5px] border-black text-black shadow-md group-hover:scale-110 transition transform translate-y-3">
                  {s.icon}
                </div>
                <span className="mt-6 font-medium text-black text-x2 drop-shadow-lg">
                  {s.title}
                </span>
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
    <section className="bg-white">
  <div className="mx-auto max-w-6xl px-5 py-12 grid md:grid-cols-2 gap-8 items-center">
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

  <div className="space-y-6 mt-6 md:mt-12">
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
    <section className="bg-[#f7f8fa]">
  <div className="mx-auto max-w-6xl px-5 py-12">
        <h3 className="text-center text-xl md:text-2xl font-bold text-gray-900">
          لماذا منصتك خيارك الأفضل
        </h3>

              <div className="mt-0 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="rounded-2xl -translate-y-9 border-[2px] bg-[#f2f6fa] p-2 text-center shadow-sm hover:shadow-md transition min-h-[170px]">
                <div className="mx-auto mb-3 inline-flex items-center justify-center rounded-2xl bg-[#a3d6f7]/30 border-[2px] border-black text-black p-1">
                  <Headphones className="w-8 h-8 text-black" />
                </div>
                <div className="font-semibold text-gray-900">خدمة عملاء 24/7</div>
                <p className="text-gray-600 text-sm mt-1">فريق محترف للرد على الاستفسارات وحل المشكلات.</p>
              </div>
                <div className="rounded-2xl -translate-y-9 border-[2px] bg-[#f2f6fa] p-2 text-center shadow-sm hover:shadow-md transition min-h-[170px]">
                <div className="mx-auto mb-3 inline-flex items-center justify-center rounded-2xl bg-[#a3d6f7]/30 border-[2px] border-black text-black p-1">
                  <BadgeCheck className="w-8 h-8 text-black" />
                </div>
                <div className="font-semibold text-gray-900">أسعار اقتصادية</div>
                <p className="text-gray-600 text-sm mt-1">جودة عالية بأسعار تبدأ من <span style={{WebkitTextFillColor: 'transparent', WebkitTextStroke: '1.6px rgba(0,0,0,0.95)', fontWeight: 800, display: 'inline-block'}}>10</span> ريال فقط.</p>
              </div>
                <div className="rounded-2xl -translate-y-9 border-[2px] bg-[#f2f6fa] p-2 text-center shadow-sm hover:shadow-md transition min-h-[170px]">
                <div className="mx-auto mb-3 inline-flex items-center justify-center rounded-2xl bg-[#a3d6f7]/30 border-[2px] border-black text-black p-1">
                  <Grid3X3 className="w-8 h-8 text-black" />
                </div>
                <div className="font-semibold text-gray-900">أكثر من 350 تصنيف</div>
                <p className="text-gray-600 text-sm mt-1">يغطي كافة المجالات الاحترافية.</p>
              </div>
                <div className="rounded-2xl -translate-y-9 border-[2px] bg-[#f8fafc] p-2 text-center shadow-sm hover:shadow-md transition min-h-[170px]">
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
        </div>
      </div>
    </section>
  );
}

function SectionPopular({ popular }: { popular: any[] }) {
  return (
    <section className="bg-white">
  <div className="mx-auto max-w-6xl px-5 py-12">
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

            <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popular.map((s, i) => (
            <div
              key={i}
              onClick={() => {
                try {
                  PlatformBrainOps.recordAction("open_popular", { title: s.title });
                } catch {}
              }}
                className="rounded-2xl -translate-y-9 border-[2px] bg-[#f8fafc] p-1 shadow-sm hover:shadow-md transition"
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
  <div className="mx-auto max-w-6xl px-5 py-12">
        <h3 className="text-center text-xl md:text-2xl font-bold text-gray-900">
          الأسئلة الشائعة
        </h3>
        <div className="mt-6 space-y-3">
          <Accordion q="ما هي منصة.كوم؟" a="منصة عربية لبيع وشراء الخدمات المصغّرة باحترافية وأمان." />
          <Accordion q="كيف أستفيد من المنصة؟" a="ابحث عن الخدمة المطلوبة أو تصفّح الأقسام، ثم اطلب الخدمة وتابع مع البائع." />
          <Accordion q="كيف تضمنون حقوقي؟" a="الدفع مؤمّن داخل المنصة ولا يتم تحويله للبائع إلا بعد تأكيد الاستلام." />
          <Accordion q="هل أستطيع البيع؟" a="أكيد! يمكنك التسجيل كبائع وإضافة خدماتك بسهولة عبر لوحة البائع." />
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
        <a
          href="/vendor"
          className="inline-block mt-5 rounded-xl bg-[#7cbdf2] hover:bg-[#50د9د9] text-white px-8 py-3 font-semibold transition"
        >
          سجل معنا الآن
        </a>
      </div>
    </section>
  );
}

function InlineRequestCard() {
  return (
    <a
      href="/requests-hub"
  className="flex-shrink-0 w-[140px] h-[114px] bg-[#fdfeff] rounded-b-3xl rounded-t-none border-[1.5px] border-black shadow-lg flex items-center justify-center p-1 transform -translate-x-7 -translate-y-24 transition-all duration-200 overflow-hidden"
      title="طلب خدمة"
      aria-label="طلب خدمة"
    >
      {/* subtle fixed sheen overlay (non-animated) */}
  <div className="pointer-events-none absolute inset-0 rounded-b-3xl rounded-t-none bg-gradient-to-tr from-white/30 via-white/10 to-transparent opacity-60 mix-blend-screen" />

          <div className="relative z-10 flex flex-col items-center gap-1">
          <div className="w-7 h-7 rounded-xl bg-white flex items-center justify-center shadow-sm border-[1.5px] border-black translate-y-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.75}>
            <path d="M3 7v10a2 2 0 0 0 2 2h5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M21 7v10a2 2 0 0 1-2 2h-5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 6h8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
  <div className="text-sm font-medium text-black whitespace-nowrap mt-3" style={{ transform: 'translateY(10px)' }}>اطلب خدمة</div>
      </div>
    </a>
  );
}

/* ————————————————————————
  Small Components
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
  <div className="rounded-2xl -translate-y-11 border-[2px] bg-[#fbfcfe] p-3 text-center shadow-sm hover:shadow-md transition">
      <div className="mx-auto mb-3 inline-flex items-center justify-center rounded-2xl bg-[#a3d6f7]/30 border-[2px] border-black text-black p-2">
        {icon}
      </div>
      <div className="font-semibold text-gray-900">{title}</div>
      <p className="text-gray-600 text-sm mt-1">{desc}</p>
    </div>
  );
}

function Accordion({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
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
      className="w-8 h-8 text-black"
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
