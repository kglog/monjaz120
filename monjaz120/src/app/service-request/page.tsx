import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';

export default async function ServiceRequestPage() {
  await connectDB();

  const requests = await Order.find();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">طلبات الخدمات</h1>
      <ul>
        {requests.map((req: any) => (
          <li key={req._id}>
            الخدمة: {req.serviceId?.toString()} - الحالة: {req.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
