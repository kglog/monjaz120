
export type DesignCategory = {
  key: string;
  nameAr: string;
  nameEn: string;
  descAr: string;
  descEn: string;
};

export const DESIGN_CATEGORIES: DesignCategory[] = [
  { key: "logo", nameAr: "شعارات", nameEn: "Logos", descAr: "شعارات احترافية", descEn: "Professional logos" },
  { key: "brand", nameAr: "هوية بصرية", nameEn: "Branding", descAr: "هوية كاملة ودليل علامة", descEn: "Brand identity & guidelines" },
  { key: "social", nameAr: "سوشيال ميديا", nameEn: "Social Media", descAr: "قوالب ومنشورات", descEn: "Templates & posts" },
  { key: "thumbnails", nameAr: "صور مصغّرة", nameEn: "Thumbnails", descAr: "صور مصغّرة للفيديو والمنشورات", descEn: "Video & post thumbnails" },
  { key: "cv", nameAr: "سيرة ذاتية", nameEn: "CV", descAr: "تصميم سيرة ذاتية احترافية", descEn: "Professional CV designs" },
  { key: "uiux", nameAr: "UI/UX", nameEn: "UI/UX", descAr: "واجهات مواقع وتطبيقات", descEn: "Web/App interfaces" },
  { key: "banner", nameAr: "بنرات وإعلانات", nameEn: "Banners & Ads", descAr: "بنرات ثابتة/متحركة", descEn: "Static/animated banners" },
  { key: "infographic", nameAr: "إنفوجرافيك", nameEn: "Infographic", descAr: "رسوم معلوماتية", descEn: "Information visuals" },
  { key: "packaging", nameAr: "تغليف", nameEn: "Packaging", descAr: "تصميم عبوات ومنتجات", descEn: "Product & packaging" },
  { key: "mockup", nameAr: "موكابات", nameEn: "Mockups", descAr: "نماذج عرض واقعية", descEn: "Realistic mockups" },
  { key: "photo", nameAr: "تعديل صور", nameEn: "Photo Editing", descAr: "تنقيح وتحسين", descEn: "Retouch & enhance" },
  { key: "3d", nameAr: "3D", nameEn: "3D", descAr: "نمذجة وعرض ثلاثي", descEn: "3D modeling & renders" },
  { key: "print", nameAr: "طباعة", nameEn: "Print", descAr: "بطاقات/فلاير/رول أب", descEn: "Cards, flyers, roll-up" },
  { key: "presentation", nameAr: "عروض تقديمية", nameEn: "Presentations", descAr: "Pitch / Keynote", descEn: "Pitch/Keynote decks" },
  { key: "bookcover", nameAr: "أغلفة", nameEn: "Covers", descAr: "كتاب/بودكاست", descEn: "Book/Podcast covers" },
  { key: "ai", nameAr: "الذكاء الاصطناعي", nameEn: "AI", descAr: "أعمال إبداعية مولّدة أو محسّنة بالذكاء الاصطناعي", descEn: "AI-generated or enhanced creative work" },
];

export const getCategoryByKey = (k: string) => DESIGN_CATEGORIES.find(c => c.key === k);

// ASSISTANT_FINAL: true
