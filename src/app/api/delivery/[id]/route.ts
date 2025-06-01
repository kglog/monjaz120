import fs from 'fs';
import path from 'path';
import formidable from 'formidable';
import { NextRequest, NextResponse } from 'next/server';

export const config = {
  api: {
    bodyParser: false
  }
};

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);

  // تجهيز مجلد الرفع
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  await fs.promises.mkdir(uploadDir, { recursive: true });

  // تجهيز formidable
  const form = formidable({ multiples: false, uploadDir, keepExtensions: true });

  const data: any = await new Promise((resolve, reject) => {
    form.parse(req as any, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });

  const notes = data.fields.notes || '';
  const fileName = data.files.file ? data.files.file[0].newFilename : null;

  // تعديل orders.json
  const ordersFilePath = path.join(process.cwd(), 'src/app/api/orders/orders.json');
  const ordersData = await fs.promises.readFile(ordersFilePath, 'utf-8');
  const orders = JSON.parse(ordersData);

  const updatedOrders = orders.map((order: any) => {
    if (order.serviceId === id) {
      return {
        ...order,
        deliveryNotes: notes,
        deliveryFile: fileName,
        deliveredAt: new Date().toISOString()
      };
    }
    return order;
  });

  await fs.promises.writeFile(ordersFilePath, JSON.stringify(updatedOrders, null, 2), 'utf-8');

  return NextResponse.json({ success: true, fileName });
}
