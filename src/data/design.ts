export type DesignSubcat = { slug: string; name: string; icon?: string };

export const quickFilters: string[] = [
  "شعارات", "هوية بصرية", "سوشيال ميديا", "UI/UX", "بنرات", "عروض تقديمية", "تحسين الصور"
];

export const popularDesignCats: DesignSubcat[] = [
  { slug: "logo", name: "تصميم شعارات" },
  { slug: "social", name: "تصميم منشورات سوشيال" },
  { slug: "thumbnails", name: "صور مصغّرة" },
  { slug: "branding", name: "هوية بصرية" },
  { slug: "presentations", name: "عروض تقديمية" },
  { slug: "resume", name: "سيرة ذاتية" },
  { slug: "banners", name: "بنرات إعلانية" },
  { slug: "ai-art", name: "الرسوم بالذكاء الاصطناعي" },
];

export const browseColumns: Array<{ title: string; items: DesignSubcat[] }> = [
  {
    title: "تصاميم سوشيال ميديا",
    items: [
      { slug: "social-posts", name: "منشورات سوشيال" },
      { slug: "social-ads", name: "إعلانات سوشيال" },
      { slug: "covers", name: "غلاف منصات" },
      { slug: "filters", name: "فلاتر وعدسات" },
      { slug: "app-assets", name: "أصول تطبيقات التواصل" },
    ],
  },
  {
    title: "مواقع وتطبيقات",
    items: [
      { slug: "landing", name: "صفحات هبوط" },
      { slug: "website", name: "تصميم موقع" },
      { slug: "app-ui", name: "تصميم تطبيق" },
      { slug: "dashboard", name: "لوحة تحكم" },
      { slug: "uiux", name: "UI/UX" },
    ],
  },
  {
    title: "شعارات وتطوير هوية",
    items: [
      { slug: "logo-basic", name: "شعار أساسي" },
      { slug: "logo-3d", name: "شعار 3D" },
      { slug: "logo-upgrade", name: "تحسين الشعارات" },
      { slug: "brand-kit", name: "Brand Kit" },
    ],
  },
  {
    title: "تصاميم تسويقية",
    items: [
      { slug: "flyers", name: "مطويات وبروشورات" },
      { slug: "packaging", name: "عبوات وتغليف" },
      { slug: "product-cards", name: "بطاقات منتجات" },
      { slug: "infographic", name: "إنفوجرافيك" },
    ],
  },
  {
    title: "تحسين الصور",
    items: [
      { slug: "retouch", name: "تعديل وتنقية" },
      { slug: "bg-remove", name: "إزالة الخلفية" },
      { slug: "old-restore", name: "ترميم صور قديمة" },
      { slug: "product-photos", name: "صور منتجات" },
    ],
  },
  {
    title: "كتب ومطبوعات",
    items: [
      { slug: "book-layout", name: "تنسيق كتب" },
      { slug: "book-cover", name: "غلاف كتاب" },
      { slug: "menus", name: "قوائم طعام" },
      { slug: "certificates", name: "شهادات شكر" },
    ],
  },
];

export const spotlightServices = [
  { id: "s1", title: "تصميم شعار بروفيشنال", rating: 4.9, reviews: 312, priceFrom: 10 },
  { id: "s2", title: "هوية بصرية ستارتب", rating: 4.8, reviews: 184, priceFrom: 10 },
  { id: "s3", title: "باقة سوشيال شهري", rating: 4.7, reviews: 420, priceFrom: 10 },
  { id: "s4", title: "UI/UX صفحة هبوط", rating: 4.9, reviews: 96,  priceFrom: 10 },
];

export const relatedChips: string[] = [
  "تحريك شعار","تحريك شخصيات","تصميم فيديو إعلاني",
  "تحويل PSD لموقع","رسوم ومخططات بيانية","تصميم داخلي وخارجي",
];

export const faq: Array<{ q: string; a: string }> = [
  { q: "ما هي خدمات التصميم؟", a: "كل ما يخص الهوية، الويب، السوشيال، والعلامات التجارية." },
  { q: "هل السعر نهائي؟", a: "نعم — السعر المعروض نهائي ويشمل الضريبة عند الاقتضاء." },
  { q: "ما طرق الدفع؟", a: "Mada وSTC Pay وApple Pay وVisa/MasterCard عبر مزوّد دفع معتمد." },
  { q: "كيف أختار الخدمة المناسبة؟", a: "اختر التصنيف، تصفّح العينات والتقييمات، ثم اطلب فورًا." },
];
