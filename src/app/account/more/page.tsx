"use client";

import { CreditCard, UserCheck, Mail, Settings, Shield, Star, User } from "lucide-react";

export default function AccountMorePage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-8 text-center text-gray-800">
        المزيد — أدوات الحساب
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* البطاقات */}
        <Card
          icon={<CreditCard className="w-10 h-10 text-cyan-600 mb-3 mx-auto" />}
          title="بطاقات الدفع"
          desc="أضف أو عدّل بطاقاتك المرتبطة بحسابك."
          href="/account/cards"
          linkText="إدارة البطاقات"
        />

        {/* الهوية */}
        <Card
          icon={<UserCheck className="w-10 h-10 text-cyan-600 mb-3 mx-auto" />}
          title="توثيق الهوية"
          desc="وثّق هويتك لزيادة الثقة."
          href="/account/verify-id"
          linkText="وثّق هويتك"
        />

        {/* البريد */}
        <Card
          icon={<Mail className="w-10 h-10 text-cyan-600 mb-3 mx-auto" />}
          title="البريد الإلكتروني"
          desc="حدّث أو فعّل بريدك الإلكتروني المرتبط بالحساب."
          href="/account/email"
          linkText="إدارة البريد"
        />

        {/* الإعدادات */}
        <Card
          icon={<Settings className="w-10 h-10 text-cyan-600 mb-3 mx-auto" />}
          title="إعدادات الحساب"
          desc="عدّل تفضيلاتك وإعدادات الخصوصية بسهولة."
          href="/account/settings"
          linkText="الدخول للإعدادات"
        />

        {/* المعلومات الشخصية */}
        <Card
          icon={<User className="w-10 h-10 text-cyan-600 mb-3 mx-auto" />}
          title="المعلومات الشخصية"
          desc="عدّل اسمك وصورتك وبياناتك."
          href="/account/personal"
          linkText="تعديل البيانات"
        />

        {/* أمان الحساب */}
        <Card
          icon={<Shield className="w-10 h-10 text-cyan-600 mb-3 mx-auto" />}
          title="أمان الحساب"
          desc="تفعيل 2FA وتهيئات الأمان."
          href="/account/security"
          linkText="إدارة الأمان"
        />

        {/* النقاط والمكافآت */}
        <Card
          icon={<Star className="w-10 h-10 text-cyan-600 mb-3 mx-auto" />}
          title="النقاط والمكافآت"
          desc="راجع رصيدك والمكافآت المتاحة."
          href="/account/points"
          linkText="عرض النقاط"
        />
      </div>
    </main>
  );
}

function Card({
  icon,
  title,
  desc,
  href,
  linkText,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  href: string;
  linkText: string;
}) {
  return (
    <div className="p-6 border-2 border-cyan-100 rounded-xl shadow-sm hover:shadow-md transition bg-white hover:border-cyan-400 text-center">
      {icon}
      <h2 className="font-semibold text-gray-800 mb-1">{title}</h2>
      <p className="text-sm text-gray-600 mb-3">{desc}</p>
      <a href={href} className="text-cyan-600 hover:underline font-medium">
        {linkText}
      </a>
    </div>
  );
}
