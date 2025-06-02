import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // استخراج id من الـ URL
  const url = new URL(request.url);
  const id = url.pathname.split('/').pop();

  // هنا تقدر تستخدم id للبحث عن الطلب أو أي منطق خاص فيك
  // هذا مجرد مثال يطبع الـ id المستخرج
  return NextResponse.json({ id });
}
