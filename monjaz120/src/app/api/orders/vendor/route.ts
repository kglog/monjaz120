// app/api/orders/vendor/route.ts
import { NextResponse } from 'next/server';
import connectDB from '@/utils/connectDB';
import Order from '@/models/Order';
import Service from '@/models/Service';

export async function POST(req: Request) {
  try {
    await connectDB();
    const { vendorEmail } = await req.json();

    const vendorServices = await Service.find({ vendorEmail });
    const slugs = vendorServices.map((s: any) => s.slug);

    const orders = await Order.find({ serviceSlug: { $in: slugs } }).sort({ createdAt: -1 });

    return NextResponse.json({ status: 'success', orders });
  } catch (err) {
    return NextResponse.json({ status: 'error', message: 'خطأ' });
  }
}
