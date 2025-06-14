'use client';

import { useState } from 'react';

export default function AddServicePage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const vendorId = '64884fcadadb30db0a57db9e'; // هذا id البائع من MongoDB

    const res = await fetch('/api/add-service', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
        price,
        category,
        image,
        vendorId,
      }),
    });

    const data = await res.json();

    if (data.success) {
      alert('✅ تم إضافة الخدمة بنجاح');
      setTitle('');
      setDescription('');
      setPrice('');
      setCategory('');
      setImage('');
    } else {
      alert('❌ فشل في إضافة الخدمة');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🆕 إضافة خدمة جديدة</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="عنوان الخدمة" value={title} onChange={(e) => setTitle(e.target.value)} />
        <br />
        <textarea placeholder="وصف" value={description} onChange={(e) => setDescription(e.target.value)} />
        <br />
        <input type="text" placeholder="السعر" value={price} onChange={(e) => setPrice(e.target.value)} />
        <br />
        <input type="text" placeholder="التصنيف" value={category} onChange={(e) => setCategory(e.target.value)} />
        <br />
        <input type="text" placeholder="رابط الصورة (مؤقتًا)" value={image} onChange={(e) => setImage(e.target.value)} />
        <br />
        <button type="submit">نشر الخدمة</button>
      </form>
    </div>
  );
}
