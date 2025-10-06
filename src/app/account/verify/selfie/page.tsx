'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SelfiePage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    const selectedFile = e.target.files?.[0] || null;
    if (selectedFile && !selectedFile.type.startsWith('image/')) {
      setError('يرجى رفع صورة (jpeg أو png فقط)');
      setFile(null);
      return;
    }
    setFile(selectedFile);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!file) {
      setError('يرجى رفع صورة السيلفي مع الوثيقة.');
      return;
    }

    // Generate a temporary sessionId (UUID-like)
    const sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Store sessionId in localStorage
    try {
      localStorage.setItem('lastVerificationSessionId', sessionId);
    } catch (err) {
      console.error('Failed to store sessionId:', err);
    }

    // Redirect to status page with sessionId
    router.push(`/account/verify/status/${sessionId}`);
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow mt-10">
      <h2 className="text-xl font-bold mb-6 text-center text-cyan-700">
        سيلفي مع الوثيقة
      </h2>
      <div className="mb-5 p-4 bg-gray-50 border border-gray-200 rounded text-sm">
        <b>يرجى رفع صورة سيلفي مع الوثيقة.</b><br/>
        صوّر وجهك مع الوثيقة بحيث يكون الوجه واضحًا والمعالم ظاهرة.<br/>
        يجب أن تظهر الوثيقة والوجه بوضوح في نفس الصورة.<br/>
        أي صورة غير واضحة سيتم رفضها تلقائيًا.<br/>
        <hr className="my-2" />
        <b>Please upload a selfie with your document.</b><br/>
        Take a photo of your face with the document so that your face is clear and features are visible.<br/>
        Both the document and your face must be clearly visible in the same photo.<br/>
        Any unclear images will be rejected automatically.<br/>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mb-4"
        />
        {error && <div className="text-red-600 mb-4">{error}</div>}
        <button
          type="submit"
          className="w-full py-3 bg-cyan-600 text-white font-bold rounded hover:bg-cyan-700"
        >
          رفع وسجل
        </button>
      </form>
    </div>
  );
}
