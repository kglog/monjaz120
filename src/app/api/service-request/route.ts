import connectDB from '@/lib/mongodb';
import Order from '@/models/order';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    await connectDB();

    const { serviceId, buyerId } = await req.json();

    const order = new Order({
      serviceId,
      buyerId,
      status: 'pending',
    });

    await order.save();

    return NextResponse.json(order);
  } catch (error) {
    console.error('Error creating service request:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
