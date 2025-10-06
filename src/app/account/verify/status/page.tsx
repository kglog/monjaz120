"use client";

import Link from "next/link";
import VerifySteps from "@/components/VerifySteps";

export default function VerifyStatusPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">
        حالة التوثيق
      </h1>

      <p className="text-center text-gray-600 mb-8">
        شكراً لإكمال خطوات التوثيق. طلبك قيد المراجعة.
      </p>

      {/* ✅ الخطوات */}
      <VerifySteps currentStep={4} />

      <div className="bg-white rounded-2xl shadow-md p-6 mt-8 border !border-black border-[1px]">
        <div className="text-center">
          <p className="text-gray-700 text-lg mb-4">
            <span className="text-green-600 font-bold">تم استلام مستندات التوثيق بنجاح ✅</span>
          </p>
          <p className="text-gray-700 mb-4">
            طلبك الآن قيد المراجعة. سنبلغك فور اكتمال التحقق.
          </p>
        </div>

        <div className="mt-6 flex gap-4 justify-center">
          <Link
            href="/account"
            className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-xl transition"
          >
            العودة للحساب
          </Link>
          <Link
            href="/account/verify"
            className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-xl transition"
          >
            صفحة التوثيق
          </Link>
        </div>
      </div>
    </main>
  );
}
