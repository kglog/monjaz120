import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

// كود إضافي لدعم قاعدة بوستجري عبر بريزما
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { buyerId } = await req.json();

    const { db } = await connectToDatabase();
    const orders = await db
      .collection('orders')
      .find({ buyerId: buyerId })
      .toArray();

    // جلب الطلبات من قاعدة بوستجري
    const orders_postgres = await prisma.order.findMany({
      where: { userId: String(buyerId) }
    });

    return NextResponse.json({ success: true, orders });

    // إذا فيه نتائج من بوستجري
    // يمكن تعديل الاستجابة حسب الحاجة
    // return NextResponse.json({ success: true, orders: orders_postgres });
  } catch (error) {
    console.error('Error fetching buyer orders:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' });
  }
}
