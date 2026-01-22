import { NextResponse } from 'next/server';
// Legacy MongoDB logic preserved below as comments (additive only)
// import connectDB from '@/utils/connectDB';
// import Service from '@/models/Service';
// Prisma integration (additive)
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Prisma version (additive)
    const services = await prisma.service.findMany({ take: 5 });
    return NextResponse.json({ status: 'success', data: services });

    // Legacy MongoDB version (preserved as comment):
    /*
    await connectDB();
    const services = await Service.find().limit(5);
    return NextResponse.json({ status: 'success', data: services });
    */
  } catch (error) {
    console.error('DB Test Error:', error);
    return NextResponse.json({ status: 'error', message: 'فشل الاتصال بقاعدة البيانات' }, { status: 500 });
  }
}
