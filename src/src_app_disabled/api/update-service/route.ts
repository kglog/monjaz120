import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Service from '@/models/Service';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { id, title, description, price, category, image } = await req.json();

    await Service.findByIdAndUpdate(id, {
      title,
      description,
      price,
      category,
      image,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ خطأ في update-service API:', error);
    return NextResponse.json({ success: false, message: 'فشل في تعديل الخدمة' });
  }
}
