'use client';

import { useState } from 'react';

export default function IdFront() {
  const [fileName, setFileName] = useState('');
  return (
    <main className='max-w-2xl mx-auto p-6'>
      <h2 className='text-xl font-semibold mb-4'>رفع الوجه الأمامي للهوية</h2>
      <p className='text-sm text-gray-600 mb-4'>ارفع صورة واضحة للوجه الأمامي للوثيقة.</p>
      <input type='file' onChange={e => setFileName(e.target.files?.[0]?.name ?? '')} />
      <div className='mt-4'>
        <button className='bg-blue-600 text-white px-4 py-2 rounded'>رفع</button>
      </div>
      {fileName && <p className='mt-3 text-sm'>تم اختيار: {fileName}</p>}
    </main>
  );
}