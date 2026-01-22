import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Service from '@/models/Service';

// كود إضافي لدعم قاعدة بوستجري عبر بريزما
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ message: 'Missing ID' }, { status: 400 });

    const service = await Service.findById(id).lean();
    if (!service) return NextResponse.json({ message: 'Service not found' }, { status: 404 });

    // كود إضافي لجلب الخدمة من قاعدة بريزما الافتراضية
    const service_prisma = await prisma.service.findUnique({
      where: { id: String(id) }
    });
    if (service_prisma) {
      return NextResponse.json({ service: service_prisma });
    }

    return NextResponse.json({ service });
  } catch (error) {
    return NextResponse.json({ message: 'Server error', error }, { status: 500 });
  }
}
