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

export async function GET(req: Request) {
  try {
    const items = readData();
    const url = new URL(req.url);
    const sp = url.searchParams;
    const category = sp.get('category');
    const subcategory = sp.get('subcategory');
    const seller = sp.get('seller');

    let out = items;
    if (category) {
      out = out.filter((it: any) => (String(it.category || it.type || it.slug || '').toLowerCase() === String(category).toLowerCase()) || (String(it.subcategory || '').toLowerCase() === String(category).toLowerCase()));
    }
    if (subcategory) {
      out = out.filter((it: any) => String(it.subcategory || it.slug || it.type || '').toLowerCase() === String(subcategory).toLowerCase());
    }
    if (seller) {
      out = out.filter((it: any) => String(it.seller || it.author || '').toLowerCase() === String(seller).toLowerCase());
    }

    return NextResponse.json({ ok: true, services: out });
  } catch (err) {
    const items = readData();
    return NextResponse.json({ ok: true, services: items });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const items = readData();
    const newItem: any = {
      id: `svc-${Date.now()}`,
      title: body.title || "خدمة جديدة",
      seller: body.seller || "بائع تجريبي",
      priceFrom: body.priceFrom || "0.00 ر.س",
      rating: 0,
      createdAt: new Date().toISOString(),
    };
    // preserve optional category/subcategory/slug fields from client payload so
    // category pages can filter correctly
    if (body.category) newItem.category = body.category;
    if (body.subcategory) newItem.subcategory = body.subcategory;
    if (body.slug) newItem.slug = body.slug;
    // handle images (base64) in dev: write to data/uploads
    try {
      if (body.images && Array.isArray(body.images) && body.images.length) {
        const uploadsDir = path.join(process.cwd(), "data", "uploads");
        if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
        newItem["images"] = [];
        for (const img of body.images) {
          // img: { filename, data } where data is base64 data URI or raw base64
          const filename = `${Date.now()}-${(img.filename || 'img').replace(/[^a-zA-Z0-9._-]/g,'')}`;
          let data = img.data || "";
          const commaIdx = data.indexOf(',');
          if (commaIdx !== -1) data = data.slice(commaIdx + 1);
          const buf = Buffer.from(data, 'base64');
          const outPath = path.join(uploadsDir, filename);
          fs.writeFileSync(outPath, buf);
          newItem["images"].push(`/data/uploads/${filename}`);
        }
      }
    } catch (e) {
      console.error('image save error', e);
    }
    items.unshift(newItem);
    writeData(items);
    return NextResponse.json({ ok: true, service: newItem });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}

// ASSISTANT_FINAL: true
