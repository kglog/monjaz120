'use client';

import { useState } from 'react';

export default function BasicInfo() {
  const [form, setForm] = useState({ firstName:'', lastName:'', country:'', dob:'' });

  return (
    <main className='max-w-2xl mx-auto p-6'>
      <h2 className='text-xl font-semibold mb-4'>البيانات الأساسية</h2>
      <form className='space-y-4'>
        <input placeholder='الاسم' className='w-full p-3 border rounded' />
        <input placeholder='اسم العائلة' className='w-full p-3 border rounded' />
        <input placeholder='تاريخ الميلاد' className='w-full p-3 border rounded' />
        <select className='w-full p-3 border rounded'>
          <option>السعودية</option>
          <option>الإمارات</option>
        </select>
        <div className='flex gap-3'>
          <button className='bg-blue-600 text-white px-4 py-2 rounded'>التالي</button>
        </div>
      </form>
    </main>
  );
}