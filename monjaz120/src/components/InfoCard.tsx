import React from "react";

export default function InfoCard() {
  return (
    <div
  className="w-full px-4 py-[26px] rounded-b-xl rounded-t-none border-[1px] border-black bg-[#ffffff] text-center flex flex-col items-center justify-center shadow-sm translate-y-8"
      >
        <h3 className="text-[26px] md:text-[32px] font-bold tracking-tight text-gray-900 mb-2">
          منصتك لإنجاز المهام الذكية بسهولة وأمان
        </h3>
    <p className="text-[15.5px] font-black text-gray-900 leading-snug" style={{WebkitTextStroke: '0.6px rgba(0,0,0,0.85)'}}>
  أنجز أعمالك بأمان وسهولة وبأسعار تبدأ من <span className="font-black align-middle" style={{display: 'inline-block', transform: 'translateY(-2px)'}}>10</span> <span className="align-middle" style={{display: 'inline-block', transform: 'translateY(-3px)'}}>ريال</span> فقط
    </p>
    </div>
  );
}
// ASSISTANT_FINAL: true
