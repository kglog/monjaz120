import Link from "next/link";

export default function VendorDashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>لوحة تحكم البائع</h1>

      {/* خدماتك */}
      <h2>خدماتك</h2>
      <Link href="/vendor/add-service">
        <button>إضافة خدمة جديدة</button>
      </Link>
      <p>هنا يتم عرض الخدمات النشطة 💡</p>

      {/* إحصائيات */}
      <h2>إحصائيات 📊</h2>
      <p>عدد الطلبات: 0</p>
      <p>إجمالي الأرباح: 0 ريال</p>
    </div>
  );
}
