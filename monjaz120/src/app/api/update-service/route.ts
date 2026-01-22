import { NextRequest, NextResponse } from 'next/server';
// كود مونقو دي بي (قديم - legacy)
// import connectDB from '@/lib/mongodb';
// import Service from '@/models/Service';

// كود بريزما فقط (المعتمد)
import { PrismaClient } from '@prisma/client';
const prismaClient = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    // await connectDB(); // كود مونقو دي بي (قديم - legacy)
    // await Service.findByIdAndUpdate(id, {...}); // كود مونقو دي بي (قديم - legacy)

    const { id, title, description, price, category, image } = await req.json();

    // تحديث الخدمة في بريزما فقط
    await prismaClient.service.update({
      where: { id: String(id) },
      data: {
        title,
        description,
        price,
        // category, // غير موجود في Prisma model، فقط للتوافق مع الكود القديم
        image,
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ خطأ في update-service API:', error);
    return NextResponse.json({ success: false, message: 'فشل في تعديل الخدمة' });
  }
}
