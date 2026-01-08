import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import Service from "@/models/Service";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const keyword = body.searchQuery?.toLowerCase() || '';
    const category = body.category || '';

    const regex = new RegExp(keyword, 'i');

    const query: any = {
      $or: [
        { title: { $regex: regex } },
        { description: { $regex: regex } },
        { category: { $regex: regex } },
      ],
    };

    if (category && category !== 'الكل') {
      query.category = category;
    }

    const services = await Service.find(query)
      .select("title description price slug _id image")
      .sort({ createdAt: -1 })
      .lean();

    if (services.length > 0) {
      return NextResponse.json({
        status: "success",
        results: services,
      });
    }

    // ✅ نتائج احتياطية وهمية
    const fallbackResults = [
      { id: 1, title: 'حلول جاهزة' },
      { id: 2, title: 'تطوير مخصص' },
      { id: 3, title: 'تصميم واجهة' },
    ].filter(item => item.title.toLowerCase().includes(keyword));

    return NextResponse.json({
      status: "success",
      results: fallbackResults,
    });

  } catch (error) {
    console.error("Search API Error:", error);

    // ✅ نتائج وهمية في حال الخطأ
    const fallbackResults = [
      { id: 1, title: 'حلول جاهزة' },
      { id: 2, title: 'تطوير مخصص' },
      { id: 3, title: 'تصميم واجهة' },
    ];

    return NextResponse.json({
      status: "error",
      results: fallbackResults,
    });
  }
}
