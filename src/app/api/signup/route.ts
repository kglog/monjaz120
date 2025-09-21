import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectToDB } from '@/lib/mongodb';
import User from '@/models/user';

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    await connectToDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'البريد مسجّل مسبقًا' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'buyer', // أو vendor حسب التسجيل
    });

    return NextResponse.json({ message: 'تم إنشاء الحساب بنجاح' });
  } catch (error) {
    return NextResponse.json({ message: 'حدث خطأ أثناء إنشاء الحساب' }, { status: 500 });
  }
}
