'use client';

export default function IdentityStatus() {
  return (
    <main className='max-w-2xl mx-auto p-6'>
      <h2 className='text-xl font-semibold mb-4'>حالة التوثيق</h2>
      <p className='text-sm text-gray-600 mb-4'>النتيجة: <strong className='text-yellow-600'>قيد المراجعة</strong></p>
      <div className='p-4 border rounded'>
        <p>تفاصيل المراجعة ستظهر هنا مع نتيجة OCR ودرجة التحقق.</p>
      </div>
    </main>
  );
}