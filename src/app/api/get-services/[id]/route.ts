import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');

  if (!id || id.length !== 24) {
    return NextResponse.json({ message: 'معرف غير صالح' }, { status: 400 });
  }

  try {
    const { db } = await connectToDatabase();
    const service = await db.collection('services').findOne({ _id: new ObjectId(id) });

    if (!service) {
      return NextResponse.json({ message: 'الخدمة غير موجودة' }, { status: 404 });
    }

    return NextResponse.json({ service });
  } catch (error) {
    console.error('حدث خطأ:', error);
    return NextResponse.json({ message: 'خطأ داخلي في الخادم' }, { status: 500 });
  }
}
