import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';

export async function GET(req: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const services = await db.collection('services').find().toArray();

    return NextResponse.json({ services });
  } catch (error) {
    console.error('حدث خطأ أثناء جلب جميع الخدمات:', error);
    return NextResponse.json(
      { message: 'حدث خطأ داخلي في الخادم' },
      { status: 500 }
    );
  }
}
