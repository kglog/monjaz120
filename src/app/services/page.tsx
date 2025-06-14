// src/app/services/page.tsx
import Service from '@/models/Service';
import connectDB from '@/lib/mongodb';
import Link from 'next/link';

export default async function AllServicesPage() {
  await connectDB();
  const services = await Service.find({}).sort({ createdAt: -1 });

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📦 جميع الخدمات:</h2>
      {services.length === 0 ? (
        <p>لا يوجد خدمات متاحة حالياً.</p>
      ) : (
        <ul>
          {services.map((service: any) => (
            <li key={service._id} style={{ marginBottom: '1.5rem' }}>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <p>💰 {service.price} ريال</p>
              <p>📁 التصنيف: {service.category}</p>
              <Link href={`/service?id=${service._id}`}>
                🔍 عرض التفاصيل
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
