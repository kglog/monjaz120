'use client';

import { useState } from 'react';

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
            marginTop: '5px',
            marginBottom: '10px',
          }}
        />
      </div>

      <button
        onClick={handleSave}
        style={{
          padding: '10px 20px',
          background: '#4caf50',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          fontSize: '16px',
          cursor: 'pointer',
        }}
      >
        ✅ حفظ الاسم
      </button>

      {message && (
        <p style={{ marginTop: '20px', color: '#333' }}>{message}</p>
      )}
    </main>
  );
}
