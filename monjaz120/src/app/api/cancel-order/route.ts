import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '@/lib/mongodb';

export async function POST(req: Request) {
  try {
    const { orderId } = await req.json();
    const { db } = await connectToDatabase();

    const result = await db.collection('orders').updateOne(
      { _id: new ObjectId(orderId) },
      { $set: { status: 'canceled' } }
    );

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('Error canceling order:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' });
  }
}
