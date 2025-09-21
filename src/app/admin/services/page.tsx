"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      const res = await fetch("/api/admin/services");
      if (res.ok) {
        const data = await res.json();
        setServices(data);
      }
    };
    fetchServices();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف الخدمة؟")) return;
    const res = await fetch(`/api/admin/services/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setServices((prev) => prev.filter((s) => s.id !== id));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6">قائمة الخدمات</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="border rounded-lg shadow p-4 flex flex-col justify-between"
          >
            {service.image ? (
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-40 object-cover rounded mb-3"
              />
            ) : (
              <div className="w-full h-40 flex items-center justify-center bg-gray-200 rounded mb-3 text-gray-500">
                لا توجد صورة
              </div>
            )}
            <h2 className="font-bold">{service.title}</h2>
            <p className="text-gray-600">{service.description}</p>
            <p className="text-green-600 font-bold">السعر: {service.price} ريال</p>
            <p className="text-sm text-gray-500">
              أضيف بتاريخ: {new Date(service.createdAt).toLocaleDateString("ar-SA")}
            </p>
            <div className="flex gap-2 mt-3">
              <Link
                href={`/admin/services/${service.id}`}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                تعديل
              </Link>
              <button
                onClick={() => handleDelete(service.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
