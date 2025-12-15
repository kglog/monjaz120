## تعليمات Copilot لوكلاء البرمجة بالذكاء الاصطناعي

الهدف: مساعدة وكيل ذكي في إجراء تعديلات صغيرة وقابلة للتحقق في هذا المشروع (مونوربو) المبني على Next.js. اجعل التغييرات محدودة، وأضف وسم المساعد عند تعديل/إنشاء ملفات.

نقاط رئيسية
- المونوربو: تطبيق رئيسي في `src/app/` وتطبيق شقيق في `monjaz120/src/app/`.
- التقنية: Next.js App Router (مكونات على الخادم والعميل)، TypeScript/TSX، Prisma، Tailwind CSS.
- ملفات مساعدة مشتركة: `src/lib/` و `monjaz120/src/lib/`.

أين تبدأ (ملفات عالية الإشارة)
- هيكل التطبيق: `src/app/layout.tsx`, `src/app/_app.tsx`, `src/app/page.tsx` (منسوخ أيضًا تحت `monjaz120/src/app/`).
- واجهات برمجة التطبيقات: `src/app/api/**/route.ts` — ضع منطق الخادم هنا.
- قاعدة البيانات: `prisma/` و `monjaz120/prisma/` — راجع `schema.prisma`, `seed.ts`, وملفات `_fallback.json`.
- أدوات مساعدة: `tools/sync_fallback_to_db.js`, `tools/enforce-rules.ps1`, `src/firebase.js`.

أوامر أساسية (PowerShell)
- تثبيت وتشغيل (الجذر):
  ```powershell
  npm install
  npm run dev
  ```
- Prisma (شغّل داخل مجلد `prisma/` المطابق للتطبيق الذي تغيّره):
  ```powershell
  cd prisma
  npx prisma generate
  npx prisma migrate dev --name <desc>
  node ../prisma/seed.ts
  ```
- تشغيل قواعد المستودع (محاكاة CI):
  ```powershell
  powershell -ExecutionPolicy Bypass -File tools/enforce-rules.ps1
  ```

قواعد المشروع (اتّبعها بدقة)
- **الوسم الإلزامي:** أضف السطر `// ASSISTANT_FINAL: true` لأي ملف ينشئه أو يعدّله مساعد ذكي — يفحص CI هذا.
- تفضيل TypeScript: استخدم `.ts`/`.tsx` داخل `src/` إلا للملفات التي كانت قائمة بـ `.js` (مثل `src/firebase.js`).
- مكان وضع المكونات: مكونات الميزات في `src/app/<feature>/components/`، والمكونات المشتركة في `components/` أو `src/components/`.
- واجهات الخادم: استخدم ملفات `route.ts` تحت `src/app/api/`، وضع الأدوات الخاصة بالخادم في `src/lib/`.

نماذج تكامل مهمة
- نسختان من Prisma: شغّل أوامر Prisma داخل مجلد `prisma/` المطابق للتطبيق الذي تغيّره.
- بيانات fallback & seed: تُستخدم مع `tools/sync_fallback_to_db.js` للمزامنة بالجداول الأولية.
- رفع الملفات: اتبع نمط Signed-URL الموجود في `src/app/api/uploads/` مع `@aws-sdk/*`.
- Firebase: إعداد العميل في `src/firebase.js` — لا تدرج أسرارًا في المستودع، استخدم متغيرات البيئة.

مثال سريع — إضافة نموذج DB
1. حرّر `schema.prisma` في مجلد `prisma/` المناسب.
2. من ذلك المجلد: `npx prisma migrate dev --name add_<x>` ثم `npx prisma generate`.
3. حدّث أدوات الخادم (مثل `src/lib/prisma.ts`).
4. اضف مسار واجهة مستخدم بسيط تحت `src/app/<feature>/` وشغّل `npm run dev` لتختبر.

ملاحظات للمساعدات الذكية
- اجعل التعديلات صغيرة وقابلة للتحقق؛ أضف اختبارات فقط عند الحاجة أو إذا فشل CI.
- لا تcommmit أسرارًا أو قيم بيئية؛ استخدم متغيرات البيئة واتّبع نمط `src/firebase.js`.
- عند إضافة واجهات API أو نماذج DB، أضف أمثلة استخدام صغيرة وحدث README القريب إن وجد.

// ASSISTANT_FINAL: true
