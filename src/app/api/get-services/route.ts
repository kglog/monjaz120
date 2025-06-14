import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Service from '@/models/Service';

export async function GET(req: Request) {
  try {
    await connectDB();

    const vendorId = '64884fcadadb30db0a57db9e'; // مؤقتًا نستخدم نفس ID المستخدم

    const services = await Service.find({ vendorId });

    return NextResponse.json(services);
  } catch (error) {
    console.error('❌ خطأ أثناء جلب الخدمات:', error);
    return NextResponse.json({ error: 'فشل في جلب الخدمات' }, { status: 500 });
  }
}
