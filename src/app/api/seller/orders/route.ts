import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "seller-orders.json");

function readData() {
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    return [];
  }
}

export async function GET() {
  const items = readData();
  return NextResponse.json({ ok: true, orders: items });
}

// simple PATCH-like action endpoint
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, action } = body;
    const items = readData();
    const idx = items.findIndex((o: any) => o.id === id);
    if (idx === -1) return NextResponse.json({ ok: false, error: "not found" }, { status: 404 });
    if (action === "start") items[idx].status = "in_progress";
    if (action === "complete") items[idx].status = "completed";
    fs.writeFileSync(DATA_FILE, JSON.stringify(items, null, 2));
    return NextResponse.json({ ok: true, order: items[idx] });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
