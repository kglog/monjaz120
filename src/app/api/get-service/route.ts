import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Service from '@/models/Service';

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id || id.length !== 24) {
      return NextResponse.json({ success: false, message: 'معرّف غير صالح' });
    }

    const service = await Service.findById(id);
    if (!service) {
      return NextResponse.json({ success: false, message: 'الخدمة غير موجودة' });
    }

    return NextResponse.json({ success: true, service });
  } catch (error) {
    console.error('❌ خطأ في السيرفر:', error);
    return NextResponse.json({ success: false, message: 'فشل في جلب الخدمة' });
  }
}
