import ServiceCard from "@/components/ServiceCard";

const services = [
  {
    id: "auto-reply-bot",
    title: "روبوت رد تلقائي للعملاء",
    seller: "نورة العبدالله",
    price: 75,
    rating: 4.5,
    badge: "الأكثر طلبًا",
  },
  {
    id: "data-analysis-ai",
    title: "تحليل بيانات باستخدام الذكاء الاصطناعي",
    seller: "أحمد الزهراني",
    price: 100,
    rating: 4.8,
    badge: "مميز",
  },
];

export default function AIPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">خدمات الذكاء الاصطناعي 🤖</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <ServiceCard key={s.id} {...s} />
        ))}
      </div>
    </div>
  );
}
