import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req: Request) {
  try {
    await connectDB();
    const { name, email, password, role } = await req.json();

    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({ success: false, message: 'البريد مستخدم مسبقاً' });
    }

    const newUser = new User({ name, email, password, role });
    await newUser.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ Error creating user:', error);
    return NextResponse.json({ success: false, message: 'حدث خطأ أثناء التسجيل' });
  }
}
