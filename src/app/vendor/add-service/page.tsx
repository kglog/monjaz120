// src/app/vendor/add-service/page.tsx

'use client';
import { useState } from 'react';

export default function AddServicePage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/add-service', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        description,
        price,
      }),
    });

    const result = await res.json();

    if (res.ok) {
      setMessage(result.message);
      setSuccess(true);
      setName('');
      setDescription('');
      setPrice('');
    } else {
      setMessage(result.message || '❌ حدث خطأ أثناء الإضافة.');
      setSuccess(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1 style={{ fontWeight: 'bold', fontSize: '1.8rem' }}>🛠️ إضافة خدمة جديدة</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <label>اسم الخدمة:</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required />

        <label>الوصف:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />

        <label>السعر:</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />

        <button type="submit">➕ إضافة</button>
      </form>

      {message && (
        <p style={{ marginTop: 20, color: success ? 'green' : 'red' }}>{message}</p>
      )}
    </div>
  );
}
