import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendTelegram } from "@/utils/notify";

// POST /api/orders => Ø¥Ù†Ø´Ø§Ø¡ Ø·Ù„Ø¨
export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("ðŸ“© Request body:", body); // ÙŠØ·Ø¨Ø¹ Ø§Ù„Ø¨ÙˆØ¯ÙŠ Ø¹Ø´Ø§Ù† Ù†ØªØ§ÙƒØ¯
    const { serviceId, title, price, details } = body;

    if (!serviceId) {
      return NextResponse.json(
        { status: "error", message: "serviceId Ù…ÙÙ‚ÙˆØ¯" },
        { status: 400 }
      );
    }
console.log("serviceId:", serviceId, "title:", title, "price:", price, "details:", details);
    console.log(" Debug POST /api/orders", { serviceId, title, price, details });
console.log("✅ Created order:", order);
const order = await prisma.order.create({
      data: {
        serviceId: String(serviceId),
        title: title ? String(title) : "Ø·Ù„Ø¨ Ø¨Ø¯ÙˆÙ† Ø¹Ù†ÙˆØ§Ù†",
        price: price ? Number(price) : 0,
        details: details ? String(details) : "",
      },
    });
console.log("✅ Created order:", order);
    await sendTelegram(
      [
        "ðŸ“¦ <b>ÙˆØµÙ„ Ø·Ù„Ø¨ Ø¬Ø¯ÙŠØ¯</b>",
        `â€¢ Ø§Ù„Ø¹Ù†ÙˆØ§Ù†: ${order.title}`,
        `â€¢ Ø§Ù„Ø®Ø¯Ù…Ø©: ${order.serviceId}`,
        `â€¢ Ø§Ù„Ø³Ø¹Ø±: ${order.price} Ø±ÙŠØ§Ù„`,
        order.details ? `â€¢ Ø§Ù„ØªÙØ§ØµÙŠÙ„: ${order.details}` : "",
        `â€¢ Ø§Ù„ÙˆÙ‚Øª: ${new Date(order.createdAt).toLocaleString()}`
      ].filter(Boolean).join("\n")
    );

    return NextResponse.json({ status: "success", order });
console.log("✅ Created order:", order);
  } catch (err: any) {
    console.error("POST /api/orders error:", err);

    return NextResponse.json(
      { status: "error", message: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

// GET /api/orders => Ø¬Ù„Ø¨ Ø§Ù„Ø·Ù„Ø¨Ø§Øª
export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
    });
console.log("✅ Created order:", order);
    return NextResponse.json({ status: "success", orders });
console.log("✅ Created order:", order);
  } catch (err: any) {
    console.error("GET /api/orders error:", err);

    return NextResponse.json(
      { status: "error", message: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}


