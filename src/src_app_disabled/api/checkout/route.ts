import { NextRequest, NextResponse } from 'next/server';

// دالة GET تعرض رسالة ثابتة
export async function GET() {
  return NextResponse.json({ message: 'Hello! Checkout API route is working.' });
}

// دالة POST تستقبل بيانات من المستخدم وترد عليها
export async function POST(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({ message: 'Checkout successful!', data: body }, { status: 200 });
}
