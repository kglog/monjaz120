import React from "react";

const ServiceTypeSlider = () => {
  return (
    <div className="py-10">
      <h2 className="text-center text-xl font-bold mb-6">
        اختر نوع الخدمة اللي تحتاجها
      </h2>
      <div className="flex overflow-x-auto gap-4 px-4 pb-4 scroll-smooth">
        {[
          { label: "تصميم", desc: "تصميم شعارات وهويات بصرية", icon: "🎨" },
          { label: "تشغيل", desc: "مهام وصيانة للأنظمة", icon: "🛠️" },
          { label: "ذكاء اصطناعي", desc: "تحليلات، أدوات، أتمتة", icon: "🤖" },
          { label: "استشارات", desc: "بيانات، استشارات تسويقية", icon: "📊" },
          { label: "تسويق ذكي", desc: "نمو وتحليل الجمهور", icon: "📣" },
          { label: "برمجة", desc: "مواقع وسكربتات ذكية", icon: "💻" },
          { label: "حلول جاهزة", desc: "ملفات وأدوات فورية", icon: "📦" },
        ].map((item, idx) => (
          <div
            key={idx}
            className="min-w-[200px] bg-white border border-gray-300 rounded-xl shadow-md p-4 flex-shrink-0"
            style={{
              backgroundImage:
                idx % 2 === 0
                  ? "url('/paper-left.png')"
                  : "url('/paper-right.png')",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="text-3xl mb-2">{item.icon}</div>
            <h3 className="font-bold text-lg">{item.label}</h3>
            <p className="text-sm text-gray-500">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceTypeSlider;
