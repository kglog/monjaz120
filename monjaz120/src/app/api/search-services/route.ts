import { NextResponse } from 'next/server';
// Legacy MongoDB logic preserved below as comments (additive only)
import { MongoClient } from 'mongodb';
// Prisma integration (additive)
import prisma from '@/lib/prisma';

// ✅ بيانات وهمية احتياطية
const fakeServices = [
  { id: 1, title: 'تصميم شعار احترافي', description: 'شعار مميز لعلامتك التجارية', price: 50 },
  { id: 2, title: 'برمجة تطبيق جوال', description: 'تطبيق iOS و Android كامل', price: 300 },
  { id: 3, title: 'تحسين ظهور الموقع في Google', description: 'SEO احترافي لرفع الترتيب', price: 200 },
  { id: 4, title: 'ذكاء اصطناعي يكتب مقالات', description: 'مقالات بجودة عالية وسرعة خارقة', price: 100 },
];

// ✅ إعدادات MongoDB
const uri = 'mongodb://127.0.0.1:27017';
const dbName = 'monjaz';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const query = body.query?.toLowerCase() || '';

    console.log('🔍 تم استلام البحث عن:', query);

    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { success: false, message: 'كلمة البحث غير صالحة' },
        { status: 400 }
      );
    }

    // ✅ الاتصال بقاعدة البيانات
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db(dbName);
    const services = db.collection('services');

    // ✅ البحث المطور: العنوان + الوصف + التصنيف
    const results = await services.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } },
      ]
    }).toArray();


    // Prisma version (additive)
    const results_prisma = await prisma.service.findMany({
      where: {
        OR: [
          { title: { contains: query } },
          { description: { contains: query } },
          // { category: { contains: query } }, // حقل category غير موجود في الموديل
        ]
      }
    });


    if (results.length > 0) {
      return NextResponse.json({ success: true, results });
    }

    // إذا فيه نتائج من Prisma
    if (results_prisma.length > 0) {
      return NextResponse.json({ success: true, results: results_prisma });
    }

    // ✅ fallback: استخدام بيانات وهمية إذا ما فيه نتائج
    console.warn('⚠️ لا توجد نتائج من MongoDB، نستخدم بيانات وهمية');
    const fallback = fakeServices.filter(service =>
      service.title.toLowerCase().includes(query) ||
      service.description.toLowerCase().includes(query)
    );

    return NextResponse.json({ success: true, results: fallback, fallback: true });

  } catch (err) {
    console.error('🔴 خطأ في API:', err);

    // ✅ fallback عند الخطأ الكامل
    try {
      const body = await req.json();
      const query = body.query?.toLowerCase() || '';

      const fallback = fakeServices.filter(service =>
        service.title.toLowerCase().includes(query) ||
        service.description.toLowerCase().includes(query)
      );

      return NextResponse.json(
        { success: true, results: fallback, fallback: true },
        { status: 200 }
      );
    } catch (jsonErr) {
      return NextResponse.json(
        { success: false, message: 'فشل في المعالجة' },
        { status: 500 }
      );
    }
  }
}
