import { NextResponse } from 'next/server';
// import { supabase } from '@/utils/supabaseClient';

export async function GET() {
  try {
    // مؤقتًا نستخدم vendorId ثابت لتجربة التقييمات
    const vendorId = '123'; // غيّره إذا بغيت بعدين

    // Supabase client removed for build compatibility
    // Replace with Prisma or other logic as needed
    return NextResponse.json({ success: false, message: 'جلب التقييمات غير متاح حالياً (تم تعطيل supabase)' });
  } catch (error) {
    console.error('Error fetching ratings:', error);
    return NextResponse.json({ success: false, message: 'فشل في جلب التقييمات' });
  }
}
