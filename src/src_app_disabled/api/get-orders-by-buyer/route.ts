import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function POST(req: Request) {
  try {
    const { buyerId } = await req.json();

    const { db } = await connectToDatabase();
    const orders = await db
      .collection('orders')
      .find({ buyerId: buyerId })
      .toArray();

    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error('Error fetching buyer orders:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' });
  }
}
