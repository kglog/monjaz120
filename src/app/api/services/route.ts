<<<<<<< HEAD
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
=======
// 📄 src/app/api/services/route.ts
import { NextResponse } from "next/server";

const services = [
  { id: "1", title: "تصميم شعار احترافي", description: "شعار يعكس هوية مشروعك.", price: 50,  rating: 4.9, seller: "أحمد",  category: "تصميم" },
  { id: "2", title: "تحليل بيانات بالذكاء الاصطناعي", description: "استخراج أنماط وتقارير.", price: 100, rating: 4.8, seller: "نورة",  category: "بيانات" },
  { id: "3", title: "موقع شخصي Next.js", description: "موقع سريع وجاهز للنشر.", price: 250, rating: 4.7, seller: "سالم",  category: "برمجة وتطوير" },
];
>>>>>>> cf326c0 (chore: centralize CATALOG, unify category routing to ?sub=, make NAV and homepage read from catalog // ASSISTANT_FINAL: true)

// GET /api/services => عرض جميع الخدمات
export async function GET() {
<<<<<<< HEAD
  try {
    const services = await prisma.service.findMany({
      include: { user: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(services);
  } catch (err) {
    return NextResponse.json({ error: "فشل في جلب الخدمات" }, { status: 500 });
  }
}

// POST /api/services => إضافة خدمة جديدة
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, price, userId } = body;

    if (!title || !description || !price || !userId) {
      return NextResponse.json(
        { error: "حقول ناقصة" },
        { status: 400 }
      );
    }

    const service = await prisma.service.create({
      data: { title, description, price: parseFloat(price), userId },
    });

    return NextResponse.json(service);
  } catch (err) {
    return NextResponse.json({ error: "فشل في إضافة الخدمة" }, { status: 500 });
  }
=======
  return NextResponse.json({ items: services });
>>>>>>> cf326c0 (chore: centralize CATALOG, unify category routing to ?sub=, make NAV and homepage read from catalog // ASSISTANT_FINAL: true)
}
