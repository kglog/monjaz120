"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function EditServiceClient() {
  const params = useSearchParams();
  const id = params.get('id');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    const fetchService = async () => {
      const res = await fetch(`/api/get-service?id=${id}`);
      const data = await res.json();
      if (data.success) {
        const s = data.service;
        setTitle(s.title);
        setDescription(s.description);
        setPrice(s.price);
        setCategory(s.category);
        setImage(s.image || '');
      }
    };

    if (id) fetchService();
  }, [id]);

  const handleUpdate = async () => {
    const res = await fetch('/api/edit-service', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        title,
        description,
        price,
        category,
        image,
      }),
    });

    const data = await res.json();

    if (data.success) {
      alert('✅ تم تعديل الخدمة بنجاح');
    } else {
      alert('❌ فشل في تعديل الخدمة');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>✏️ تعديل الخدمة</h2>
      <input type="text" value={title} placeholder="العنوان" onChange={(e) => setTitle(e.target.value)} />
      <br />
      <textarea value={description} placeholder="الوصف" onChange={(e) => setDescription(e.target.value)} />
      <br />
      <input type="text" value={price} placeholder="السعر" onChange={(e) => setPrice(e.target.value)} />
      <br />
      <input type="text" value={category} placeholder="التصنيف" onChange={(e) => setCategory(e.target.value)} />
      <br />
      <input type="text" value={image} placeholder="رابط الصورة (اختياري)" onChange={(e) => setImage(e.target.value)} />
      <br />
      <button onClick={handleUpdate}>💾 حفظ التعديلات</button>
    </div>
  );
}
// ASSISTANT_FINAL: true
// ASSISTANT_FINAL: true
