"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Service = {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string | null;
};

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">جميع الخدمات</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.id} className="border rounded-lg p-4 shadow">
            {service.image ? (
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-40 object-cover rounded"
              />
            ) : (
              <div className="w-full h-40 flex items-center justify-center bg-gray-200 text-gray-500">
                لا توجد صورة
              </div>
            )}
            <h2 className="text-lg font-bold mt-4">{service.title}</h2>
            <p className="text-sm text-gray-600">{service.description}</p>
            <p className="text-green-600 font-bold mt-2">{service.price} ريال</p>
            <Link
              href={`/order/new?serviceId=${service.id}`}
              className="mt-4 block bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700"
            >
              شراء الآن
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
