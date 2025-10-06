"use client";

import Link from "next/link";
import VerifySteps from "@/components/VerifySteps";
import { useEffect, useState } from "react";

export default function VerifyStartPage() {
  const [lastSessionId, setLastSessionId] = useState<string | null>(null);

  useEffect(() => {
    // Check for last verification session in localStorage
    try {
      const storedSessionId = localStorage.getItem('lastVerificationSessionId');
      setLastSessionId(storedSessionId);
    } catch (err) {
      console.error('Failed to read sessionId from localStorage:', err);
    }
  }, []);
  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">
        توثيق الهوية
      </h1>

      <p className="text-center text-gray-600 mb-8">
        لإستخدام جميع مزايا منصة.كوم مثل سحب الأرباح، يجب إكمال خطوات التوثيق.
      </p>

      {/* ✅ الخطوات */}
      <VerifySteps currentStep={1} />

      <div className="bg-white rounded-2xl shadow-md p-6 mt-8">
        <p className="text-gray-700 mb-4">
          حالياً: لم يتم توثيق هويتك.  
          <br />
          ابدأ الآن بإدخال بياناتك الأساسية.
        </p>

        <Link
          href="/account/verify/basic-info"
          className="block w-full text-center bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 rounded-xl"
        >
          ابدأ التوثيق
        </Link>
      </div>

      <div className="mt-6 text-center">
        <Link href="/account/verify/more" className="text-sm text-cyan-700 hover:underline">
          المزيد من المعلومات
        </Link>
      </div>

      {/* Add status tracking button if session exists */}
      {lastSessionId && (
        <div className="bg-white rounded-2xl shadow-md p-6 mt-6">
          <p className="text-gray-700 mb-4">
            لديك طلب توثيق سابق يمكنك متابعة حالته.
          </p>
          <Link
            href={`/account/verify/status/${lastSessionId}`}
            className="block w-full text-center bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl"
          >
            متابعة حالة التوثيق
          </Link>
        </div>
      )}
    </main>
  );
}
