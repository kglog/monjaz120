import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "seller-services.json");

function readData() {
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    return [];
  }
}

function writeData(data: any) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    console.log(`[api] PATCH /api/seller/services/${id} called`);
    const body = await req.json().catch(() => ({}));
    const items = readData();
    const idx = items.findIndex((s: any) => (s.id || s._id || '') === id);
    if (idx === -1) return NextResponse.json({ ok: false, error: 'not found' }, { status: 404 });

    const svc = items[idx];
    // apply allowed updates
    const allowed = ['title', 'priceFrom', 'description', 'images', 'active'];
    for (const k of Object.keys(body || {})) {
      if (allowed.includes(k)) svc[k] = body[k];
    }

    items[idx] = svc;
    writeData(items);
    return NextResponse.json({ ok: true, service: svc });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    console.log(`[api] DELETE /api/seller/services/${id} called`);
    const items = readData();
    const idx = items.findIndex((s: any) => (s.id || s._id || '') === id);
    if (idx === -1) return NextResponse.json({ ok: false, error: 'not found' }, { status: 404 });
    const removed = items.splice(idx, 1)[0];
    writeData(items);
    console.log(`[api] DELETE removed service ${id}`);
    return NextResponse.json({ ok: true, service: removed });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}

// ASSISTANT_FINAL: true
