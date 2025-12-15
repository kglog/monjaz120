"use client";
import React, { useState } from "react";
import { CATEGORY_MAP } from '@/lib/categoryData';

export default function AddServicePage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [mainCategory, setMainCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
        category: mainCategory,
        subcategory: subCategory,
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
        <label>التصنيف الرئيسي</label>
        <br />
        <select value={mainCategory} onChange={(e) => { setMainCategory(e.target.value); setSubCategory(''); }}>
          <option value="">-- اختر التصنيف --</option>
          {Object.values(CATEGORY_MAP).map((c) => (
            <option key={c.key} value={c.key}>{c.title}</option>
          ))}
        </select>
        <br />
        <label>التصنيف الفرعي</label>
        <br />
        <select value={subCategory} onChange={(e) => setSubCategory(e.target.value)} disabled={!mainCategory}>
          <option value="">-- اختر التصنيف الفرعي --</option>
          {mainCategory && CATEGORY_MAP[mainCategory]?.subcategories.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <br />
        <input type="text" placeholder="رابط الصورة (مؤقتًا)" value={image} onChange={(e) => setImage(e.target.value)} />
        <br />
        <button type="submit">نشر الخدمة</button>
      </form>
    </div>
  );
}

// ASSISTANT_FINAL: true
