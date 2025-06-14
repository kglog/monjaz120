import React, { Suspense } from 'react';
import EditServicePage from './EditServicePage';

export default function PageWrapper() {
  return (
    <Suspense fallback={<div>جاري تحميل الصفحة...</div>}>
      <EditServicePage />
    </Suspense>
  );
}
