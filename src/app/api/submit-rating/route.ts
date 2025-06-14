import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ message: "نقطة نهاية التقييم تعمل مؤقتًا ✅" });
}
