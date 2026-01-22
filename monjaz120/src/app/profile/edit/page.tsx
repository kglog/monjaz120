'use client';
import React, { useState } from "react";

export default function EditProfilePage() {
  const [newName, setNewName] = useState('');
  const [message, setMessage] = useState('');

  const handleSave = () => {
    if (!newName) {
      setMessage('❌ يرجى كتابة الاسم أولًا');
      return;
    }
    localStorage.setItem('monjaz-username', newName);
    setMessage('✅ تم حفظ الاسم بنجاح');
  };

  return (
    <main style={{ padding: '30px' }}>
      <h1>✏️ تعديل الملف الشخصي</h1>
      <div style={{ marginTop: '20px' }}>
        <label>الاسم الجديد:</label>
        <br />
        <input
          type="text"
          placeholder="اكتب الاسم الجديد هنا"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '16px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            marginBottom: '10px',
          }}
        />
        <button
          onClick={handleSave}
          style={{
            background: '#2563eb',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          حفظ
        </button>
        {message && <div style={{ marginTop: '10px', color: '#2563eb' }}>{message}</div>}
      </div>
    </main>
  );
}
