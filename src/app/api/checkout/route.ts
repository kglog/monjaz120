import { NextResponse } from 'next/server';

export const orders: any[] = []; // قاعدة بيانات مؤقتة

export async function POST(req: Request) {
  const formData = await req.formData();

  const serviceId = formData.get('serviceId')?.toString() || '';
  const notes = formData.get('notes')?.toString() || '';
  const file = formData.get('file') as File | null;

  const newOrder = {
    serviceId,
    notes,
    fileName: file?.name || null,
    createdAt: new Date().toISOString(), // ✅ تنسيق تاريخ صحيح
  };

  orders.push(newOrder);

  return NextResponse.json({ message: '🚀 تم حفظ الطلب بنجاح', order: newOrder });
}
