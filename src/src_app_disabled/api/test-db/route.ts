import { NextResponse } from 'next/server';
import connectDB from '@/utils/connectDB';
import Service from '@/models/Service';

export async function GET() {
  try {
    await connectDB();
    const services = await Service.find().limit(5);
    return NextResponse.json({ status: 'success', data: services });
  } catch (error) {
    console.error('DB Test Error:', error);
    return NextResponse.json({ status: 'error', message: 'فشل الاتصال بقاعدة البيانات' }, { status: 500 });
  }
}
