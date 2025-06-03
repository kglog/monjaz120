import { NextResponse } from "next/server";

export async function GET() {
  // هنا تقدر تجيب بيانات حقيقية لاحقًا، حاليًا بيانات ثابتة:
  const data = {
    ordersCount: 5,
    totalEarnings: 1500,
  };

  return NextResponse.json(data);
}
