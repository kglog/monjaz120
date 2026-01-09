import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

// 📌 اتصال بقاعدة البيانات
const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri);
const dbName = 'monjaz';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'الرجاء إدخال البريد وكلمة المرور' },
        { status: 400 }
      );
    }

    // ✅ نضمن lowercase + بدون مسافات
    const normalizedEmail = email.trim().toLowerCase();

    await client.connect();
    const db = client.db(dbName);
    const usersCollection = db.collection('users');

    // ✅ نبحث عن المستخدم
    const user = await usersCollection.findOne({
      email: normalizedEmail,
      password: password.trim(),
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'المستخدم غير موجود أو كلمة المرور خاطئة' },
        { status: 401 }
      );
    }

    // ✅ نحذف كلمة المرور من البيانات الراجعة
    return NextResponse.json({
      success: true,
      name: user.name,
      email: user.email,
      role: user.role || 'user',
      // أرسل createdAt ليتم حفظه في localStorage عند login
      createdAt: user.createdAt ? new Date(user.createdAt).toISOString() : null,
    });
  } catch (error) {
    console.error('🚨 خطأ أثناء تسجيل الدخول:', error);
    return NextResponse.json(
      { success: false, message: 'حدث خطأ في السيرفر' },
      { status: 500 }
    );
  }
}
