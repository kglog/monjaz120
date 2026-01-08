import { NextResponse } from "next/server";

export async function GET() {
  const data = {
    ordersCount: 0,
    totalEarnings: 0,
  };
  return NextResponse.json(data);
}
