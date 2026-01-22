import { NextRequest, NextResponse } from 'next/server';

// Prisma integration (additive, legacy logic preserved)
// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

// دالة GET تعرض رسالة ثابتة
export async function GET() {
  return NextResponse.json({ message: 'Hello! Checkout API route is working.' });
}

// دالة POST تستقبل بيانات من المستخدم وترد عليها
export async function POST(request: NextRequest) {
  const body = await request.json();
  // Example Prisma usage (additive, not replacing legacy logic)
  // const newCheckout = await prisma.checkout.create({ data: { ...body } });
  // return NextResponse.json({ message: 'Checkout successful!', data: newCheckout }, { status: 200 });
  return NextResponse.json({ message: 'Checkout successful!', data: body }, { status: 200 });
}

// Legacy/other DB logic (MongoDB/Mongoose/SQLite) would be commented here if present
// (No legacy DB logic found in original file)
