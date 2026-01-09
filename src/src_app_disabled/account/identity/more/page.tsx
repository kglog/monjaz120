'use client';

export default function IdentityMore() {
  return (
    <main className='max-w-4xl mx-auto p-6'>
      <h2 className='text-xl font-semibold mb-4'>المزيد</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='p-6 border rounded'>
          <h3 className='font-semibold'>البريد الإلكتروني</h3>
          <p className='text-sm text-gray-600'>عناوين البريد المرتبطة.</p>
        </div>
        <div className='p-6 border rounded'>
          <h3 className='font-semibold'>البطاقات</h3>
          <p className='text-sm text-gray-600'>تحكم في البطاقات المرتبطة.</p>
        </div>
      </div>
    </main>
  );
}