import { NextRequest, NextResponse } from 'next/server';
// كود مونقو دي بي (قديم - legacy)
// import { connectToDatabase } from '../../../../lib/mongodb';
// import { ObjectId } from 'mongodb';
import { PrismaClient } from '@prisma/client';
const prismaClient = new PrismaClient();

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');

  if (!id) {
    return NextResponse.json({ message: 'معرف غير صالح' }, { status: 400 });
  }

  try {
    // const { db } = await connectToDatabase(); // كود مونقو دي بي (قديم - legacy)
    // const service = await db.collection('services').findOne({ _id: new ObjectId(id) }); // كود مونقو دي بي (قديم - legacy)

    // جلب الخدمة من بريزما فقط
    const service = await prismaClient.service.findUnique({ where: { id: String(id) } });

    if (!service) {
      return NextResponse.json({ message: 'الخدمة غير موجودة' }, { status: 404 });
    }

    return NextResponse.json({ service });
  } catch (error) {
    console.error('حدث خطأ:', error);
    return NextResponse.json({ message: 'خطأ داخلي في الخادم' }, { status: 500 });
  }
}
