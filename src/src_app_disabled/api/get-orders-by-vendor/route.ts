import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function POST(req: Request) {
  try {
    const { vendorId } = await req.json();
    const { db } = await connectToDatabase();

    // نطبع البيانات للتأكد
    console.log('vendorId:', vendorId);

    // نشوف هل البيانات موجودة فعلاً
    const allOrders = await db.collection('orders').find().toArray();
    console.log('كل الطلبات:', allOrders);

    // نفلتر الطلبات داخل الكود بدل MongoDB
    const filtered = allOrders.filter((order: any) => order.vendorId === vendorId);

    return NextResponse.json({
      success: true,
      orders: filtered,
    });

  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
    });
  }
}
