import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectDB from '@/lib/mongodb';
import Service from '@/models/Service';

export async function POST(req: Request) {
  try {
    await connectDB();
    
    const { title, description, price, category, image, vendorId } = await req.json();

    const service = await Service.create({
      title,
      description,
      price,
      category,
      image,
      vendorId: new mongoose.Types.ObjectId(vendorId), // ✅ هنا المهم
    });

    return NextResponse.json({ success: true, message: '✅ تم حفظ الخدمة' });
  } catch (error) {
    console.error('❌ خطأ في API add-service:', error);
    return NextResponse.json({ success: false, message: '❌ فشل في إضافة الخدمة' });
  }
}
