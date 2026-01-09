import { NextResponse } from 'next/server';
import connectDB from '@/utils/connectDB';
import User from '@/models/User';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Honeypot anti-bot
    if (body.hp_field) {
      return NextResponse.json({ status: 'error', message: 'Invalid request' }, { status: 400 });
    }

  let { firstName, lastName, email, password, role, specialty, agree } = body;

  // normalize email and trim password to avoid mismatch with login
  if (typeof email === 'string') email = email.trim().toLowerCase();
  if (typeof password === 'string') password = password.trim();

    if (!agree) {
      return NextResponse.json({ status: 'error', message: 'يجب الموافقة على الشروط' }, { status: 400 });
    }

    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json({ status: 'error', message: 'جميع الحقول مطلوبة' }, { status: 400 });
    }

    await connectDB();

    // Map role naming if frontend uses seller/buyer
    const roleMapped = role === 'seller' ? 'vendor' : role === 'buyer' ? 'buyer' : 'buyer';

    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({ status: 'error', message: 'البريد الإلكتروني مستخدم سابقاً' }, { status: 409 });
    }

    const user = await User.create({
      name: `${firstName} ${lastName}`,
      email,
      password,
      role: roleMapped,
      specialty: specialty || undefined,
    } as any);

    return NextResponse.json({ status: 'success', message: 'تم إنشاء الحساب بنجاح', createdAt: user.createdAt?.toISOString() || new Date().toISOString() });
  } catch (err: any) {
    console.error('Register API error:', err);
    return NextResponse.json({ status: 'error', message: 'خطأ داخلي' }, { status: 500 });
  }
}

