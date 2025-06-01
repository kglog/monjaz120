import { NextResponse } from 'next/server';

// هذه دالة للتعامل مع طلبات POST
export async function POST(request: Request) {
  // تقدر تستخرج بيانات من request لو ودك
  // const data = await request.json();

  // ترجع رد JSON بسيط للعميل
  return NextResponse.json({ message: "تم بنجاح" });
}
