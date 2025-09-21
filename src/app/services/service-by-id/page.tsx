'use client';
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

interface Service {
  _id: string;
  title: string;
  description: string;
  image?: string;
  price?: number;
  slug?: string;
}

export default function ServiceDetailsPage() {
  const params = useParams();
  const [service, setService] = useState<Service | null>(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axios.get(`/api/services/${params.slug}`);
        setService(response.data.service);
      } catch (error) {
        console.error("فشل في جلب الخدمة:", error);
      }
    };

    fetchService();
  }, [params.slug]);

  if (!service) return <p className="p-6">جاري تحميل الخدمة...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">{service.title}</h1>
      <img
        src={service.image || "/no-image.png"}
        alt={service.title}
        className="w-full h-64 object-cover rounded mb-4"
      />
      <p className="mb-4">{service.description || "لا يوجد وصف"}</p>
      <p className="font-bold">السعر: {service.price ?? 0} ريال</p>
      <button className="mt-6 bg-primary text-white px-4 py-2 rounded">اطلب الخدمة</button>
    </div>
  );
}
