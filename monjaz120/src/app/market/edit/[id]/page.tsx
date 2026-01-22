
'use client';
import React from "react";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function EditServicePage() {
  const { id } = useParams();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [seller, setSeller] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('');
  const [rating, setRating] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('monjaz-services');
    const all = stored ? JSON.parse(stored) : [];
    const current = all[parseInt(id as string)];
    if (!current) return;

    setTitle(current.title || '');
    setPrice(current.price || '');
    setSeller(current.seller || '');
    setCategory(current.category || '');
    setImage(current.image || '');
    setDescription(current.description || '');
    setTime(current.time || '');
    setRating(current.rating || '');
  }, [id]);

  const handleUpdate = () => {
    const stored = localStorage.getItem('monjaz-services');
    const all = stored ? JSON.parse(stored) : [];

    all[parseInt(id as string)] = {
      title,
      price,
      seller,
      category,
      image,
      description,
      time,
      rating,
    };

    localStorage.setItem('monjaz-services', JSON.stringify(all));
    alert('✅ تم حفظ التعديلات!');
    router.push('/market');
  };

  const handleDelete = () => {
    const stored = localStorage.getItem('monjaz-services');
    const all = stored ? JSON.parse(stored) : [];

    all.splice(parseInt(id as string), 1);
    localStorage.setItem('monjaz-services', JSON.stringify(all));
    alert('🗑️ تم حذف الخدمة!');
    router.push('/market');
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    margin: '10px 0',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '16px',
    direction: 'rtl' as const,
  };

  const buttonStyle = {
    width: '100%',
    padding: '14px',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '12px',
  };

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto', textAlign: 'right' }}>
      <h2>🛠️ تعديل الخدمة</h2>

      <input style={inputStyle} placeholder="عنوان الخدمة" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input style={inputStyle} placeholder="السعر" value={price} onChange={(e) => setPrice(e.target.value)} />
      <input style={inputStyle} placeholder="اسم البائع" value={seller} onChange={(e) => setSeller(e.target.value)} />
      <input style={inputStyle} placeholder="التصنيف" value={category} onChange={(e) => setCategory(e.target.value)} />
      <input style={inputStyle} placeholder="رابط الصورة" value={image} onChange={(e) => setImage(e.target.value)} />
      <input style={inputStyle} placeholder="وصف الخدمة" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input style={inputStyle} placeholder="مدة التسليم (مثال: 3 أيام)" value={time} onChange={(e) => setTime(e.target.value)} />
      <input style={inputStyle} placeholder="تقييم الخدمة (مثال: 4.5)" value={rating} onChange={(e) => setRating(e.target.value)} />

      <button
        onClick={handleUpdate}
        style={{ ...buttonStyle, backgroundColor: '#007bff' }}
      >
        ✅ حفظ التعديلات
      </button>

      <button
        onClick={handleDelete}
        style={{ ...buttonStyle, backgroundColor: '#dc3545' }}
      >
        🗑️ حذف الخدمة
      </button>
    </div>
  );
}
