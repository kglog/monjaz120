'use client';

import Link from 'next/link';

export default function IdentityPage() {
  return (
    <main className='max-w-4xl mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-4'>توثيق الهوية</h1>
      <p className='mb-6'>ابدأ خطوات توثيق الهوية لتفعيل السحب والميزات.</p>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <Link href='/account/identity/basic-info' className='p-6 border rounded hover:shadow'>
          <h3 className='font-semibold'>البيانات الأساسية</h3>
          <p className='text-sm text-gray-600'>سجل اسمك وتاريخ الميلاد والجنسية.</p>
        </Link>

        <Link href='/account/identity/id-front' className='p-6 border rounded hover:shadow'>
          <h3 className='font-semibold'>رفع صورة الهوية (أمامي)</h3>
          <p className='text-sm text-gray-600'>صورة واضحة للوثيقة الأمامية.</p>
        </Link>

        <Link href='/account/identity/selfie' className='p-6 border rounded hover:shadow'>
          <h3 className='font-semibold'>سيلفي مع الوثيقة</h3>
          <p className='text-sm text-gray-600'>التقاط صورة أمامية مع الوثيقة لعملية التحقق.</p>
        </Link>
      </div>
    </main>
  );
}