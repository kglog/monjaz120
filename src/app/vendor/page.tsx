import Link from "next/link";

export default function VendorDashboard() {
  // هنا ممكن لاحقًا نجيب البيانات من قاعدة البيانات (مثلاً عدد الطلبات، الأرباح)
  const ordersCount = 0;
  const totalEarnings = 0;

  return (
    <div style={{ padding: "20px" }}>
      <h1>لوحة تحكم البائع</h1>

      {/* طلبات جديدة */}
      <h2>طلبات جديدة 📝</h2>
      <p>هنا يتم عرض الطلبات الجديدة 💡 (لاحقًا بنربطها مع قاعدة البيانات)</p>

      {/* خدماتك */}
      <h2>خدماتك</h2>
      <Link href="/vendor/add-service">
        <button style={{ margin: "10px 0" }}>إضافة خدمة جديدة</button>
      </Link>
      <p>هنا يتم عرض الخدمات النشطة 💡 (لاحقًا بنضيف قائمة بالخدمات المضافة)</p>

      {/* إحصائيات */}
      <h2>إحصائيات 📊</h2>
      <p>عدد الطلبات: {ordersCount}</p>
      <p>إجمالي الأرباح: {totalEarnings} ريال</p>
    </div>
  );
}
