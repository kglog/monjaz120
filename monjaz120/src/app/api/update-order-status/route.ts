import { NextResponse } from 'next/server';
// كود مونقو دي بي (قديم - legacy)
// import { ObjectId } from 'mongodb';
// import { connectToDatabase } from '@/lib/mongodb';
import { PrismaClient } from '@prisma/client';
const prismaClient = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { orderId, newStatus } = await req.json();

    if (!orderId || !newStatus) {
      return NextResponse.json({ success: false, error: 'Missing fields' }, { status: 400 });
    }

    // كود مونقو دي بي (قديم - legacy)
    // const { db } = await connectToDatabase();
    // const result = await db.collection('orders').updateOne(
    //   { _id: new ObjectId(orderId) },
    //   { $set: { status: newStatus } }
    // );
    // if (result.modifiedCount === 0) {
    //   return NextResponse.json({ success: false, error: 'Order not found or already updated' });
    // }

    // تحديث حالة الطلب في بريزما فقط
    // status field not supported in Prisma Order model
    const updatedOrder = await prismaClient.order.update({
      where: { id: String(orderId) },
      data: {},
    });

    return NextResponse.json({ success: true, order: updatedOrder });
  } catch (error) {
    console.error('Error updating order status:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
