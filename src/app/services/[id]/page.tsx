export default function ServiceDetailsPage({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <div style={{ textAlign: "center" }}>
      <h1>تفاصيل الخدمة رقم: {id}</h1>
      <p>هنا بنعرض معلومات مفصلة عن الخدمة المطلوبة.</p>
      <a href="/dashboard" style={{ color: "blue", textDecoration: "underline" }}>العودة للوحة التحكم</a>
    </div>
  );
}
