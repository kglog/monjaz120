import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Rating from '@/models/Rating';
import Order from '@/models/Order';

export async function GET() {
  try {
    await connectDB();

    const ratings = await Rating.find({});
    let fixedCount = 0;

    for (const rating of ratings) {
      if (!rating.vendorId || !rating.serviceName) {
        const order = await Order.findById(rating.orderId);
        if (order) {
          rating.vendorId = order.vendorId;
          rating.serviceName = order.serviceName;
          await rating.save();
          fixedCount++;
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: `✅ تم إصلاح ${fixedCount} تقييم.`,
    });
  } catch (error) {
    console.error('❌ خطأ أثناء الإصلاح:', error);
    return NextResponse.json({
      success: false,
      error: 'حدث خطأ أثناء إصلاح التقييمات.',
    });
  }
}
