import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

// اتصال بقاعدة البيانات
const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri);
const dbName = 'monjaz';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    await client.connect();
    const db = client.db(dbName);
    const usersCollection = db.collection('users');

    const user = await usersCollection.findOne({ email, password });

    if (!user) {
      return NextResponse.json({ success: false, message: 'بيانات غير صحيحة' }, { status: 401 });
    }

    // نرجع بيانات المستخدم (بدون كلمة المرور)
    return NextResponse.json({
      success: true,
      name: user.name,
      email: user.email,
      role: user.role
    });

  } catch (error) {
    console.error('خطأ أثناء تسجيل الدخول:', error);
    return NextResponse.json({ success: false, message: 'حدث خطأ في السيرفر' }, { status: 500 });
  }
}
