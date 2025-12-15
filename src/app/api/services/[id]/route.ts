import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

<<<<<<< HEAD
// GET /api/services/[id]
=======
>>>>>>> cf326c0 (chore: centralize CATALOG, unify category routing to ?sub=, make NAV and homepage read from catalog // ASSISTANT_FINAL: true)
export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
<<<<<<< HEAD
    const service = await prisma.service.findUnique({ where: { id: params.id } });
    if (!service) return NextResponse.json({ error: "غير موجود" }, { status: 404 });
    return NextResponse.json(service);
  } catch {
    return NextResponse.json({ error: "فشل في الجلب" }, { status: 500 });
  }
}

// PUT /api/services/[id]
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { title, description, price } = body;
    const updated = await prisma.service.update({
      where: { id: params.id },
      data: {
        title,
        description,
        price: price !== undefined ? parseFloat(price) : undefined,
      },
    });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "فشل في التحديث" }, { status: 500 });
  }
}

// DELETE /api/services/[id]
export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.service.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "فشل في الحذف" }, { status: 500 });
=======
    // Next.js may provide `params` as a thenable/proxy in some runtime
    // environments; await it before accessing properties to satisfy the
    // runtime/lint requirement. This is a no-op if `params` is a plain object.
    const { id } = await (params as any);
    // لو الـ id عددي في DB
    const numId = Number(id);
    const service = await prisma.service.findFirst({
      where: Number.isNaN(numId) ? { id } as any : { id: numId } as any,
      include: { user: true },
    });
    if (!service) {
      return NextResponse.json({ error: "الخدمة غير موجودة" }, { status: 404 });
    }
    return NextResponse.json({ ...service, id: String(service.id) });
  } catch (err) {
    return NextResponse.json({ error: "فشل في جلب الخدمة" }, { status: 500 });
>>>>>>> cf326c0 (chore: centralize CATALOG, unify category routing to ?sub=, make NAV and homepage read from catalog // ASSISTANT_FINAL: true)
  }
}
