"use client";

import Link from "next/link";

const SUBCATS = [
  'تصميم شعار',
  'تصاميم سوشيال ميديا',
  'منشورات سوشيال ميديا',
  'إعلانات سوشيال ميديا',
  'صور مصغّرة',
  'تصميم مواقع وتطبيقات',
  'UI/UX',
  'تصميم غلاف كتاب'
];

// صفحة التصميم – Cyan فاتح + أيقونات SVG أنيقة للبطاقات (بدون هيدر)
export default function Page() {
  // ——— أيقونات SVG بسيطة وممتازة ———
  const IconLogo = () => (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 3l3.5 6 6 3.5-6 3.5L12 22l-3.5-6L2 12.5 8.5 9 12 3z" />
    </svg>
  );

  const IconSocial = () => (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M8 12a3 3 0 100-6 3 3 0 000 6zM20 8a3 3 0 10-6 0 3 3 0 006 0zM4 19c1.5-2 4-3 8-3s6.5 1 8 3" />
    </svg>
  );

  const IconThumb = () => (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="14" rx="2" />
      <path d="M3 17h18v3H3z" />
    </svg>
  );
  const IconBanner = () => (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M7 10h10M7 14h6" />
    </svg>
  );
  const IconBrand = () => (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 3l7 4v10l-7 4-7-4V7z" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  );
  const IconSlides = () => (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="4" y="5" width="16" height="10" rx="2" />
      <path d="M12 15v4M8 19h8" />
    </svg>
  );
  const IconCV = () => (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M8 3h6l4 4v14H8z" />
      <path d="M14 3v4h4M10 12h6M10 16h6M10 8h2" />
    </svg>
  );
  const IconAI = () => (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.5 5.5l2 2M16.5 16.5l2 2M16.5 7.5l2-2M5.5 18.5l2-2" />
      <circle cx="12" cy="12" r="3.5" />
    </svg>
  );

  // ——— شبكة التصنيفات الشائعة مع الأيقونات ———
  const popular: { t: string; s: string; key: string; Icon: () => any }[] = [
    { t: "تصميم شعار", s: "Logo", key: "logo", Icon: IconLogo },
    { t: "سوشيال ميديا", s: "Social", key: "social", Icon: IconSocial },
    { t: "صور مصغّرة", s: "Thumbnails", key: "thumbnails", Icon: IconThumb },
    { t: "بنرات إعلانية", s: "Banners", key: "banner", Icon: IconBanner },
    { t: "هوية بصريّة", s: "Branding", key: "brand", Icon: IconBrand },
    { t: "عروض تقديمية", s: "Slides", key: "presentation", Icon: IconSlides },
    { t: "سيرة ذاتية", s: "CV", key: "cv", Icon: IconCV },
    { t: "رسم بالذكاء الاصطناعي", s: "AI Art", key: "ai", Icon: IconAI },
  ];

  // ——— بقية الأقسام كما هي (أفتح Cyan) ———
  const columns: { heading: string; items: string[] }[] = [
    { heading: "تصاميم سوشيال ميديا", items: ["منشورات","إعلانات","صور مصغّرة","أغلفة","فلاتر وعدسات","ملصقات التطبيقات"] },
    { heading: "تصميم مواقع وتطبيقات", items: ["صفحة هبوط","موقع","تطبيق","لوحة تحكّم","UI/UX","أيقونات"] },
    { heading: "تصميم وتطوير الشعارات", items: ["شعار","شعار نصّي","شعار ثلاثي الأبعاد","تحسين الشعارات"] },
    { heading: "تصاميم تسويقية", items: ["بنرات","عبوات وأغلفة","بروشورات وفلاير"] },
    { heading: "العلامة التجاريّة", items: ["هوية بصريّة","بروفايل شركة","ختم","رمز QR"] },
    { heading: "تعديل وتحسين الصور", items: ["تعديل الصور","إزالة الخلفية","ترميم","تحسين صور المنتجات"] },
    { heading: "كتب ومطبوعات", items: ["تنسيق كتب","غلاف كتاب","فلاير/رول أب","كتب أطفال","مطبوعات مكتبية","منيو"] },
    { heading: "فن ورسـم", items: ["رسوم كرتونية","ستوري بورد","شخصيات 3D","بورتريه/كاريكاتير","رموز NFT","خلفيات/ألعاب"] },
    { heading: "دعوات ومعايدات", items: ["دعوات زواج","أعياد ومناسبات","شهادات شكر"] },
    { heading: "تصاميم ثلاثية الأبعاد", items: ["طباعة 3D","تصميم منتجات","تصاميم صناعية","CNC"] },
    { heading: "الرسم بالذكاء الاصطناعي", items: ["Midjourney","Stable Diffusion","أخرى"] },
    { heading: "أزياء وإكسسوارات", items: ["تصميم أزياء","تيشرتات","مجوهرات وإكسسوارات"] },
  ];

  const articles = [
    { title: "خمس خطوات ذهبية لتتصميم شعار لا يُنسى", desc: "من الاستكشاف إلى التسليم — دليل سريع." },
    { title: "حزمة سوشيال احترافية لمتجرك", desc: "قوالب ومقاسات وتسليم ملفات." },
    { title: "هوية تجارية قوية في 7 نقاط", desc: "نمط لوني، خطوط، دليل استخدام." },
    { title: "مدخل مبسّط إلى تصميم الجرافيك", desc: "مفاهيم وأدوات أساسية." },
  ];

  const faqs = [
    { q: "ما خدمات التصميم المتاحة؟", a: "شعارات، هويات، سوشيال، UI/UX، مطبوعات، 3D، ورسوم." },
    { q: "كيف أختار الخدمة المناسبة؟", a: "طالع الأمثلة والتقييمات وحدّد النطاق والزمن قبل الطلب." },
    { q: "هل تُسلّم الملفات المصدرية؟", a: "حسب الاتفاق، يمكن تضمين ملفات قابلة للتعديل." },
    { q: "كم التكلفة المتوقعة؟", a: "تختلف حسب النوع والتعقيد — سترى الأسعار في البطاقات." },
  ];

  const related = [
    "تصميم فيديو إعلاني","تحريك شعار","تحريك شخصيات","تحويل PSD لموقع",
    "تصميم خارجي وواجهات","تصميم داخلي وديكور","تصميم حدائق ولاند سكيب","رسوم ومخططات بيانية",
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-[rgb(249,251,253)] text-slate-900">
      {/* Hero بتدرّج Cyan فاتح */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#bfe8f7]/30 via-[#bfe8f7]/30 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-16">
          <h1 className="text-center">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full bg-[#bfe8f7] px-7 py-2 text-3xl md:text-4xl font-extrabold tracking-tight text-white border border-black shadow-lg hover:shadow-2xl transform-gpu hover:-translate-y-1 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#bfe8f7]/35"
            >
              التصميم
            </button>
          </h1>
          <p className="mt-4 text-center text-slate-600">أعمال إبداعية على يد مصممين محترفين — تجربة شراء واضحة وسلسة.</p>
          {/* small quick-links that mirror the cards below (uses existing `popular` data) */}
            {/* Removed duplicated small pills in hero — kept the larger popular section below */}
          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-full p-[1px] bg-gradient-to-r from-[#bfe8f7] to-[#bfe8f7] border border-black relative overflow-hidden">
              <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent" />
              <span className="pointer-events-none absolute left-1/2 top-1/2 h-[140%] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/8 blur-[12px]" />
              <a
                href="#catalog"
                className="group relative inline-flex items-center gap-2 rounded-full px-7 py-2.5 text-white bg-[#bfe8f7] hover:bg-[#bfe8f7] transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-1 hover:scale-[1.01] transform-gpu focus:outline-none focus:ring-4 focus:ring-[#bfe8f7]/30 overflow-hidden z-10"
              >
                <span
                  className="relative z-20 text-[19px] md:text-[23px] font-extralight"
                  style={{ WebkitTextFillColor: 'transparent', WebkitTextStroke: '0.7px white', textShadow: '-0.6px -0.6px 0 #fff, 0.6px -0.6px 0 #fff, -0.6px 0.6px 0 #fff, 0.6px 0.6px 0 #fff', color: 'white' }}
                >
                  ابدأ التصفح
                </span>
                <span className="relative z-20 transition-transform duration-200 group-hover:translate-x-0.5">↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* تصنيفات شائعة – بطاقات Cyan + أيقونة داخل حاوية فخمة */}
      <section className="py-14" id="popular">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-8 text-center text-2xl font-bold text-slate-800">تصنيفات تصميم شائعة</h2>
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {popular.map(({ t, s, key, Icon }) => (
                <a key={t} href={`/design/${key}`} className="group relative rounded-2xl border border-black bg-white p-5 shadow-sm hover:shadow-md transition-shadow overflow-hidden cursor-pointer">
                <div className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl bg-black" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#bfe8f7]/60 bg-gradient-to-br from-[#bfe8f7]/30 to-white text-[#66c6e0] shadow-[0_1px_0_0_rgba(0,0,0,0.03)]">
                      <Icon />
                    </div>
                    <div className="text-lg font-semibold">{t}</div>
                  </div>
                  <span className="text-xs rounded-full bg-[#bfe8f7]/22 px-2 py-1 text-black border border-black">{s}</span>
                </div>
                <div className="mt-4 h-24 rounded-xl bg-gradient-to-br from-white/60 to-[#bfe8f7]/12 border border-black overflow-hidden" />
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-black underline font-medium">استكشف</span>
                  <span className="text-slate-400 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="catalog" className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-10 text-center text-3xl font-extrabold text-slate-900">تصفّح خدمات تصميم</h2>
          <div className="grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {columns.map((col) => (
              <div key={col.heading} className="rounded-2xl border border-black bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="mb-4 text-lg font-bold text-slate-800"><span className="me-2 text-[#bfe8f7]">◆</span>{col.heading}</h3>
                <ul className="space-y-2 text-slate-700">
                  {col.items.map((it) => (
                    <li key={it} className="flex items-center justify-between rounded-lg px-2 py-1 hover:bg-[#bfe8f7]/25">
                      <span>{it}</span>
                      <span className="text-slate-300">›</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="sr-only" />
    </div>
  );
}

// ASSISTANT_FINAL: true
