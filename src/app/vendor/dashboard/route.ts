import { NextResponse } from "next/server";

// هذا هو الـ API GET
export async function GET() {
  // بيانات تجريبية (لاحقًا تربطها بقاعدة البيانات)
  const data = {
    ordersCount: 5,
    totalEarnings: 1500,
  };

  return NextResponse.json(data);
}
