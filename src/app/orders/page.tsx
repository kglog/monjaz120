import { cookies } from "next/headers";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import Service from "@/models/Service";

export default async function OrdersPage() {
  await connectDB();

  const userId = cookies().get("userId")?.value;
  if (!userId) return <p>❌ لم يتم العثور على المستخدم.</p>;

  const orders = await Order.find({ buyerId: userId });
  if (!orders.length) return <p>❌ لا توجد طلبات لهذا المستخدم.</p>;

  const services = await Service.find();

  return (
    <ul className="space-y-4">
      {orders.map((order: any) => {
        const service = services.find(
          (s: any) => s._id.toString() === order.serviceId.toString()
        );

        return (
          <li key={order._id} className="border p-4 rounded shadow">
            <p>
              🛠️ <strong>الخدمة:</strong> {service?.title || "غير معروفة"}
            </p>
            <p>
              ⏱️ <strong>الحالة:</strong> {order.status}
            </p>
          </li>
        );
      })}
    </ul>
  );
}
