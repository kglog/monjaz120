import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
// Legacy MongoDB logic preserved below as comments (additive only)
// import { connectToDB } from '@/lib/mongodb';
// import User from '@/models/User';
// Prisma integration (additive)
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { name, email, password, role } = await req.json();
    // Prisma version (additive)
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ message: 'البريد مسجّل مسبقًا' }, { status: 400 });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    // map incoming role names to the DB enum. Frontend may send 'vendor' or 'seller'
    // normalize both to the DB's 'vendor' value. Default to 'buyer'.
    const incomingRole = (role || 'buyer').toString();
    const normalizedRole = (incomingRole === 'vendor' || incomingRole === 'seller') ? 'vendor' : 'buyer';
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: normalizedRole,
      },
    });
    return NextResponse.json({ message: 'تم إنشاء الحساب بنجاح', user });
    // Legacy MongoDB version (preserved as comment):
    /*
    await connectToDB();
    const user = new User({ name, email, password: hashedPassword, role: normalizedRole });
    await user.save();
    return NextResponse.json({ message: 'تم إنشاء الحساب بنجاح', user });
    */
  } catch (error: any) {
    return NextResponse.json({ message: 'حدث خطأ أثناء إنشاء الحساب', error: error && typeof error === 'object' && 'message' in error ? (error as any).message : String(error) }, { status: 500 });
  }
}
// ASSISTANT_FINAL: true
