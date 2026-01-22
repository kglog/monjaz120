import { NextResponse } from 'next/server';
// import { supabase } from '@/utils/supabaseClient';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Honeypot anti-bot
    if (body.hp_field) {
      return NextResponse.json({ status: 'error', message: 'Invalid request' }, { status: 400 });
    }

    const { firstName, lastName, email, password, role, specialty, agree } = body;

    if (!agree) {
      return NextResponse.json({ status: 'error', message: 'يجب الموافقة على الشروط' }, { status: 400 });
    }

    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json({ status: 'error', message: 'جميع الحقول مطلوبة' }, { status: 400 });
    }

    // Map role naming if frontend uses seller/buyer
    const roleMapped = role === 'seller' ? 'vendor' : role === 'buyer' ? 'buyer' : 'buyer';

    // Supabase client removed for build compatibility
    // Replace with Prisma or other logic as needed
    return NextResponse.json({ status: 'error', message: 'التسجيل غير متاح حالياً (تم تعطيل supabase)' }, { status: 503 });
  } catch (err: any) {
    console.error('Register API error:', err);
    return NextResponse.json({ status: 'error', message: 'خطأ داخلي' }, { status: 500 });
  }
}
