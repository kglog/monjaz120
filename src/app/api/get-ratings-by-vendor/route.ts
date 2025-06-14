import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Rating from '@/models/Rating';

export async function GET() {
  try {
    await connectDB();

    // مؤقتًا نستخدم vendorId ثابت لتجربة التقييمات
    const vendorId = '123'; // غيّره إذا بغيت بعدين

    const ratings = await Rating.find({ vendorId }).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, ratings });
  } catch (error) {
    console.error('Error fetching ratings:', error);
    return NextResponse.json({ success: false, message: 'فشل في جلب التقييمات' });
  }
}
