import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Order from '@/models/Order';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { serviceId, userId } = await req.json();

    if (!serviceId || !userId) {
      return NextResponse.json({ success: false, message: 'المعرّفات ناقصة' });
    }

    const newOrder = new Order({
      serviceId,
      buyerId: userId,
      status: 'pending',
    });

    await newOrder.save();

    return NextResponse.json({ success: true, message: '✅ تم إنشاء الطلب بنجاح' });
  } catch (error) {
    console.error('❌ خطأ في إنشاء الطلب:', error);
    return NextResponse.json({ success: false, message: 'فشل في إنشاء الطلب' });
  }
}
