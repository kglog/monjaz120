'use client';

import Link from 'next/link';

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">حسابي</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="bg-white rounded-lg p-6 shadow-md border border-cyan-600 h-40 flex flex-col justify-between hover:shadow-lg transition-shadow">
            <div>
              <h2 className="text-xl font-semibold mb-2 text-gray-800">الملف الشخصي</h2>
              <p className="text-gray-600 text-sm">إدارة معلوماتك الشخصية</p>
            </div>
            <Link 
              href="/profile" 
              className="text-cyan-600 hover:text-cyan-700 font-medium text-sm"
            >
              عرض الملف الشخصي ←
            </Link>
          </div>

          {/* Settings Card */}
          <div className="bg-white rounded-lg p-6 shadow-md border border-cyan-600 h-40 flex flex-col justify-between hover:shadow-lg transition-shadow">
            <div>
              <h2 className="text-xl font-semibold mb-2 text-gray-800">الإعدادات</h2>
              <p className="text-gray-600 text-sm">تخصيص تفضيلاتك وإعداداتك</p>
            </div>
            <Link 
              href="/settings" 
              className="text-cyan-600 hover:text-cyan-700 font-medium text-sm"
            >
              الذهاب للإعدادات ←
            </Link>
          </div>

          {/* Verification Card - h-44 to make it taller initially */}
          <div className="bg-white rounded-lg p-6 shadow-md border border-cyan-600 h-44 flex flex-col justify-between hover:shadow-lg transition-shadow">
            <div>
              <h2 className="text-xl font-semibold mb-2 text-gray-800">التوثيق</h2>
              <p className="text-gray-600 text-sm">وثّق هويتك لزيادة مصداقيتك</p>
            </div>
            <Link 
              href="/account/verify" 
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-md text-center font-medium transition-colors text-sm"
            >
              وثّق هويتك
            </Link>
          </div>

          {/* Orders Card */}
          <div className="bg-white rounded-lg p-6 shadow-md border border-cyan-600 h-40 flex flex-col justify-between hover:shadow-lg transition-shadow">
            <div>
              <h2 className="text-xl font-semibold mb-2 text-gray-800">طلباتي</h2>
              <p className="text-gray-600 text-sm">تتبع حالة طلباتك</p>
            </div>
            <Link 
              href="/orders" 
              className="text-cyan-600 hover:text-cyan-700 font-medium text-sm"
            >
              عرض الطلبات ←
            </Link>
          </div>

          {/* Purchases Card */}
          <div className="bg-white rounded-lg p-6 shadow-md border border-cyan-600 h-40 flex flex-col justify-between hover:shadow-lg transition-shadow">
            <div>
              <h2 className="text-xl font-semibold mb-2 text-gray-800">مشترياتي</h2>
              <p className="text-gray-600 text-sm">راجع مشترياتك السابقة</p>
            </div>
            <Link 
              href="/purchases" 
              className="text-cyan-600 hover:text-cyan-700 font-medium text-sm"
            >
              عرض المشتريات ←
            </Link>
          </div>

          {/* Services Card */}
          <div className="bg-white rounded-lg p-6 shadow-md border border-cyan-600 h-40 flex flex-col justify-between hover:shadow-lg transition-shadow">
            <div>
              <h2 className="text-xl font-semibold mb-2 text-gray-800">خدماتي</h2>
              <p className="text-gray-600 text-sm">إدارة الخدمات التي تقدمها</p>
            </div>
            <Link 
              href="/services" 
              className="text-cyan-600 hover:text-cyan-700 font-medium text-sm"
            >
              عرض الخدمات ←
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
