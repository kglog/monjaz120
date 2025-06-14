import { connectDB } from '@/lib/mongodb';
import Service from '@/models/Service';
import ConfirmButton from './ConfirmButton';

export default async function ServiceRequestPage({ searchParams }: { searchParams: { id: string } }) {
  const id = searchParams.id;

  if (!id || id.length !== 24) return <p>❌ معرّف الخدمة غير صالح</p>;

  await connectDB();
  const service = await Service.findById(id);

  if (!service) return <p>❌ لم يتم العثور على الخدمة</p>;

  return (
    <div>
      <h1>🛠️ طلب الخدمة</h1>
      <p><strong>العنوان:</strong> {service.title}</p>
      <p><strong>الوصف:</strong> {service.description}</p>
      <p><strong>السعر:</strong> 💰 {service.price} ريال</p>

      <ConfirmButton serviceId={service._id.toString()} />
    </div>
  );
}
