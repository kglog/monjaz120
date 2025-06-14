import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import Rating from '@/models/Rating';
import Order from '@/models/Order';

export async function POST(req: Request) {
  try {
    await connectDB();
    const { orderId, vendorId, rating, serviceName } = await req.json();

    await Rating.create({
      orderId,
      vendorId,
      rating,
      serviceName,
    });

    await Order.findByIdAndUpdate(orderId, { rating });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ Error saving rating:', error);
    return NextResponse.json({ success: false, error: 'Failed to save rating' });
  }
}
