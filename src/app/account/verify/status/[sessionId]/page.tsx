'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function VerifyStatusPage() {
  const params = useParams();
  const sessionId = params.sessionId as string;
  const [status, setStatus] = useState<string>('loading');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!sessionId) return;

    // Fetch status from API
    fetch(`/api/identity/status/${sessionId}`)
      .then(res => res.json())
      .then(data => {
        if (data.ok) {
          setStatus(data.status);
        } else {
          setError('فشل في تحميل حالة التوثيق');
          setStatus('error');
        }
      })
      .catch(() => {
        setError('حدث خطأ أثناء تحميل حالة التوثيق');
        setStatus('error');
      });
  }, [sessionId]);

  const getStatusDisplay = () => {
    switch (status) {
      case 'pending':
        return {
          text: 'قيد المراجعة',
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200'
        };
      case 'approved':
        return {
          text: 'تم الموافقة',
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200'
        };
      case 'rejected':
        return {
          text: 'مرفوض',
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200'
        };
      case 'loading':
        return {
          text: 'جاري التحميل...',
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200'
        };
      default:
        return {
          text: 'غير معروف',
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200'
        };
    }
  };

  const statusDisplay = getStatusDisplay();

  return (
    <main className='max-w-2xl mx-auto p-6'>
      <h2 className='text-xl font-semibold mb-4'>حالة التوثيق</h2>
      
      {error && (
        <div className='p-4 mb-4 bg-red-50 border border-red-200 rounded text-red-600'>
          {error}
        </div>
      )}

      <div className='mb-4'>
        <p className='text-sm text-gray-600'>
          رقم الجلسة: <span className='font-mono text-xs'>{sessionId}</span>
        </p>
      </div>

      <p className='text-sm text-gray-600 mb-4'>
        النتيجة: <strong className={statusDisplay.color}>{statusDisplay.text}</strong>
      </p>

      <div className={`p-4 border rounded ${statusDisplay.bgColor} ${statusDisplay.borderColor}`}>
        {status === 'pending' && (
          <p>تفاصيل المراجعة ستظهر هنا مع نتيجة OCR ودرجة التحقق. جاري المراجعة...</p>
        )}
        {status === 'approved' && (
          <p>تم الموافقة على طلب التوثيق. يمكنك الآن استخدام جميع مزايا المنصة.</p>
        )}
        {status === 'rejected' && (
          <p>تم رفض طلب التوثيق. يرجى مراجعة البيانات المرسلة والمحاولة مرة أخرى.</p>
        )}
        {status === 'loading' && (
          <p>جاري تحميل حالة التوثيق...</p>
        )}
      </div>

      <div className='mt-6'>
        <Link
          href='/account/verify'
          className='inline-block bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700'
        >
          العودة إلى التوثيق
        </Link>
      </div>
    </main>
  );
}
