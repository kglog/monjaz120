"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  createdAt: string;
}

export default function ServiceDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [service, setService] = useState<Service | null>(null);

  useEffect(() => {
    async function fetchService() {
      const res = await fetch(`/api/services/${id}`);
      if (res.ok) {
        const data = await res.json();
        setService(data);
      }
    }
    fetchService();
  }, [id]);

  if (!service) {
    return <p className="text-center mt-10">جاري تحميل الخدمة...</p>;
  }

  const handleOrder = () => {
    router.push(`/order/new?serviceId=${service.id}`);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <img
        src={service.image || "/category-cover.png"}
        alt={service.title}
        className="w-full h-64 object-cover rounded-md mb-4"
      />
      <h1 className="text-2xl font-bold mb-2">{service.title}</h1>
      <p className="text-gray-600 mb-4">{service.description}</p>
      <p className="text-green-600 font-semibold mb-6">
        السعر: {service.price} ريال
      </p>
      <button
        onClick={handleOrder}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
      >
        اطلب الخدمة
      </button>
    </div>
  );
}
