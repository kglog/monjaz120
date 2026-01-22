import { NextResponse } from 'next/server';
// كود مونقو دي بي (قديم - legacy)
// import mongoose from 'mongoose';
// import connectDB from '@/lib/mongodb';
import prisma from '@/lib/prisma';

// كود بريزما فقط (المعتمد)
import { PrismaClient } from '@prisma/client';
const prismaClient = new PrismaClient();

export async function POST(req: Request) {
  try {
    // await connectDB(); // كود مونقو دي بي (قديم - legacy)

    const { title, description, price, category, image, userId, vendorId } = await req.json();

    // حفظ الخدمة في بريزما فقط
    const data: any = {
      title,
      description,
      price,
      // category, // غير موجود في Prisma model، فقط للتوافق مع الكود القديم
      image: image || '', // متوافق مع نوع images الجديد
      // images, // غير موجود في Prisma model، فقط للتوافق مع الكود القديم
      // deliveryTime: 0, // غير موجود في Prisma model، فقط للتوافق مع الكود القديم
      // image, // تم التعليق حسب الشروط
      // ...(userId ? { userId: String(userId) } : {}), // تم التعليق حسب الشروط
      // vendorId, // تم التعليق حسب الشروط
    };
    if (userId) {
      data.user = { connect: { id: String(userId) } };
    }
    const service = await prismaClient.service.create({ data });

    return NextResponse.json({ success: true, message: '✅ تم حفظ الخدمة', service });
  } catch (error) {
    console.error('❌ خطأ في API add-service:', error);
    return NextResponse.json({ success: false, message: '❌ فشل في إضافة الخدمة' });
  }
}
