'use client';
import { Suspense } from 'react';
import EditServicePage from './EditServicePage';

export default function Page() {
  return (
    <Suspense fallback={<div>جاري التحميل...</div>}>
      <EditServicePage />
    </Suspense>
  );
}
