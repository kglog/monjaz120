"use client";

import { useEffect, useState } from "react";
import {
  User,
  ShieldCheck,
  BarChart3,
  Info,
  Mail,
  UserCircle,
  CreditCard,
} from "lucide-react";

export default function AccountPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="bg-white min-h-screen py-8">
      {/* صورة واسم */}
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-cyan-600 flex items-center justify-center text-white text-2xl font-bold shadow-md">
          {user?.username ? (
            user.username.charAt(0).toUpperCase()
          ) : (
            <User className="w-10 h-10" />
          )}
        </div>
        <h1 className="mt-4 text-xl font-bold text-gray-800">
          {user?.username || "اسم المستخدم"}
        </h1>

        {/* تاريخ التسجيل */}
        {user && (
          <p className="text-sm text-gray-600">
            تاريخ التسجيل:{" "}
            {user?.createdAt
              ? new Date(user.createdAt).toLocaleDateString("ar-EG", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              : "—"}
          </p>
        )}

        <p className="text-sm text-gray-500 mt-1">
          {user ? (
            <>
              مستخدم جديد • <span className="text-cyan-600">متصل الآن</span>
            </>
          ) : (
            <>زائر • <span className="text-cyan-600">سجّل دخولك الآن</span></>
          )}
        </p>
      </div>

      {/* زر تعديل */}
      {user && (
        <div className="flex justify-center mt-6">
          <a
            href="/account/edit"
            className="border border-cyan-600 text-cyan-600 px-4 py-2 rounded-md hover:bg-cyan-600 hover:text-white transition"
          >
            تعديل الملف الشخصي
          </a>
        </div>
      )}

      {/* البطاقات */}
      <div className="max-w-5xl mx-auto mt-10 grid md:grid-cols-3 gap-6">
        {/* التوثيق */}
        <div className="border border-cyan-600 rounded-lg p-4 shadow-sm flex flex-col justify-between h-44 bg-white hover:shadow-md transition cursor-pointer !border-black !h-40">
          <div>
            <h2 className="flex items-center gap-2 text-lg font-semibold text-cyan-600">
              <ShieldCheck className="w-5 h-5" /> التوثيق
            </h2>

            {user ? (
              <>
                <ul className="text-sm text-gray-600 space-y-1 mt-2">
                  <li>
                    البريد الإلكتروني:{" "}
                    <span className="text-green-600 font-bold">✓</span>
                  </li>
                  <li>
                    رقم الجوال:{" "}
                    <span className="text-red-600 font-bold">✗</span>
                  </li>
                </ul>
                <p className="text-xs text-red-600 font-semibold mt-3">
                  لا يمكنك سحب أرباحك إلا بعد توثيق الهوية
                </p>
              </>
            ) : (
              <p className="text-sm text-gray-600 mt-2">
                حسابك محمي بالتوثيق • ننصحك بتوثيق هويتك
              </p>
            )}
          </div>
          <a
            href="/account/verify"
            className="mt-3 inline-block bg-cyan-600 text-white px-4 py-1 rounded-md text-sm font-semibold hover:bg-cyan-700 transition text-center"
          >
            وثّق هويتك
          </a>
        </div>

        {/* إحصائيات */}
        <div className="border border-cyan-600 rounded-lg p-4 shadow-sm flex flex-col justify-center h-40 bg-white hover:shadow-md transition cursor-pointer !border-black">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-cyan-600">
            <BarChart3 className="w-5 h-5" /> إحصائيات
          </h2>
          {user ? (
            <p className="text-sm text-gray-600 mt-2">آخر تواجد: الآن</p>
          ) : (
            <p className="text-sm text-gray-600 mt-2">
              سجّل دخولك لمتابعة إحصائياتك
            </p>
          )}
        </div>

        {/* نبذة عني */}
        <div className="border border-cyan-600 rounded-lg p-4 shadow-sm flex flex-col justify-center h-40 bg-white hover:shadow-md transition cursor-pointer !border-black">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-cyan-600">
            <Info className="w-5 h-5" /> نبذة عني
          </h2>
          <p className="text-gray-600 text-sm mt-2">
            {user
              ? user?.bio || "لم يكتب نبذة شخصية"
              : "سجّل دخولك لإضافة نبذة شخصية"}
          </p>
        </div>

        {/* البريد الإلكتروني */}
        <div className="border border-cyan-600 rounded-lg p-4 shadow-sm flex flex-col justify-center h-40 bg-white hover:shadow-md transition cursor-pointer !border-black">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-cyan-600">
            <Mail className="w-5 h-5" /> البريد الإلكتروني
          </h2>
          <p className="text-gray-600 text-sm mt-2">
            {user
              ? "إدارة عناوين البريد المرتبطة."
              : "سجّل دخولك لإدارة بريدك الإلكتروني."}
          </p>
        </div>

        {/* المعلومات الشخصية */}
        <div className="border border-cyan-600 rounded-lg p-4 shadow-sm flex flex-col justify-center h-40 bg-white hover:shadow-md transition cursor-pointer !border-black">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-cyan-600">
            <UserCircle className="w-5 h-5" /> المعلومات الشخصية
          </h2>
          <p className="text-gray-600 text-sm mt-2">
            {user
              ? "تعديل الاسم وصورتك وبياناتك."
              : "سجّل دخولك لتعديل بياناتك."}
          </p>
        </div>

        {/* البطاقات الائتمانية */}
        <div className="border border-cyan-600 rounded-lg p-4 shadow-sm flex flex-col justify-center h-40 bg-white hover:shadow-md transition cursor-pointer !border-black">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-cyan-600">
            <CreditCard className="w-5 h-5" /> البطاقات الائتمانية
          </h2>
          <p className="text-gray-600 text-sm mt-2">
            {user
              ? "إدارة بطاقاتك المرتبطة بالحساب."
              : "سجّل دخولك لإضافة بطاقات الدفع."}
          </p>
        </div>
      </div>
    </div>
  );
}
