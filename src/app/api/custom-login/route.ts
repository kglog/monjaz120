import { NextResponse } from 'next/server';
<<<<<<< HEAD
import { MongoClient } from 'mongodb';

// 📌 اتصال بقاعدة البيانات
const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri);
const dbName = 'monjaz';
=======
import bcrypt from 'bcryptjs';
import connectDB from '@/utils/connectDB';
import User from '@/models/User';
>>>>>>> cf326c0 (chore: centralize CATALOG, unify category routing to ?sub=, make NAV and homepage read from catalog // ASSISTANT_FINAL: true)

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
<<<<<<< HEAD
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
    });
  } catch (error) {
    console.error('🚨 خطأ أثناء تسجيل الدخول:', error);
    return NextResponse.json(
      { success: false, message: 'حدث خطأ في السيرفر' },
      { status: 500 }
    );
=======
      return NextResponse.json({ success: false, message: 'الرجاء إدخال البريد وكلمة المرور' }, { status: 400 });
    }

    // normalize email + trim password
    const normalizedEmail = (email || '').trim().toLowerCase();
    const trimmedPassword = (password || '').trim();

    await connectDB();

    // find user by email only, then validate password to support both
    // bcrypt-hashed passwords (from other signup routes) and legacy plaintext
    const user = await User.findOne({ email: normalizedEmail }).lean();

    if (!user) {
      return NextResponse.json({ success: false, message: 'المستخدم غير موجود أو كلمة المرور خاطئة' }, { status: 401 });
    }

    const stored = (user as any).password;

    let passwordMatches = false;
    if (typeof stored === 'string') {
      // detect bcrypt hash (starts with $2a$ or $2b$ or $2y$)
      if (stored.startsWith('$2a$') || stored.startsWith('$2b$') || stored.startsWith('$2y$')) {
        passwordMatches = await bcrypt.compare(trimmedPassword, stored);
      } else {
        // legacy plaintext compare
        passwordMatches = (stored === trimmedPassword);
      }
    }

    if (!passwordMatches) {
      return NextResponse.json({ success: false, message: 'المستخدم غير موجود أو كلمة المرور خاطئة' }, { status: 401 });
    }

    // Normalize role: backend may store 'vendor' but frontend expects 'seller'
    const normalizedRole = ((user as any).role === 'vendor') ? 'seller' : ((user as any).role || 'user');

    return NextResponse.json({
      success: true,
      name: (user as any).name,
      email: (user as any).email,
      role: normalizedRole,
      createdAt: (user as any).createdAt ? new Date((user as any).createdAt).toISOString() : null,
    });
  } catch (error) {
    console.error('🚨 خطأ أثناء تسجيل الدخول:', error);
    return NextResponse.json({ success: false, message: 'حدث خطأ في السيرفر' }, { status: 500 });
>>>>>>> cf326c0 (chore: centralize CATALOG, unify category routing to ?sub=, make NAV and homepage read from catalog // ASSISTANT_FINAL: true)
  }
}
