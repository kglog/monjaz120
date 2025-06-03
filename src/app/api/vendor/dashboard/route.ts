import { NextResponse } from "next/server";

export async function GET() {
  const data = {
    ordersCount: 5,
    totalEarnings: 1500,
  };
  return NextResponse.json(data);
}
