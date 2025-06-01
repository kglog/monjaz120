import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const ordersFile = path.join(process.cwd(), 'src/app/api/orders/orders.json');

export async function GET() {
  try {
    const fileData = await fs.readFile(ordersFile, 'utf-8');
    const orders = JSON.parse(fileData);
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json([], { status: 200 });
  }
}
