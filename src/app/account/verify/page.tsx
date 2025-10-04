"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function VerifyPage() {
  const router = useRouter();
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  const verificationSteps = [
    {
      id: 1,
      title: "البيانات الأساسية",
      icon: "📝",
      description: "الاسم الكامل ورقم الهوية",
    },
    {
      id: 2,
      title: "وجه الهوية الأمامي",
      icon: "🪪",
      description: "صورة واضحة للوجه الأمامي",
    },
    {
      id: 3,
      title: "وجه الهوية الخلفي",
      icon: "📇",
      description: "صورة واضحة للوجه الخلفي",
    },
    {
      id: 4,
      title: "صورة شخصية (سيلفي)",
      icon: "🤳",
      description: "صورة سيلفي واضحة",
    },
  ];

  const benefits = [
    {
      icon: "🛡️",
      title: "حماية الحساب",
      description: "توثيق هويتك يحمي حسابك من الاختراق والاستخدام غير المصرح به",
    },
    {
      icon: "✅",
      title: "الموثوقية",
      description: "زيادة ثقة العملاء والبائعين معك وتحسين فرص القبول في الخدمات",
    },
    {
      icon: "🔐",
      title: "الأمان",
      description: "بياناتك محمية بأعلى معايير الأمان والتشفير ولن تُشارك مع أي طرف ثالث",
    },
    {
      icon: "⚡",
      title: "سرعة المعاملات",
      description: "الحسابات الموثقة تحصل على أولوية في المعاملات والدعم الفني",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-sky-50">
      {/* Header Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-4xl">🔐</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            توثيق الهوية
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            وثّق هويتك الآن لتحصل على حساب موثوق وآمن يمنحك المزيد من المميزات والثقة في المنصة
          </p>
        </div>

        {/* Steps Section */}
        <div className="max-w-5xl mx-auto mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-10">
            خطوات التوثيق السريعة
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {verificationSteps.map((step, index) => (
              <div
                key={step.id}
                className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Step Number Badge */}
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                  {step.id}
                </div>
                
                {/* Icon Circle */}
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-4xl">{step.icon}</span>
                </div>
                
                {/* Title */}
                <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">
                  {step.title}
                </h3>
                
                {/* Description */}
                <p className="text-sm text-gray-600 text-center leading-relaxed">
                  {step.description}
                </p>

                {/* Connection Line (Desktop only) */}
                {index < verificationSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/3 -right-6 w-6 h-0.5 bg-gradient-to-r from-cyan-300 to-blue-300"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action Button */}
        <div className="text-center mb-12">
          <button
            onClick={() => router.push("/account/verify/basic-info")}
            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-xl font-bold rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <span>ابدأ التوثيق الآن</span>
            <span className="text-2xl">🚀</span>
          </button>
          <p className="mt-4 text-sm text-gray-600">
            ⏱️ العملية تستغرق أقل من 5 دقائق
          </p>
        </div>

        {/* More Information Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <button
              onClick={() => setShowMoreInfo(!showMoreInfo)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-cyan-700 font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300"
            >
              <span>المزيد من المعلومات</span>
              <span className={`transform transition-transform duration-300 ${showMoreInfo ? 'rotate-180' : ''}`}>
                ⬇️
              </span>
            </button>
          </div>

          {showMoreInfo && (
            <div className="bg-white rounded-2xl p-8 shadow-xl animate-fade-in">
              <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
                لماذا يجب عليك توثيق هويتك؟
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex gap-4 p-4 rounded-xl bg-gradient-to-br from-cyan-50 to-blue-50 hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                        <span className="text-2xl">{benefit.icon}</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-2">
                        {benefit.title}
                      </h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-cyan-100 to-blue-100 rounded-xl p-6 border-r-4 border-cyan-600">
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">ℹ️</span>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2">
                      سرية وأمان المعلومات
                    </h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      نحن نلتزم بحماية خصوصيتك وبياناتك الشخصية. جميع المعلومات التي تقدمها يتم تشفيرها وحفظها بشكل آمن وفقاً لأعلى معايير الأمان الدولية. لن نشارك بياناتك مع أي جهة خارجية دون موافقتك الصريحة.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Additional Features */}
        <div className="max-w-4xl mx-auto mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-6 bg-white rounded-xl shadow-md">
              <div className="text-4xl mb-3">⚡</div>
              <h4 className="font-bold text-gray-800 mb-2">سريع وسهل</h4>
              <p className="text-sm text-gray-600">خطوات بسيطة وواضحة</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-md">
              <div className="text-4xl mb-3">🔒</div>
              <h4 className="font-bold text-gray-800 mb-2">آمن 100%</h4>
              <p className="text-sm text-gray-600">تشفير عالي المستوى</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-md">
              <div className="text-4xl mb-3">📱</div>
              <h4 className="font-bold text-gray-800 mb-2">متوافق مع الجوال</h4>
              <p className="text-sm text-gray-600">يعمل على جميع الأجهزة</p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}