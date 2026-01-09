import { NextResponse } from "next/server";
import { writeFileSync } from "fs";
import path from "path";

export async function GET() {
  // بيانات وهمية (ممكن تربطها بقاعدة بيانات لاحقًا)
  const orders = [
    { id: 1, buyer: "أحمد", service: "تصميم شعار", price: 150 },
    { id: 2, buyer: "سارة", service: "برمجة موقع", price: 800 },
    { id: 3, buyer: "تركي", service: "تعليق صوتي", price: 300 },
  ];

  const csvHeader = "ID,Buyer,Service,Price\n";
  const csvRows = orders
    .map((order) => `${order.id},${order.buyer},${order.service},${order.price}`)
    .join("\n");

  const csvContent = csvHeader + csvRows;

  const filePath = path.join(process.cwd(), "public", "orders.csv");
  writeFileSync(filePath, csvContent, "utf8");

  const downloadUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/orders.csv`;

  return NextResponse.json({ success: true, url: downloadUrl });
}
