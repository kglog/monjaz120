"use client";
import { useParams } from "next/navigation";

const services = [
  {
    id: "1",
    title: "تصميم شعار احترافي",
    description: "خدمة تصميم شعار مميز يعكس هوية مشروعك.",
    price: 50,
    rating: 4.9,
    seller: "أحمد الزهراني",
  },
  {
    id: "2",
    title: "تحليل بيانات باستخدام الذكاء الاصطناعي",
    description: "استخدام أدوات الذكاء الاصطناعي لاستخراج أنماط وتقارير من بياناتك.",
    price: 100,
    rating: 4.8,
    seller: "نورة العبدالله",
  },
];

export default function ServiceDetails() {
  const params = useParams();
  const service = services.find((s) => s.id === params?.id);

  if (!service) return <p className="p-6">الخدمة غير موجودة</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-2">{service.title}</h1>
      <p className="text-gray-600 mb-4">{service.description}</p>
      <p className="text-lg font-semibold text-green-600">السعر: {service.price} ريال</p>
      <p className="text-yellow-600">التقييم: ⭐ {service.rating}</p>
      <p className="text-gray-700 mt-2">البائع: {service.seller}</p>

      <button className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded">
        اطلب الخدمة الآن
      </button>
    </div>
  );
}
