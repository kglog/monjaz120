import { NextRequest, NextResponse } from 'next/server';
// import { supabase } from '@/utils/supabaseClient';

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    console.log('🚀 بيانات التعديل:', data);

    const { id, title, description, price, category, image } = data;

    if (!id) {
      return NextResponse.json({ success: false, message: '❌ المعرف مفقود' });
    }

    // Supabase client removed for build compatibility
    // Replace with Prisma or other logic as needed
    return NextResponse.json({ success: false, message: 'تعديل الخدمة غير متاح حالياً (تم تعطيل supabase)' });
  } catch (error) {
    console.error('❌ خطأ في تعديل الخدمة:', error);
    return NextResponse.json({ success: false, message: '❌ فشل في تعديل الخدمة' });
  }
}
