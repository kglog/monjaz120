import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "نقطة اختبار Firebase تعمل مؤقتًا ✅" });
}
