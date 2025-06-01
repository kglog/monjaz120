import { NextResponse } from 'next/server';

let orders: any[] = [];

export async function GET() {
  return NextResponse.json(orders);
}

export async function POST(req: Request) {
  const formData = await req.formData();

  const serviceId = Number(formData.get('serviceId'));
  const notes = String(formData.get('notes') || '');
  const file = formData.get('file') as File | null;

  const newOrder = {
    serviceId,
    notes,
    fileName: file?.name || null,
    createdAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
  };

  orders.push(newOrder);

  return NextResponse.json({
    message: '🚀 تم حفظ الطلب بنجاح',
    order: newOrder,
  });
}
