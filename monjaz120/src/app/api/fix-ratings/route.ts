import { NextResponse } from 'next/server';
// import { supabase } from '@/utils/supabaseClient';

export async function GET() {
  try {
    // Supabase client removed for build compatibility
    // Replace with Prisma or other logic as needed
    return NextResponse.json({ success: false, message: 'إصلاح التقييمات غير متاح حالياً (تم تعطيل supabase)' });
  } catch (error) {
    console.error('❌ خطأ أثناء الإصلاح:', error);
    return NextResponse.json({
      success: false,
      error: 'حدث خطأ أثناء إصلاح التقييمات.',
    });
  }
}
