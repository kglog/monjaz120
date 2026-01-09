"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import VerifySteps from "@/components/VerifySteps";
import brain from "@/core/brain";

export default function VerifyPage() {
  const params = useSearchParams();
  const status = params?.get("verifyStatus") || null;
  // 🔹 تشغيل النواة الذكية عند فتح الصفحة
  useEffect(() => {
    brain.logEvent("verify_started", { step: 1 });
  }, []);

  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">
        توثيق الهوية
      </h1>

      <p className="text-center text-gray-600 mb-8">
        لاستخدام جميع مزايا منصة.كوم مثل سحب الأرباح، يجب إكمال خطوات التوثيق.
      </p>

      {/* ✅ الخطوات */}
      <VerifySteps currentStep={1} />

      {status === "accepted" && (
        <div className="mt-6 bg-green-50 border border-green-200 text-green-800 p-4 rounded">
          تم قبول هويتك بنجاح — يمكنك الآن سحب الأرباح.
        </div>
      )}
      {status === "pending" && (
        <div className="mt-6 bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded">
          تم رفع الصور بنجاح. سيتم مراجعتها خلال 24-48 ساعة.
        </div>
      )}

  <div className="bg-white rounded-2xl shadow-md p-6 mt-8 border-2 border-black/20">
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
    </main>
  );
}

