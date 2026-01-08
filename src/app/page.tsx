// 📄 src/app/page.tsx
"use client";

import { useState } from "react";
import {
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
import CategoryCard from "@/components/CategoryCard";

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
  { title: "الحماية الإلكترونية", icon: <Grid3X3 className="w-8 h-8 text-black" strokeWidth={2} /> },
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
          <h1 className="text-lg sm:text-lg md:text-[1.25rem] font-bold text-gray-800 text-center translate-y-14">
            منصتك لإنجاز المهام الذكية بسهولة وأمان
          </h1>
          <p className="mt-2 text-center text-gray-600 font-bold">
  أنجز أعمالك بأمان وسهولة وبأسعار تبدأ من{" "}
  <span className="text-[1.05rem] font-extrabold text-[gray-900]">10</span> ريال فقط
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
      <div className="mx-auto max-w-6xl px-5 pb-10 mt-3">
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {sections.map((s, i) => (
            <a
              key={i}
              href={`/categories/${encodeURIComponent(s.title)}`}
              className="block text-center"
            >
              <CategoryCard title={s.title} icon={s.icon} />
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
      <div className="mx-auto max-w-6xl px-4 py-12 grid md:grid-cols-2 gap-8 items-center">
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

        <div className="space-y-6">
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
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h3 className="text-center text-xl md:text-2xl font-bold text-gray-900">
          لماذا منصتك خيارك الأفضل
        </h3>

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
        </div>
      </div>
    </section>
  );
}

function SectionPopular({ popular }: { popular: any[] }) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
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
              className="rounded-2xl border bg-white p-4 shadow-sm hover:shadow-md transition"
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
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h3 className="text-center text-xl md:text-2xl font-bold text-gray-900">
          الأسئلة الشائعة
        </h3>
        <div className="mt-6 space-y-3">
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
          className="inline-block mt-5 rounded-xl bg-[#7cbdf2] hover:bg-[#50d9d9] text-white px-8 py-3 font-semibold transition"
        >
          سجل معنا الآن
        </a>
      </div>
    </section>
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
    <div className="rounded-2xl border bg-white p-6 text-center shadow-sm hover:shadow-md transition">
      <div className="mx-auto mb-3 inline-flex items-center justify-center rounded-2xl bg-[#a3d6f7]/30 border border-black text-black p-3">
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
      className="w-9 h-9 text-black"
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

