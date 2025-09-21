'use client';

import { useEffect, useState } from "react";
import ServiceCard from "@/components/ServiceCard";

interface Service {
  _id: string;
  title: string;
  description: string;
  price: number;
  image?: string;
  slug?: string;
}

export default function ClientCategoryView({ category }: { category: string }) {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("/api/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ category }),
        });

        const data = await res.json();
        if (data.status === "success") {
          setServices(data.results);
        } else {
          console.error("فشل البحث:", data.message);
        }
      } catch (err) {
        console.error("خطأ أثناء جلب البيانات:", err);
      }
    };

    fetchServices();
  }, [category]);

  return (
    <section className="p-4">
      <h1 className="text-2xl font-bold mb-4">خدمات {category}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {services.map((service) => (
          <ServiceCard key={service._id} service={service} />
        ))}
      </div>
    </section>
  );
}
