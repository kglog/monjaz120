'use client';

import { useRouter } from "next/navigation";
import './account.append.css';

export default function AccountPage() {
  const router = useRouter();

  return (
    <main className="account-page min-h-screen bg-gray-50 p-6" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">حسابي</h1>
          <p className="text-gray-600">إدارة معلومات حسابك وإعداداتك</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Verification Card - التوثيق */}
          <div className="account-card card--verify bg-white p-6 rounded-lg shadow">
            <div className="flex items-center mb-4">
              <div className="bg-cyan-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl ml-3">
                ✓
              </div>
              <h2 className="text-xl font-bold text-gray-800">التوثيق</h2>
            </div>
            <p className="text-gray-600 mb-4">
              وثّق هويتك لزيادة الثقة والأمان في حسابك
            </p>
            <button
              className="primary-btn w-full py-3 bg-cyan-600 text-white font-semibold rounded-lg hover:bg-cyan-700 transition"
              onClick={() => router.push("/account/verify")}
            >
              وثّق هويتك
            </button>
          </div>

          {/* Profile Card */}
          <div className="account-card bg-white p-6 rounded-lg shadow">
            <div className="flex items-center mb-4">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl ml-3">
                👤
              </div>
              <h2 className="text-xl font-bold text-gray-800">الملف الشخصي</h2>
            </div>
            <p className="text-gray-600 mb-4">
              إدارة معلوماتك الشخصية والتواصل
            </p>
            <button
              className="w-full py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition"
              onClick={() => router.push("/profile")}
            >
              عرض الملف
            </button>
          </div>

          {/* Settings Card */}
          <div className="account-card bg-white p-6 rounded-lg shadow">
            <div className="flex items-center mb-4">
              <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl ml-3">
                ⚙️
              </div>
              <h2 className="text-xl font-bold text-gray-800">الإعدادات</h2>
            </div>
            <p className="text-gray-600 mb-4">
              تخصيص تفضيلاتك وإعدادات الحساب
            </p>
            <button
              className="w-full py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition"
              onClick={() => router.push("/settings")}
            >
              الإعدادات
            </button>
          </div>

          {/* Orders Card */}
          <div className="account-card bg-white p-6 rounded-lg shadow">
            <div className="flex items-center mb-4">
              <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl ml-3">
                📦
              </div>
              <h2 className="text-xl font-bold text-gray-800">طلباتي</h2>
            </div>
            <p className="text-gray-600 mb-4">
              تتبع ومتابعة جميع طلباتك
            </p>
            <button
              className="w-full py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition"
              onClick={() => router.push("/my-orders")}
            >
              عرض الطلبات
            </button>
          </div>

          {/* Purchases Card */}
          <div className="account-card bg-white p-6 rounded-lg shadow">
            <div className="flex items-center mb-4">
              <div className="bg-orange-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl ml-3">
                🛒
              </div>
              <h2 className="text-xl font-bold text-gray-800">مشترياتي</h2>
            </div>
            <p className="text-gray-600 mb-4">
              مراجعة مشترياتك وخدماتك
            </p>
            <button
              className="w-full py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition"
              onClick={() => router.push("/my-purchases")}
            >
              عرض المشتريات
            </button>
          </div>

          {/* Messages Card */}
          <div className="account-card bg-white p-6 rounded-lg shadow">
            <div className="flex items-center mb-4">
              <div className="bg-pink-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl ml-3">
                💬
              </div>
              <h2 className="text-xl font-bold text-gray-800">الرسائل</h2>
            </div>
            <p className="text-gray-600 mb-4">
              تواصل مع البائعين والمشترين
            </p>
            <button
              className="w-full py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition"
              onClick={() => router.push("/messages")}
            >
              الرسائل
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
