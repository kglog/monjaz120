'use client';

import { useState } from 'react';

export default function Selfie() {
  const [fileName, setFileName] = useState('');
  return (
    <main className='max-w-2xl mx-auto p-6'>
      <h2 className='text-xl font-semibold mb-4'>سيلفي مع الوثيقة</h2>
      <p className='text-sm text-gray-600'>صوّر وجهك مع الوثيقة بحيث يكون الوجه واضحًا والمعالم ظاهرة.</p>
      <input type='file' onChange={e => setFileName(e.target.files?.[0]?.name ?? '')} />
      <div className='mt-4'>
        <button className='bg-blue-600 text-white px-4 py-2 rounded'>رفع وسجل</button>
      </div>
    </main>
  );
}