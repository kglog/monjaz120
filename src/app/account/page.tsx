'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AccountPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-br from-cyan-50 to-sky-100 p-6" dir="rtl">
      {/* Header Section */}
      <section className="max-w-6xl mx-auto mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-cyan-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-cyan-600 flex items-center justify-center text-white text-2xl font-bold">
              م
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-cyan-900">مرحباً بك، محمد</h1>
              <p className="text-gray-600 text-sm mt-1">عضو منذ يناير 2025</p>
            </div>
            <Link 
              href="/settings"
              className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition font-semibold"
            >
              الإعدادات
            </Link>
          </div>
        </div>
      </section>

      {/* Cards Grid Section */}
      <section className="max-w-6xl mx-auto">
        <h2 className="text-xl font-bold text-cyan-900 mb-4">نظرة عامة على الحساب</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Statistics */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-700 text-xl">
                📊
              </div>
              <h3 className="text-lg font-bold text-gray-800">الإحصائيات</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">الخدمات المنشورة</span>
                <span className="font-bold text-cyan-700">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">الطلبات المكتملة</span>
                <span className="font-bold text-green-600">45</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">التقييم</span>
                <span className="font-bold text-yellow-600">⭐ 4.8</span>
              </div>
            </div>
            <button 
              onClick={() => router.push('/statistics')}
              className="mt-4 w-full py-2 bg-cyan-50 text-cyan-700 rounded-lg hover:bg-cyan-100 transition font-semibold text-sm"
            >
              عرض التفاصيل
            </button>
          </div>

          {/* Card 2: Wallet */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-xl">
                💰
              </div>
              <h3 className="text-lg font-bold text-gray-800">المحفظة</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">الرصيد المتاح</span>
                <span className="font-bold text-green-600">3,250 ريال</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">قيد الانتظار</span>
                <span className="font-bold text-orange-600">850 ريال</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">إجمالي الأرباح</span>
                <span className="font-bold text-cyan-700">28,900 ريال</span>
              </div>
            </div>
            <button 
              className="mt-4 w-full py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition font-semibold text-sm"
            >
              سحب الأرباح
            </button>
          </div>

          {/* Card 3: Identity Verification - THIS IS THE SPECIAL CARD */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-700 text-xl">
                🎫
              </div>
              <h3 className="text-lg font-bold text-gray-800">توثيق الهوية</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-gray-600 text-sm">الحالة:</span>
                <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-semibold">
                  غير موثق
                </span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                وثّق هويتك لزيادة الثقة مع العملاء ورفع حد السحب. العملية سهلة وآمنة تماماً.
              </p>
            </div>
            <button 
              onClick={() => router.push('/account/verify')}
              className="mt-4 w-full py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition font-semibold text-sm"
            >
              ابدأ التوثيق الآن
            </button>
          </div>

          {/* Card 4: Orders */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 text-xl">
                📦
              </div>
              <h3 className="text-lg font-bold text-gray-800">الطلبات</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">طلبات جديدة</span>
                <span className="font-bold text-purple-700">8</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">قيد التنفيذ</span>
                <span className="font-bold text-blue-600">5</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">مكتملة</span>
                <span className="font-bold text-green-600">142</span>
              </div>
            </div>
            <button 
              onClick={() => router.push('/orders')}
              className="mt-4 w-full py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition font-semibold text-sm"
            >
              إدارة الطلبات
            </button>
          </div>

          {/* Card 5: Services */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-xl">
                ⚙️
              </div>
              <h3 className="text-lg font-bold text-gray-800">خدماتي</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">خدمات نشطة</span>
                <span className="font-bold text-blue-700">9</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">مسودات</span>
                <span className="font-bold text-gray-600">3</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">إجمالي المبيعات</span>
                <span className="font-bold text-green-600">256</span>
              </div>
            </div>
            <button 
              onClick={() => router.push('/services')}
              className="mt-4 w-full py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition font-semibold text-sm"
            >
              إدارة الخدمات
            </button>
          </div>

          {/* Card 6: Messages */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-pink-700 text-xl">
                💬
              </div>
              <h3 className="text-lg font-bold text-gray-800">الرسائل</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">رسائل غير مقروءة</span>
                <span className="font-bold text-pink-700">4</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">محادثات نشطة</span>
                <span className="font-bold text-blue-600">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">إجمالي المحادثات</span>
                <span className="font-bold text-gray-600">87</span>
              </div>
            </div>
            <button 
              onClick={() => router.push('/messages')}
              className="mt-4 w-full py-2 bg-pink-50 text-pink-700 rounded-lg hover:bg-pink-100 transition font-semibold text-sm"
            >
              فتح الرسائل
            </button>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <section className="max-w-6xl mx-auto mt-8">
        <div className="bg-white rounded-lg shadow-sm p-4 border border-cyan-100">
          <p className="text-center text-gray-500 text-sm">
            آخر تسجيل دخول: اليوم الساعة 2:30 مساءً
          </p>
        </div>
      </section>
    </main>
  );
}
