'use client';

export default function ConfirmButton({ serviceId }: { serviceId: string }) {
  const handleRequest = async () => {
    try {
      const res = await fetch('/api/service-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          serviceId,
          userId: '64884fcadadb30db0a57db9e', // استبدل هذا بـ ID المستخدم الحقيقي إذا عندك نظام تسجيل
        }),
      });

      const data = await res.json();
      if (data.success) {
        alert('✅ تم إرسال الطلب بنجاح!');
      } else {
        alert('❌ فشل في إرسال الطلب!');
      }
    } catch (error) {
      console.error('فشل في تنفيذ الطلب:', error);
      alert('⚠️ حدث خطأ غير متوقع!');
    }
  };

  return (
    <button onClick={handleRequest} className="mt-4 px-4 py-2 bg-black text-white rounded">
      🛒 تأكيد طلب الخدمة
    </button>
  );
}
