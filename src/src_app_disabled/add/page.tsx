'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddServicePage() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [seller, setSeller] = useState('');
  const [image, setImage] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!title || !price || !seller) {
      alert('يرجى تعبئة جميع الحقول');
      return;
    }

    if (isNaN(Number(price))) {
      alert('السعر يجب أن يكون رقم فقط');
      return;
    }

    const newService = {
      title,
      price,
      seller,
      image,
    };

    const stored = localStorage.getItem('monjaz-services');
    const services = stored ? JSON.parse(stored) : [];

    services.push(newService);
    localStorage.setItem('monjaz-services', JSON.stringify(services));

    setMessage('✅ تم حفظ الخدمة بنجاح');
    setTitle('');
    setPrice('');
    setSeller('');
    setImage('');

    setTimeout(() => {
      router.push('/market');
    }, 1200);
  };

  return (
    <main style={{ padding: '30px', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '20px' }}>➕ إضافة خدمة جديدة</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="عنوان الخدمة"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <input
          type="text"
          placeholder="السعر"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <input
          type="text"
          placeholder="اسم البائع"
          value={seller}
          onChange={(e) => setSeller(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <input
          type="text"
          placeholder="رابط الصورة (اختياري)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <button
          type="submit"
          style={{
            width: '100%',
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '12px',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            cursor: 'pointer',
          }}
        >
          ✅ إضافة الخدمة
        </button>
      </form>
      {message && (
        <p style={{ marginTop: '20px', color: '#4CAF50', fontWeight: 'bold' }}>
          {message}
        </p>
      )}
    </main>
  );
}
