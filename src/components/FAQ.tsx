import React from "react";
export default function FAQ() {
  return (
    <section className="my-12">
      <h2 className="text-2xl font-bold mb-4 text-center">الأسئلة الشائعة</h2>
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold">كيف أطلب خدمة؟</h3>
          <p className="text-gray-600">اختر الخدمة التي تناسبك واضغط زر "اطلب الآن".</p>
        </div>
        <div>
          <h3 className="font-semibold">كيف أضمن حقوقي؟</h3>
          <p className="text-gray-600">الدفع يتم عبر المنصة ولا يتم تسليمه للبائع حتى تأكيد استلامك للخدمة.</p>
        </div>
        <div>
          <h3 className="font-semibold">هل أقدر أسترجع فلوسي؟</h3>
          <p className="text-gray-600">نعم، في حال لم يتم تنفيذ الخدمة أو حدث خلاف يتم استرجاع المبلغ حسب سياسة المنصة.</p>
        </div>
      </div>
    </section>
  );
}
