// app/api/orders/buyer/route.ts
import { NextResponse } from 'next/server';
import connectDB from '@/utils/connectDB';
import Order from '@/models/Order';

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email } = await req.json();
    const orders = await Order.find({ buyerEmail: email }).sort({ createdAt: -1 });
    return NextResponse.json({ status: 'success', orders });
  } catch (err) {
    return NextResponse.json({ status: 'error', message: 'خطأ' });
  }
}
