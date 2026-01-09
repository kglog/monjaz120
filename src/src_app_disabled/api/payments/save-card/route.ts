import { NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "@/lib/prisma";

const stripeSecret = process.env.STRIPE_SECRET_KEY;

export async function POST(req: Request) {
  if (!stripeSecret) {
    return NextResponse.json({ message: "Stripe not configured" }, { status: 500 });
  }

  try {
    const body = await req.json();
    const { paymentMethodId, userId } = body;

    if (!paymentMethodId || !userId) {
      return NextResponse.json({ message: "paymentMethodId and userId required" }, { status: 400 });
    }

    const stripe = new Stripe(stripeSecret, { apiVersion: "2022-11-15" });

    // Retrieve payment method details from Stripe
    const pm = await stripe.paymentMethods.retrieve(paymentMethodId as string);

    if (!pm || !pm.card) {
      return NextResponse.json({ message: "Invalid payment method" }, { status: 400 });
    }

    const brand = pm.card.brand || "unknown";
    const last4 = pm.card.last4 || "0000";
    const expMonth = pm.card.exp_month || 0;
    const expYear = pm.card.exp_year || 0;

    // Save reference in DB (do not store full card number or CVV)
    const saved = await prisma.card.create({
      data: {
        userId: userId,
        stripePaymentMethodId: paymentMethodId,
        brand,
        last4,
        expMonth: Number(expMonth),
        expYear: Number(expYear),
      },
    });

    return NextResponse.json({ ok: true, card: saved });
  } catch (err: any) {
    console.error("save-card error", err);
    return NextResponse.json({ message: err?.message || "Server error" }, { status: 500 });
  }
}

// ASSISTANT_FINAL: true
