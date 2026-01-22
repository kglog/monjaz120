import { NextResponse } from 'next/server';
// كود مونقو دي بي (قديم - legacy)
// import connectDB from '@/lib/mongodb';
// import Service from '@/models/Service';
import { PrismaClient } from '@prisma/client';
const prismaClient = new PrismaClient();

export async function GET(req: Request) {
  try {
    // await connectDB(); // كود مونقو دي بي (قديم - legacy)
    // const services = await Service.find({ vendorId }); // كود مونقو دي بي (قديم - legacy)

    // جلب الخدمات من بريزما فقط
    const services = await prismaClient.service.findMany();
    return NextResponse.json(services);
  } catch (error) {
    console.error('❌ خطأ أثناء جلب الخدمات:', error);
    return NextResponse.json({ error: 'فشل في جلب الخدمات' }, { status: 500 });
  }
}
