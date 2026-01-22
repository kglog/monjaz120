
'use client';
import React from "react";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EditServicePage() {
  const router = useRouter();
  const [id, setId] = useState<number>(0);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [seller, setSeller] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('');
  const [rating, setRating] = useState('');

  useEffect(() => {
    const url = window.location.pathname;
    const match = url.match(/\/edit\/(\d+)/);
    const parsedId = match ? parseInt(match[1]) : 0;
    setId(parsedId);

    const stored = localStorage.getItem('monjaz-services');
    const all = stored ? JSON.parse(stored) : [];
    const current = all[parsedId];

    if (current) {
      setTitle(current.title || '');
      setPrice(current.price || '');
      setSeller(current.seller || '');
      setCategory(current.category || '');
      setImage(current.image || '');
      setDescription(current.description || '');
      setTime(current.time || '');
      setRating(current.rating || '');
    }
  }, []);

  const handleUpdate = () => {
    const stored = localStorage.getItem('monjaz-services');
    const all = stored ? JSON.parse(stored) : [];

    all[id] = {
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
    alert('✅ تم حفظ التعديلات');
    router.push('/market');
  };

  const handleDelete = () => {
    const stored = localStorage.getItem('monjaz-services');
    const all = stored ? JSON.parse(stored) : [];
    all.splice(id, 1);
    localStorage.setItem('monjaz-services', JSON.stringify(all));
    alert('🗑️ تم حذف الخدمة');
    router.push('/market');
  };

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: 24, border: '1px solid #ddd', borderRadius: 12 }}>
      <h2 style={{ textAlign: 'center', marginBottom: 24 }}>🛠️ تعديل الخدمة</h2>

      <label style={labelStyle}>عنوان الخدمة</label>
      <input style={inputStyle} value={title} onChange={(e) => setTitle(e.target.value)} />

      <label style={labelStyle}>السعر</label>
      <input style={inputStyle} value={price} onChange={(e) => setPrice(e.target.value)} />

      <label style={labelStyle}>اسم البائع</label>
      <input style={inputStyle} value={seller} onChange={(e) => setSeller(e.target.value)} />

      <label style={labelStyle}>التصنيف</label>
      <input style={inputStyle} value={category} onChange={(e) => setCategory(e.target.value)} />

      <label style={labelStyle}>رابط الصورة</label>
      <input style={inputStyle} value={image} onChange={(e) => setImage(e.target.value)} />

      <label style={labelStyle}>وصف الخدمة</label>
      <input style={inputStyle} value={description} onChange={(e) => setDescription(e.target.value)} />

      <label style={labelStyle}>مدة التسليم</label>
      <input style={inputStyle} value={time} onChange={(e) => setTime(e.target.value)} />

      <label style={labelStyle}>التقييم</label>
      <input style={inputStyle} value={rating} onChange={(e) => setRating(e.target.value)} />

      <button onClick={handleUpdate} style={{ ...buttonStyle, backgroundColor: '#007bff' }}>
        ✅ حفظ التعديلات
      </button>

      <button onClick={handleDelete} style={{ ...buttonStyle, backgroundColor: '#dc3545' }}>
        🗑️ حذف الخدمة
      </button>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '12px',
  marginBottom: '16px',
  borderRadius: '8px',
  border: '1px solid #ccc',
  fontSize: '16px',
};

const labelStyle = {
  fontWeight: 'bold',
  marginBottom: '6px',
  display: 'block',
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
