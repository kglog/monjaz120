import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
<<<<<<< Updated upstream:monjaz120/src/app/api/signup/route.ts
import { connectToDB } from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req: Request) {
  try {
  const { name, email, password, role } = await req.json();
=======
// Legacy MongoDB logic preserved below as comments (additive only)
// import { connectToDB } from '@/lib/mongodb';
// import User from '@/models/User';
// Prisma integration (additive)
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { name, email, password, role } = await req.json();
>>>>>>> Stashed changes:src/app/api/signup/route.ts

    // Prisma version (additive)
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ message: 'البريد مسجّل مسبقًا' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

<<<<<<< Updated upstream:monjaz120/src/app/api/signup/route.ts
  // map incoming role names to the DB enum. Frontend may send 'vendor' or 'seller'
  // normalize both to the DB's 'vendor' value. Default to 'buyer'.
  const incomingRole = (role || 'buyer').toString();
  const normalizedRole = (incomingRole === 'vendor' || incomingRole === 'seller') ? 'vendor' : 'buyer';

=======
    // map incoming role names to the DB enum. Frontend may send 'vendor' or 'seller'
    // normalize both to the DB's 'vendor' value. Default to 'buyer'.
    const incomingRole = (role || 'buyer').toString();
    const normalizedRole = (incomingRole === 'vendor' || incomingRole === 'seller') ? 'vendor' : 'buyer';

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: normalizedRole,
      },
    });

    // Legacy MongoDB version (preserved as comment):
    /*
    await connectToDB();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'البريد مسجّل مسبقًا' }, { status: 400 });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
>>>>>>> Stashed changes:src/app/api/signup/route.ts
    await User.create({
      name,
      email,
      password: hashedPassword,
      role: normalizedRole,
    });
    */

    return NextResponse.json({ message: 'تم إنشاء الحساب بنجاح' });
  } catch (error) {
    return NextResponse.json({ message: 'حدث خطأ أثناء إنشاء الحساب' }, { status: 500 });
  }
}
