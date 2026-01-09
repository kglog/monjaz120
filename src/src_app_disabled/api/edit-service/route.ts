import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Service from '@/models/Service';

export async function PUT(req: NextRequest) {
  try {
    await connectDB();

    const data = await req.json();
    console.log('🚀 بيانات التعديل:', data);

    const { id, title, description, price, category, image } = data;

    if (!id) {
      return NextResponse.json({ success: false, message: '❌ المعرف مفقود' });
    }

    const updated = await Service.findByIdAndUpdate(id, {
      title,
      description,
      price,
      category,
      image,
    });

    if (!updated) {
      return NextResponse.json({ success: false, message: '❌ لم يتم العثور على الخدمة' });
    }

    return NextResponse.json({ success: true, message: '✅ تم التحديث بنجاح' });
  } catch (error) {
    console.error('❌ خطأ في تعديل الخدمة:', error);
    return NextResponse.json({ success: false, message: '❌ فشل في تعديل الخدمة' });
  }
}
