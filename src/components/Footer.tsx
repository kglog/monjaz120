import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200 py-10 mt-16">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-4">
        <div>
          <h3 className="font-bold mb-3">منصة.كوم</h3>
          <p>أكبر سوق عربي للخدمات المصغّرة.</p>
        </div>
        <div>
          <h3 className="font-bold mb-3">روابط</h3>
          <ul className="space-y-2">
            <li><a href="/about" className="hover:underline">عن المنصة</a></li>
            <li><a href="/contact" className="hover:underline">تواصل معنا</a></li>
            <li><a href="/faq" className="hover:underline">الأسئلة الشائعة</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-3">التصنيفات</h3>
          <ul className="space-y-2">
            <li>تصميم</li>
            <li>برمجة</li>
            <li>ذكاء اصطناعي</li>
            <li>استشارات</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-3">تابعنا</h3>
          <p>تويتر - فيسبوك - لينكدإن</p>
        </div>
      </div>
      <p className="text-center mt-8 text-sm"> {new Date().getFullYear()} منصة.كوم - جميع الحقوق محفوظة</p>
    </footer>
  );
}
