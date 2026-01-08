import React from "react";
import Image from "next/image";

const articles = [
  { title: "خمس نصائح لشعار لا يُنسى", img: "/placeholders/a1.png" },
  { title: "كيف تبرز على السوشيال بدون إعلانات", img: "/placeholders/a2.png" },
  { title: "هوية متسقة = مبيعات أعلى", img: "/placeholders/a3.png" },
  { title: "دليل المبتدئ لـ UI/UX", img: "/placeholders/a4.png" },
];

export default function ArticlesRow() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {articles.map((a, i) => (
        <div key={i} className="rounded-2xl overflow-hidden border-2 border-black/80 bg-white">
          <div className="relative h-40">
            {/* ضع صورك لاحقًا */}
            <Image src={a.img} alt={a.title} fill className="object-cover" />
          </div>
          <div className="p-3 font-medium text-gray-900">{a.title}</div>
        </div>
      ))}
    </div>
  );
}
