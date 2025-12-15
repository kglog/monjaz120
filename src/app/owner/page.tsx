import Link from "next/link";
import OwnerHeaderBadge from "../../components/owner/OwnerHeaderBadge";
import OwnerLogoutButton from "../../components/owner/OwnerLogoutButton";
import OwnerNameBadge from "@/components/owner/OwnerNameBadge";

export default function OwnerHome() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6" dir="rtl">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">لوحة المالك — منصة.كوم</h1>
          <p className="text-sm text-gray-600 mt-1">
            تحكم كامل (Auto/Manual) + مهام يدوية + روابط الإدارة. لا تُعرض أي تفاصيل داخلية للعامة.
          </p>

          <OwnerNameBadge />
        </div>

        <OwnerLogoutButton />
      </div>

      <OwnerHeaderBadge />

      <div className="grid md:grid-cols-3 gap-3 mt-6">
        <Card title="مركز التحكم (Auto/Manual)" desc="تشغيل/إيقاف كل الأنظمة + وضع تلقائي/يدوي" href="/owner/controls" />
        <Card title="صندوق المهام اليدوية" desc="موافقات/رفض/تدخلات يدوية (توثيق/تحويل/نزاعات)" href="/owner/tasks" />
        <Card title="لوحة التوثيقات (Admin)" desc="قائمة طلبات التوثيق" href="/admin/verifications" />
        <Card title="النزاعات (Admin)" desc="القاضي الإلكتروني/تحكيم" href="/admin/disputes" />
        <Card title="المالية (Admin)" desc="التوازن المالي + رسوم البوابات" href="/admin/finance" />
        <Card title="الموقع" desc="الرجوع للواجهة العامة" href="/" />
      </div>

      <div className="mt-6 rounded-2xl border p-4 bg-sky-50">
        <div className="font-bold">سياسة منع التسريب (صياغة قانونية مهذبة)</div>
        <p className="text-sm text-gray-700 mt-1">
          حرصًا على حماية حقوق الطرفين وضمان الاستلام والدفع بشكل موثّق، يُمنع تبادل وسائل التواصل أو إجراء أي اتفاقات خارج المنصة قبل إتمام الطلب.
          أي محاولة لتجاوز ذلك قد تؤدي إلى تقييد الحساب مؤقتًا أو اتخاذ إجراء وفق السياسات. التواصل والدفع داخل المنصة هو المسار الآمن والمعتمد.
        </p>
      </div>
    </div>
  );
}

function Card({ title, desc, href }: { title: string; desc: string; href: string }) {
  return (
    <Link href={href} className="block rounded-2xl border p-4 hover:bg-gray-50">
      <div className="font-bold">{title}</div>
      <div className="text-sm text-gray-600 mt-1">{desc}</div>
      <div className="text-sm text-sky-700 mt-3">فتح</div>
    </Link>
  );
}

// ASSISTANT_FINAL: true
