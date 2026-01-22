// src/app/api/delete-service/route.ts

import { NextRequest, NextResponse } from 'next/server';
// import { supabase } from '@/utils/supabaseClient';

export async function POST(req: NextRequest) {
  try {
    const body = await req.formData();
    const id = body.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'المعرف مفقود' });
    }

    // Supabase client removed for build compatibility
    // Replace with Prisma or other logic as needed
    return NextResponse.json({ success: false, message: 'حذف الخدمة غير متاح حالياً (تم تعطيل supabase)' });
  } catch (error) {
    console.error('❌ خطأ في حذف الخدمة:', error);
    return NextResponse.json({ success: false, message: 'فشل في حذف الخدمة' });
  }
}
