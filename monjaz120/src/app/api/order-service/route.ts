import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../../lib/mongodb';

export async function POST(req: NextRequest) {
  try {
    const { serviceId, buyerId } = await req.json();

    if (!serviceId || !buyerId) {
      return NextResponse.json({ success: false, error: 'Missing data' });
    }

    const { db } = await connectToDatabase();

    const order = {
      serviceId: new ObjectId(serviceId),
      buyerId,
      createdAt: new Date(),
      status: 'pending', // قيد الانتظار
    };

    await db.collection('orders').insertOne(order);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error placing order:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' });
  }
}
