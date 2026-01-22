<<<<<<< Updated upstream:monjaz120/src/app/api/service-request/route.ts
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
=======
// Legacy MongoDB logic preserved below as comments (additive only)
// import connectDB from '@/lib/mongodb';
// import Order from '@/models/Order';
// Prisma integration (additive)
import prisma from '@/lib/prisma';
>>>>>>> Stashed changes:src/app/api/service-request/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { serviceId, title, price, userId } = await req.json();

    // Prisma version (additive)
    // استخدم قيم افتراضية إذا لم تتوفر
    const order = await prisma.order.create({
      data: {
        serviceId,
        title: title || 'طلب خدمة',
        price: price ? parseFloat(price) : 0,
        userId: userId || 'unknown-user',
      },
    });
    return NextResponse.json(order);

    // Legacy MongoDB version (preserved as comment):
    /*
    await connectDB();
    const order = new Order({
      serviceId,
      buyerId,
      status: 'pending',
    });
    await order.save();
    return NextResponse.json(order);
    */
  } catch (error) {
    console.error('Error creating service request:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
