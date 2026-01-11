import { Suspense } from "react";
import ServiceClient from "./ServiceClient";

export default function ServiceDetailsPage() {
  return (
    <Suspense fallback={<p className="p-6">⏳ جاري تحميل الخدمة...</p>}>
      <ServiceClient />
    </Suspense>
  );
}
// ASSISTANT_FINAL: true
