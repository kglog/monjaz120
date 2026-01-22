import React from "react";
import { Star } from "lucide-react";

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  rating?: number; // ممكن يكون undefined
  seller: string;
  image: string;
}

export default function ServiceCard({ id, title, description, price, rating, seller, image }: ServiceCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
      {/* صورة الخدمة */}
      <img src={image} alt={title} className="w-full h-40 object-cover rounded-md mb-3" />

      {/* العنوان */}
      <h3 className="text-lg font-semibold">{title}</h3>

      {/* الوصف */}
      <p className="text-sm text-gray-600 mb-2">{description}</p>

      {/* السعر */}
      <p className="text-blue-600 font-bold">{price} ريال</p>

      {/* التقييم */}
      <div className="flex items-center mt-2">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < Math.round(rating ?? 0) ? "fill-current text-yellow-500" : "text-gray-300"}`}
          />
        ))}
        <span className="ms-1 text-sm text-gray-600">
          {rating?.toFixed(1) ?? "0.0"}
        </span>
      </div>

      {/* البائع */}
      <p className="text-xs text-gray-500 mt-1">البائع: {seller}</p>

      {/* زر التفاصيل */}
      <a
        href={`/services/${id}`}
        className="block text-center bg-blue-500 text-white text-sm rounded-md py-2 mt-3 hover:bg-blue-600"
      >
        عرض التفاصيل
      </a>
    </div>
  );
}
