export type CategoryData = {
  key: string;
  title: string;
  hero: { title: string; subtitle: string; cta?: string };
  popular: { title: string; tag: string; key?: string }[];
  subcategories: string[];
  subcategoriesDetailed?: { title: string; href: string }[];
};

export const CATEGORY_MAP: Record<string, CategoryData> = {
  // Reordered and pruned to match the exact approved list and order
  design: {
    key: 'design',
    title: 'تصميم',
    hero: { title: 'تصميم', subtitle: 'خدمات التصميم: شعارات، هوية، واجهات، وسوشيال ميديا.', cta: 'ابدأ التصفح' },
    popular: [
      { title: 'تصميم شعار', tag: 'Logo', key: 'logo' },
      { title: 'تصاميم السوشيال', tag: 'Social', key: 'social' },
      { title: 'صور مصغّرة', tag: 'Thumbnails', key: 'thumbnails' },
      { title: 'هوية بصرية', tag: 'Branding', key: 'branding' },
      { title: 'عروض تقديمية', tag: 'Presentations', key: 'presentations' },
      { title: 'سيرة ذاتية', tag: 'Resume', key: 'resume' },
      { title: 'بنرات إعلانية', tag: 'Banners', key: 'banners' },
      { title: 'الرسوم بالذكاء الاصطناعي', tag: 'AI Art', key: 'ai-art' },
      { title: 'صفحات هبوط', tag: 'Landing', key: 'landing' },
      { title: 'تصميم موقع', tag: 'Website', key: 'website' },
    ],
    subcategories: [
      'تصاميم سوشيال ميديا',
      'تصميم مواقع وتطبيقات',
      'تصميم شعارات وهوية',
      'تصاميم تسويقية',
      'صور مصغّرة',
      'عروض تقديمية',
      'سيرة ذاتية',
      'بنرات إعلانية'
    ],
    subcategoriesDetailed: [
      { title: 'تصاميم سوشيال ميديا', href: `/categories/تصميم/تصاميم سوشيال ميديا` },
      { title: 'تصميم مواقع وتطبيقات', href: `/categories/تصميم/تصميم مواقع وتطبيقات` },
      { title: 'تصميم شعارات وهوية', href: `/categories/تصميم/تصميم شعارات وهوية` },
      { title: 'تصاميم تسويقية', href: `/categories/تصميم/تصاميم تسويقية` },
      { title: 'صور مصغّرة', href: `/categories/تصميم/صور مصغّرة` },
      { title: 'عروض تقديمية', href: `/categories/تصميم/عروض تقديمية` },
      { title: 'سيرة ذاتية', href: `/categories/تصميم/سيرة ذاتية` },
      { title: 'بنرات إعلانية', href: `/categories/تصميم/بنرات إعلانية` }
    ],
  },
  programming: {
    key: 'programming',
    title: 'برمجة وتطوير',
    hero: { title: 'برمجة وتطوير', subtitle: 'تطوير مواقع، تطبيقات وبرمجيات مخصّصة.', cta: 'ابدأ التصفح' },
    popular: [
      { title: 'تطوير مواقع', tag: 'مواقع', key: 'website' },
      { title: 'تطوير تطبيقات', tag: 'تطبيقات', key: 'apps' },
    ],
    subcategories: [
      'برمجة بوتات',
      'برمجة متاجر إلكترونية',
      'برمجة إضافات ووردبريس',
      'تطوير ألعاب بسيطة',
      'برمجة ذكاء اصطناعي',
      'تكامل API وربط الأنظمة',
      'تصليح أخطاء برمجية',
      'تصميم قواعد بيانات'
    ],
    subcategoriesDetailed: [
      { title: 'برمجة بوتات', href: `/categories/برمجة وتطوير/برمجة بوتات` },
      { title: 'برمجة متاجر إلكترونية', href: `/categories/برمجة وتطوير/برمجة متاجر إلكترونية` },
      { title: 'برمجة إضافات ووردبريس', href: `/categories/برمجة وتطوير/برمجة إضافات ووردبريس` },
      { title: 'تطوير ألعاب بسيطة', href: `/categories/برمجة وتطوير/تطوير ألعاب بسيطة` },
      { title: 'برمجة ذكاء اصطناعي', href: `/categories/برمجة وتطوير/برمجة ذكاء اصطناعي` },
      { title: 'تكامل API وربط الأنظمة', href: `/categories/برمجة وتطوير/تكامل API وربط الأنظمة` },
      { title: 'تصليح أخطاء برمجية', href: `/categories/برمجة وتطوير/تصليح أخطاء برمجية` },
      { title: 'تصميم قواعد بيانات', href: `/categories/برمجة وتطوير/تصميم قواعد بيانات` }
    ],
  },
  marketing: {
    key: 'marketing',
    title: 'تسويق رقمي',
    hero: { title: 'تسويق رقمي', subtitle: 'خدمات تسويق ونمو رقمية لعلامتك التجارية.', cta: 'ابدأ التصفح' },
    popular: [
      { title: 'إعلانات مدفوعة', tag: 'Ads', key: 'ads' },
      { title: 'إدارة سوشيال ميديا', tag: 'Social', key: 'social' },
    ],
    subcategories: [
      'إدارة حملات إعلانية',
      'تسويق منصات التواصل',
      'إدارة حسابات سوشيال',
      'إعداد محتوى تسويقي',
      'تحسين إعلانات قوقل (Google Ads)',
      'كتابة محتوى إعلاني',
      'إعداد خطط تسويق',
      'التسويق بالبريد الإلكتروني'
    ],
    subcategoriesDetailed: [
      { title: 'إدارة حملات إعلانية', href: `/categories/تسويق رقمي/إدارة حملات إعلانية` },
      { title: 'تسويق منصات التواصل', href: `/categories/تسويق رقمي/تسويق منصات التواصل` },
      { title: 'إدارة حسابات سوشيال', href: `/categories/تسويق رقمي/إدارة حسابات سوشيال` },
      { title: 'إعداد محتوى تسويقي', href: `/categories/تسويق رقمي/إعداد محتوى تسويقي` },
      { title: 'تحسين إعلانات قوقل (Google Ads)', href: `/categories/تسويق رقمي/تحسين إعلانات قوقل (Google Ads)` },
      { title: 'كتابة محتوى إعلاني', href: `/categories/تسويق رقمي/كتابة محتوى إعلاني` },
      { title: 'إعداد خطط تسويق', href: `/categories/تسويق رقمي/إعداد خطط تسويق` },
      { title: 'التسويق بالبريد الإلكتروني', href: `/categories/تسويق رقمي/التسويق بالبريد الإلكتروني` }
    ],
  },
  writing: {
    key: 'writing',
    title: 'كتابة وترجمة',
    hero: { title: 'كتابة وترجمة', subtitle: 'كتابة محتوى، ترجمة وتدقيق لغوي احترافي.', cta: 'ابدأ التصفح' },
    popular: [
      { title: 'كتابة محتوى', tag: 'كتابة', key: 'content' },
      { title: 'ترجمة', tag: 'ترجمة', key: 'translate' },
    ],
    subcategories: [
      'كتابة مقالات',
      'كتابة محتوى مواقع',
      'ترجمة نصوص',
      'تدقيق لغوي',
      'إعادة صياغة محتوى',
      'كتابة سيرة ذاتية',
      'كتابة إعلانات',
      'كتابة سيناريو'
    ],
    subcategoriesDetailed: [
      { title: 'كتابة مقالات', href: `/categories/كتابة وترجمة/كتابة مقالات` },
      { title: 'كتابة محتوى مواقع', href: `/categories/كتابة وترجمة/كتابة محتوى مواقع` },
      { title: 'ترجمة نصوص', href: `/categories/كتابة وترجمة/ترجمة نصوص` },
      { title: 'تدقيق لغوي', href: `/categories/كتابة وترجمة/تدقيق لغوي` },
      { title: 'إعادة صياغة محتوى', href: `/categories/كتابة وترجمة/إعادة صياغة محتوى` },
      { title: 'كتابة سيرة ذاتية', href: `/categories/كتابة وترجمة/كتابة سيرة ذاتية` },
      { title: 'كتابة إعلانات', href: `/categories/كتابة وترجمة/كتابة إعلانات` },
      { title: 'كتابة سيناريو', href: `/categories/كتابة وترجمة/كتابة سيناريو` }
    ],
  },
  video: {
    key: 'video',
    title: 'فيديو وأنيميشن',
    hero: { title: 'فيديو وأنيميشن', subtitle: 'مونتاج، إنتاج فيديو، وأنيميشن احترافي.', cta: 'ابدأ التصفح' },
    popular: [
      { title: 'مونتاج فيديو', tag: 'مونتاج', key: 'editing' },
      { title: 'إنتاج فيديو إعلاني', tag: 'إنتاج', key: 'production' },
    ],
    subcategories: [
      'مونتاج فيديو',
      'موشن جرافيك',
      'صناعة تيك توك ورييلز',
      'تصميم مقدمات فيديو (Intro)',
      'تعديل ألوان الفيديو',
      'مؤثرات بصرية (VFX)',
      'فيديو إعلاني',
      'أنيميشن قصير'
    ],
    subcategoriesDetailed: [
      { title: 'مونتاج فيديو', href: `/categories/فيديو وأنيميشن/مونتاج فيديو` },
      { title: 'موشن جرافيك', href: `/categories/فيديو وأنيميشن/موشن جرافيك` },
      { title: 'صناعة تيك توك ورييلز', href: `/categories/فيديو وأنيميشن/صناعة تيك توك ورييلز` },
      { title: 'تصميم مقدمات فيديو (Intro)', href: `/categories/فيديو وأنيميشن/تصميم مقدمات فيديو (Intro)` },
      { title: 'تعديل ألوان الفيديو', href: `/categories/فيديو وأنيميشن/تعديل ألوان الفيديو` },
      { title: 'مؤثرات بصرية (VFX)', href: `/categories/فيديو وأنيميشن/مؤثرات بصرية (VFX)` },
      { title: 'فيديو إعلاني', href: `/categories/فيديو وأنيميشن/فيديو إعلاني` },
      { title: 'أنيميشن قصير', href: `/categories/فيديو وأنيميشن/أنيميشن قصير` }
    ],
  },
  audio: {
    key: 'audio',
    title: 'صوتيات',
    hero: { title: 'صوتيات', subtitle: 'تعليق صوتي، مونتاج صوتي وخدمات موسيقية.', cta: 'ابدأ الاستماع' },
    popular: [
      { title: 'تعليق صوتي', tag: 'صوت', key: 'voice-over' },
      { title: 'مونتاج صوتي', tag: 'مونتاج', key: 'audio-editing' },
    ],
    subcategories: [
      'تسجيل تعليق صوتي',
      'تعديل الصوت وتنقيته',
      'مونتاج بودكاست',
      'تسجيل إعلانات صوتية',
      'دمج المؤثرات الصوتية',
      'إنتاج شيلات',
      'تسجيل كتب صوتية',
      'هندسة صوت'
    ],
    subcategoriesDetailed: [
      { title: 'تسجيل تعليق صوتي', href: `/categories/صوتيات/تسجيل تعليق صوتي` },
      { title: 'تعديل الصوت وتنقيته', href: `/categories/صوتيات/تعديل الصوت وتنقيته` },
      { title: 'مونتاج بودكاست', href: `/categories/صوتيات/مونتاج بودكاست` },
      { title: 'تسجيل إعلانات صوتية', href: `/categories/صوتيات/تسجيل إعلانات صوتية` },
      { title: 'دمج المؤثرات الصوتية', href: `/categories/صوتيات/دمج المؤثرات الصوتية` },
      { title: 'إنتاج شيلات', href: `/categories/صوتيات/إنتاج شيلات` },
      { title: 'تسجيل كتب صوتية', href: `/categories/صوتيات/تسجيل كتب صوتية` },
      { title: 'هندسة صوت', href: `/categories/صوتيات/هندسة صوت` }
    ],
  },
  ai: {
    key: 'ai',
    title: 'ذكاء اصطناعي',
    hero: { title: 'ذكاء اصطناعي', subtitle: 'حلول ذكاء اصطناعي لتوليد محتوى وأتمتة.', cta: 'استكشف حلول الذكاء' },
    popular: [
      { title: 'نماذج ذكية', tag: 'نماذج', key: 'models' },
      { title: 'توليد صور AI', tag: 'صور', key: 'ai-images' },
    ],
    subcategories: [
      'توليد محتوى بالذكاء الاصطناعي',
      'إنشاء صور بالذكاء الاصطناعي',
      'برمجة بوتات ذكاء',
      'تدريب نماذج AI',
      'تحليل بيانات بالذكاء الاصطناعي',
      'أتمتة أعمال بالذكاء الاصطناعي',
      'تحسين أوامر ChatGPT',
      'بناء مساعدين ذكيين'
    ],
    subcategoriesDetailed: [
      { title: 'توليد محتوى بالذكاء الاصطناعي', href: `/categories/ذكاء اصطناعي/توليد محتوى بالذكاء الاصطناعي` },
      { title: 'إنشاء صور بالذكاء الاصطناعي', href: `/categories/ذكاء اصطناعي/إنشاء صور بالذكاء الاصطناعي` },
      { title: 'برمجة بوتات ذكاء', href: `/categories/ذكاء اصطناعي/برمجة بوتات ذكاء` },
      { title: 'تدريب نماذج AI', href: `/categories/ذكاء اصطناعي/تدريب نماذج AI` },
      { title: 'تحليل بيانات بالذكاء الاصطناعي', href: `/categories/ذكاء اصطناعي/تحليل بيانات بالذكاء الاصطناعي` },
      { title: 'أتمتة أعمال بالذكاء الاصطناعي', href: `/categories/ذكاء اصطناعي/أتمتة أعمال بالذكاء الاصطناعي` },
      { title: 'تحسين أوامر ChatGPT', href: `/categories/ذكاء اصطناعي/تحسين أوامر ChatGPT` },
      { title: 'بناء مساعدين ذكيين', href: `/categories/ذكاء اصطناعي/بناء مساعدين ذكيين` }
    ],
  },
  business: {
    key: 'business',
    title: 'أعمال',
    hero: { title: 'أعمال', subtitle: 'خدمات إدارية ومهنية للشركات وروّاد الأعمال.', cta: 'ابدأ التصفح' },
    popular: [
      { title: 'استشارات أعمال', tag: 'استشارة', key: 'consulting' },
      { title: 'خدمات مالية', tag: 'مالية', key: 'finance' },
    ],
    subcategories: [
      'إعداد خطط أعمال',
      'دراسات جدوى',
      'إعداد عروض استثمارية',
      'استشارات إدارية',
      'تنظيم إجراءات الأعمال',
      'إعداد لوائح وسياسات',
      'إدخال بيانات',
      'سكرتارية عن بعد'
    ],
    subcategoriesDetailed: [
      { title: 'إعداد خطط أعمال', href: `/categories/أعمال/إعداد خطط أعمال` },
      { title: 'دراسات جدوى', href: `/categories/أعمال/دراسات جدوى` },
      { title: 'إعداد عروض استثمارية', href: `/categories/أعمال/إعداد عروض استثمارية` },
      { title: 'استشارات إدارية', href: `/categories/أعمال/استشارات إدارية` },
      { title: 'تنظيم إجراءات الأعمال', href: `/categories/أعمال/تنظيم إجراءات الأعمال` },
      { title: 'إعداد لوائح وسياسات', href: `/categories/أعمال/إعداد لوائح وسياسات` },
      { title: 'إدخال بيانات', href: `/categories/أعمال/إدخال بيانات` },
      { title: 'سكرتارية عن بعد', href: `/categories/أعمال/سكرتارية عن بعد` }
    ],
  },
  engineering: {
    key: 'engineering',
    title: 'هندسة وعمارة',
    hero: { title: 'هندسة وعمارة', subtitle: 'خدمات هندسية ومعمارية وتصاميم تنفيذية.', cta: 'ابدأ التصفح' },
    popular: [
      { title: 'تصميم معماري', tag: 'معماري', key: 'architectural' },
    ],
    subcategories: [
      'تصميم مخططات',
      'رسم أوتوكاد',
      'نمذجة ثلاثية الأبعاد',
      'تصميم داخلي',
      'إخراج معماري',
      'حساب كميات',
      'إعداد تصاريح',
      'تصميم حدائق'
    ],
  },
  education: {
    key: 'education',
    title: 'تعليم عن بعد',
    hero: { title: 'تعليم عن بعد', subtitle: 'دورات أونلاين ومحتوى تعليمي متخصص.', cta: 'ابدأ التعلم' },
    popular: [
      { title: 'دورات أونلاين', tag: 'دورات', key: 'courses' },
    ],
    subcategories: [
      'شروحات جامعية',
      'تدريس خصوصي أونلاين',
      'حل واجبات',
      'تلخيص ملازم',
      'إعداد عروض تعليمية',
      'دورات قصيرة',
      'تعليم لغات',
      'تدريب مهارات'
    ],
  },
  data: {
    key: 'data',
    title: 'بيانات',
    hero: { title: 'بيانات', subtitle: 'تحليل بيانات، لوحات تحكّم وتقارير.', cta: 'استكشف الخدمات' },
    popular: [
      { title: 'تحليل بيانات', tag: 'تحليل', key: 'analysis' },
    ],
    subcategories: [
      'تحليل بيانات',
      'إعداد تقارير',
      'تصميم لوحات معلومات (Dashboards)',
      'إدخال بيانات',
      'تنظيف البيانات',
      'أبحاث سوق',
      'إعداد استطلاعات',
      'تحليل Excel'
    ],
  },
  seo: {
    key: 'seo',
    title: 'تحسين محركات البحث',
    hero: { title: 'تحسين محركات البحث', subtitle: 'خدمات SEO لرفع ترتيب موقعك وزيادة الزيارات.', cta: 'ابدأ التصفح' },
    popular: [
      { title: 'تحسين SEO On-Page', tag: 'SEO', key: 'on-page' },
    ],
    subcategories: [
      'تحسين SEO On-Page',
      'بحث كلمات مفتاحية',
      'تحليل تنافسي'
    ],
  },
  motion: {
    key: 'motion',
    title: 'موشن جرافيك',
    hero: { title: 'موشن جرافيك', subtitle: 'تحريك شعارات، انفوجرافيك، ومقدمات فيديو.', cta: 'ابدأ التصفح' },
    popular: [
      { title: 'موشن انفوجرافيك', tag: 'موشن', key: 'infographic' },
    ],
    subcategories: ['موشن انفوجرافيك', 'مقدمات فيديو', 'تحريك شعارات'],
  },
  legal: {
    key: 'legal',
    title: 'خدمات قانونية',
    hero: { title: 'خدمات قانونية', subtitle: 'استشارات قانونية، عقود وحلول امتثال.', cta: 'اطلب استشارة' },
    popular: [
      { title: 'صياغة عقود', tag: 'عقود', key: 'contracts' },
    ],
    subcategories: [
      'صياغة عقود',
      'تدقيق قانوني',
      'استشارات قانونية',
      'كتابة لوائح',
      'توثيق مستندات',
      'مراجعة أنظمة',
      'تجهيز قضايا',
      'إعداد مذكرات'
    ],
  },
  support: {
    key: 'support',
    title: 'دعم فني',
    hero: { title: 'دعم فني', subtitle: 'دعم فني وصيانة للأنظمة والتطبيقات.', cta: 'اطلب دعم' },
    popular: [
      { title: 'دعم تقني', tag: 'دعم', key: 'technical-support' },
    ],
    subcategories: [
      'إصلاح أجهزة',
      'تثبيت برامج',
      'استعادة بيانات',
      'حلول شبكات',
      'إزالة فيروسات',
      'دعم أنظمة تشغيل',
      'ضبط سيرفرات',
      'إعداد نسخ احتياطي'
    ],
  },
  security: {
    key: 'security',
    title: 'الحماية الإلكترونية',
    hero: { title: 'الحماية الإلكترونية', subtitle: 'خدمات أمن سيبراني: اختبار اختراق، أمن الشبكات ومراجعات أمان.', cta: 'ابدأ التصفح' },
    popular: [
      { title: 'اختبار اختراق', tag: 'اختبار', key: 'pentest' },
      { title: 'أمن الشبكات', tag: 'شبكات', key: 'network-security' },
    ],
    subcategories: [
      'فحص اختراق',
      'حماية مواقع',
      'تأمين حسابات',
      'اختبار ثغرات',
      'إزالة برمجيات خبيثة',
      'مراقبة أمنية',
      'إعداد جدران حماية',
      'تشفير بيانات'
    ],
  },
  // ASSISTANT_FINAL: true
};
