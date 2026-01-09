// src/app/api/delete-service/route.ts

import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Service from '@/models/Service';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.formData();
    const id = body.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'المعرف مفقود' });
    }

    await Service.findByIdAndDelete(id);
    return NextResponse.redirect(`${req.nextUrl.origin}/vendor/services`);
  } catch (error) {
    console.error('❌ خطأ في حذف الخدمة:', error);
    return NextResponse.json({ success: false, message: 'فشل في حذف الخدمة' });
  }
}
