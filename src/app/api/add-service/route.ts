export async function POST(req: Request) {
  const body = await req.json();
  console.log('🚀 خدمة جديدة تم استقبالها:', body);
  return Response.json({
    success: true,
    message: '✅ تم حفظ الخدمة مؤقتاً بنجاح!',
    data: body,
  });
}
