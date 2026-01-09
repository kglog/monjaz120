import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectToDB } from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req: Request) {
  try {
  const { name, email, password, role } = await req.json();

    await connectToDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'البريد مسجّل مسبقًا' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

  // map incoming role names to the DB enum. Frontend may send 'vendor' or 'seller'
  // normalize both to the DB's 'vendor' value. Default to 'buyer'.
  const incomingRole = (role || 'buyer').toString();
  const normalizedRole = (incomingRole === 'vendor' || incomingRole === 'seller') ? 'vendor' : 'buyer';

    await User.create({
      name,
      email,
      password: hashedPassword,
      role: normalizedRole,
    });

    return NextResponse.json({ message: 'تم إنشاء الحساب بنجاح' });
  } catch (error) {
    return NextResponse.json({ message: 'حدث خطأ أثناء إنشاء الحساب' }, { status: 500 });
  }
}
