'use client';

import React, { useState } from 'react';

export default function AddServicePage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [featured, setFeatured] = useState(false); // ✅ جديد

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newService = {
      title,
      description,
      category,
      price,
      image,
      featured, // ✅ نضيفها للتخزين
    };

    const existing = localStorage.getItem('services');
    const all = existing ? JSON.parse(existing) : [];
    all.push(newService);
    localStorage.setItem('services', JSON.stringify(all));

    alert('✅ تم حفظ الخدمة مؤقتاً بنجاح!');

    // تصفير
    setTitle('');
    setDescription('');
    setCategory('');
    setPrice('');
    setImage(null);
    setFeatured(false);
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>➕ إضافة خدمة جديدة</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input type="text" placeholder="عنوان الخدمة" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="وصف مختصر" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
          <option value="">اختر الفئة</option>
          <option value="تصميم">تصميم</option>
          <option value="كتابة">كتابة</option>
          <option value="برمجة">برمجة</option>
          <option value="ترجمة">ترجمة</option>
        </select>
        <input type="number" placeholder="السعر (ريال)" value={price} onChange={(e) => setPrice(e.target.value)} required />

        <input type="file" accept="image/*" onChange={handleImageChange} />
        {image && <img src={image} alt="معاينة" style={{ width: 100, height: 'auto' }} />}

        {/* ✅ خيار مميز */}
        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
          اجعل هذه الخدمة <strong>💎 مميزة</strong>
        </label>

        <button type="submit" style={{
          backgroundColor: '#0070f3',
          color: '#fff',
          padding: '10px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          نشر الخدمة
        </button>
      </form>
    </div>
  );
}
