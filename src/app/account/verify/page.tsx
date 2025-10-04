use client;

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function IdentityVerification() {
  const router = useRouter();
  const [showMore, setShowMore] = useState(false);

  // خطوات التوثيق
  const steps = [
    { label: "البيانات الأساسية", icon: "📝" },
    { label: "وجه الهوية الأمامي", icon: "📄" },
    { label: "وجه الهوية الخلفي", icon: "📄" },
    { label: "رفع صورة شخصية (سيلفي)", icon: "🤳" }
  ];

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg mt-10 text-center">
      {/* شعار أو أيقونة منصتك */}
      <div className="flex justify-center mb-6">
        <div className="bg-cyan-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-3xl border-4 border-cyan-200 font-bold">
          هويتك
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-2 text-cyan-700 tracking-tight">توثيق الهوية</h2>
      <p className="mb-6 text-gray-600">لضمان موثوقية وتعامل آمن داخل المنصة، يرجى استكمال خطوات التوثيق التالية:</p>

      {/* خطوات التوثيق بشكل دائري وأيقونات حديثة */}
      <div className="flex justify-between items-center mb-8 gap-2">
        {steps.map((step, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div className={`rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold ${idx === 0 ? 'bg-cyan-600 text-white' : 'bg-cyan-100 text-cyan-700'} shadow`}>{step.icon}</div>
            <span className="mt-2 text-sm font-semibold text-cyan-700">{step.label}</span>
          </div>
        ))}
      </div>

      {/* زر البدء بالتوثيق */}
      <button
        className="w-full py-3 bg-cyan-600 text-white font-bold rounded-xl text-lg shadow hover:bg-cyan-700 transition"
        onClick={() => router.push("/account/verify/basic-info")}
      >
        ابدأ التوثيق الآن
      </button>
      <div className="mt-5">
        <button
          className="underline text-cyan-700 hover:text-cyan-900 font-semibold"
          onClick={() => setShowMore(!showMore)}
        >
          المزيد من المعلومات
        </button>
        {showMore && (
          <div className="mt-4 bg-cyan-50 border border-cyan-200 rounded-lg p-4 text-right text-sm">
            <ul className="list-disc pr-4 text-cyan-800">
              <li>توثيق الهوية يرفع مستوى الأمان والثقة في المنصة.</li>
              <li>لن يتمكن المستخدم من سحب الأرباح أو التعامل المالي إلا بعد التوثيق الكامل.</li>
              <li>جميع البيانات والصور تحفظ بشكل آمن ومشفّر.</li>
              <li>فريق الدعم متواجد لمساعدتك في أي خطوة.</li>
            </ul>
          </div>
        )}
      </div>
      <div className="mt-7 text-xs text-gray-400">منصة.كوم • جميع الحقوق محفوظة</div>
    </div>
  );
}