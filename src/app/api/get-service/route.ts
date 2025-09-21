import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Service from '@/models/Service';

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ message: 'Missing ID' }, { status: 400 });

    const service = await Service.findById(id).lean();
    if (!service) return NextResponse.json({ message: 'Service not found' }, { status: 404 });

    return NextResponse.json({ service });
  } catch (error) {
    return NextResponse.json({ message: 'Server error', error }, { status: 500 });
  }
}
