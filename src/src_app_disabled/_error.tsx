import React from "react";
// ASSISTANT_FINAL: true
export default function ErrorPage({ error }: { error: Error }) {
  return (
    <main style={{ padding: 40, textAlign: 'center' }}>
      <h1 style={{ fontSize: 32, color: '#d00' }}>حدث خطأ في الصفحة</h1>
      <p style={{ marginTop: 20 }}>{error?.message || "حدث خطأ غير متوقع."}</p>
      <a href="/" style={{ color: '#0070f3', marginTop: 30, display: 'inline-block' }}>العودة للصفحة الرئيسية</a>
    </main>
  );
}
