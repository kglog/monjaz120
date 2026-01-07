"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

function ServiceCard({ service }: { service: any }) {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-md transition bg-white">
      <Image
        src={service.image || "/default.png"}
        alt={service.title}
        width={400}
        height={200}
        className="rounded-md mb-2"
      />
      <h3 className="text-lg font-bold mb-1">{service.title}</h3>
      <p className="text-sm text-gray-600 line-clamp-2">{service.description}</p>
      <div className="flex justify-between items-center mt-3">
        <span className="text-green-600 font-bold">{service.price} ريال</span>
        <Link
          href={`/services/${service.id}`}
          className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700"
        >
          تفاصيل
        </Link>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch("/api/services");
        const data = await res.json();
        setServices(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("خطأ في جلب الخدمات", err);
        setServices([]);
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">جميع الخدمات</h1>
      {loading ? (
        <p className="text-gray-600">جاري تحميل الخدمات...</p>
      ) : services.length === 0 ? (
        <p className="text-gray-600">لا توجد خدمات حالياً</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      )}
    </main>
  );
}
