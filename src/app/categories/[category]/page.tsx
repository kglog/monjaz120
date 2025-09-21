'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ServiceCard from '@/components/ServiceCard';
import axios from 'axios';

interface Service {
  _id: string;
  title: string;
  description: string;
  image?: string;
  price?: number;
  slug?: string;
  vendorName?: string;
  rating?: number;
}

export default function CategoryPage({ params }: { params?: { category?: string } }) {
  const [services, setServices] = useState<Service[]>([]);
  const fallbackParams = useParams();

  const category = decodeURIComponent(
    params?.category || fallbackParams?.category || ''
  );

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.post('/api/search', {
          searchQuery: '',
          category,
        });
        setServices(response.data.results || []);
      } catch (error) {
        console.error('فشل في جلب الخدمات:', error);
        setServices([]);
      }
    };

    if (category) {
      fetchServices();
    }
  }, [category]);

  const filtered = services.filter(
    (service) => service.category === category || category === 'الكل'
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">خدمات تصنيف: {category}</h1>
      {filtered.length === 0 ? (
        <p>لا توجد خدمات حالياً في هذا التصنيف.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))}
        </div>
      )}
    </div>
  );
}
