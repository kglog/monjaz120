import { NextResponse } from "next/server";

// Prisma integration (additive, legacy logic preserved)
// import prisma from "@/lib/prisma";

export async function GET() {
  // Example Prisma usage (additive, not replacing legacy logic)
  // const ordersCount = await prisma.order.count();
  // const totalEarnings = await prisma.order.aggregate({ _sum: { total: true } });
  // const data = {
  //   ordersCount,
  //   totalEarnings: totalEarnings._sum.total || 0,
  // };
  // return NextResponse.json(data);

  // Legacy logic (static values, preserved):
  const data = {
    ordersCount: 0,
    totalEarnings: 0,
  };
  return NextResponse.json(data);
}
