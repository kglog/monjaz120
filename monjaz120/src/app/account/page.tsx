"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  User,
  ShieldCheck,
  BarChart3,
  Info,
  Mail,
  UserCircle,
  CreditCard,
} from "lucide-react";
import VerifyLiveStatus from "@/app/account/_components/VerifyLiveStatus";

export default function AccountPage() {
  const searchParams = useSearchParams();
  const [verifyStatus, setVerifyStatus] = useState<"unverified" | "pending" | "verified" | "rejected">("unverified");
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);

  const formatDate = (value: any) => {
    if (!value) return null;
    try {
      const ts = typeof value === "number" || !isNaN(Number(value)) ? Number(value) : value;
      const d = typeof ts === "number" ? new Date(ts) : new Date(ts);
      if (isNaN(d.getTime())) return null;
      return d.toLocaleString();
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    const q = searchParams.get("verifyStatus");
    if (q) {
      const v = q.toLowerCase();
      if (v === "verified" || v === "accepted") setVerifyStatus("verified");
      else if (v === "pending") setVerifyStatus("pending");
      else if (v === "rejected") setVerifyStatus("rejected");
      else setVerifyStatus("unverified");
    }
  }, [searchParams]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      if (raw) setUser(JSON.parse(raw));
    } catch (e) {}
  }, []);

  const registrationDate = user
    ? formatDate(user.createdAt || user.created_at || user.registeredAt || user.registered_at || user.joinedAt)
    : null;
  const lastSeen = user
    ? formatDate(user.lastActive || user.last_active || user.lastSeen || user.last_seen || user.last_online)
    : null;

  return (
    <div className="bg-white min-h-screen py-8">
      {verifyStatus === "pending" && (
        <div className="max-w-5xl mx-auto mb-6 p-4 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded">
          <div className="font-semibold">✅ تم استلام طلب توثيق هويتك بنجاح، وجارٍ التحقق من الصور والبيانات.</div>
          <div className="text-sm mt-1">📩 سيتم إشعارك داخل المنصة عند قبول التوثيق أو في حال احتجنا صورة أو بيانات إضافية.</div>
        </div>
      )}

      <div className="max-w-5xl mx-auto mb-6 px-4">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-orange-600 flex items-center justify-center text-white text-3xl font-bold shadow-md overflow-hidden border border-black">
            {user ? (
              user.avatar || user.avatarUrl ? (
                // @ts-ignore allow image url if present
                <img src={user.avatar || user.avatarUrl} alt={user.username || "avatar"} className="w-full h-full object-cover" />
              ) : (
                (user.username && user.username.length) ? user.username.charAt(0).toUpperCase() : <User className="w-10 h-10" />
              )
            ) : (
              <User className="w-10 h-10" />
            )}
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800">{user?.username || user?.name || "اسم المستخدم"}</h2>
            <div className="text-sm text-gray-600 mt-1">
              {user?.role ? <span className="capitalize">{user.role}</span> : <span>مستخدم</span>}
              {registrationDate && <span className="mx-3">• تاريخ التسجيل: {registrationDate}</span>}
              {lastSeen && <div className="text-xs text-gray-500 mt-1">آخر تواجد: {lastSeen}</div>}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-10 grid md:grid-cols-3 gap-6">
        <section className="block border border-cyan-600 rounded-lg p-4 shadow-sm flex flex-col justify-center h-40 bg-white hover:shadow-md transition">
          <div>
            <h3 className="text-lg font-semibold text-cyan-600">التوثيق</h3>
            <p className="text-sm text-gray-700 mt-2">
              {verifyStatus === "verified"
                ? "الحالة: موثّق ✅"
                : verifyStatus === "pending"
                ? "الحالة: قيد المراجعة…"
                : verifyStatus === "rejected"
                ? "الحالة: مرفوض"
                : "الحالة: لم يتم التوثيق بعد"}
            </p>

            <div className="mt-3">
              <a
                href="/account/verify"
                className="inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-medium bg-cyan-600 text-white hover:bg-cyan-700"
              >
                وثّق هويتك الآن
              </a>
            </div>

            <div className="sr-only">
              <VerifyLiveStatus />
            </div>
          </div>
        </section>

        <a
          href="/seller/dashboard"
          className="block border border-cyan-600 rounded-lg p-4 shadow-sm flex flex-col justify-center h-40 bg-white hover:shadow-md transition"
        >
          <h2 className="flex items-center gap-2 text-lg font-semibold text-cyan-600">
            <BarChart3 className="w-5 h-5" /> لوحة تحكم (البائع)
          </h2>
          {user ? (
            <div className="mt-2 text-sm text-gray-700">
              {user.role === 'seller' ? (
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                  <span>خلاصات سريعة: </span>
                    <div className="flex gap-3 mt-2 sm:mt-0">
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">الخدمات: {stats?.servicesCount ?? 0}</span>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">الطلبات: {stats?.ordersCount ?? 0}</span>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">الإيرادات: {`${stats?.totalEarnings ?? 0} ر.س`}</span>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-600">اضغط للدخول إلى لوحة البائع (يتطلب دور بائع)</p>
              )}
            </div>
          ) : (
            <p className="text-sm text-gray-600 mt-2">سجّل دخولك لمتابعة لوحة التحكم</p>
          )}
        </a>

        <div className="border border-cyan-600 rounded-lg p-4 shadow-sm flex flex-col justify-center h-40 bg-white hover:shadow-md transition cursor-pointer">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-cyan-600">
            <Info className="w-5 h-5" /> نبذة عني
          </h2>
          <p className="text-gray-600 text-sm mt-2">
            {user
              ? user?.bio || "لم يكتب نبذة شخصية"
              : "سجّل دخولك لإضافة نبذة شخصية"}
          </p>
        </div>

      <section className="bg-white rounded-xl shadow p-4 md:p-5 border border-gray-200">
        <h2 className="flex items-center gap-2 text-lg font-bold mb-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gray-800 text-white text-sm">
            ▭
          </span>
          حساباتك المربوطة للسحب
        </h2>

        {verifyStatus === "unverified" && (
          <>
            <p className="text-sm text-gray-700 mb-2">
              لا يمكن إضافة أو تفعيل حسابات السحب قبل توثيق الهوية.
            </p>
            <button
              onClick={() => (window.location.href = "/account/verify")}
              className="w-full py-2.5 rounded-lg bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200"
            >
              وثّق الهوية أولاً
            </button>
          </>
        )}

        {verifyStatus === "pending" && (
          <>
            <p className="text-sm text-gray-700 mb-2">
              جارِ مراجعة الهوية. سيتم تفعيل قسم حسابات السحب تلقائيًا بعد قبول
              التوثيق.
            </p>
            <button
              disabled
              className="w-full py-2.5 rounded-lg bg-gray-100 text-gray-500 font-semibold cursor-not-allowed"
            >
              جارِ مراجعة الهوية…
            </button>
          </>
        )}

        {verifyStatus === "verified" && (
          <>
            <p className="text-sm text-gray-700 mb-2">
              يمكنك الآن إضافة حساب بنكي أو طريقة سحب لأرباحك.
            </p>
            <button
              onClick={() => (window.location.href = "/account/bank-accounts")}
              className="w-full py-2.5 rounded-lg bg-cyan-600 text-white font-semibold hover:bg-cyan-700"
            >
              أضِف حساباً للسحب
            </button>
          </>
        )}
      </section>

        <div className="border border-cyan-600 rounded-lg p-4 shadow-sm flex flex-col justify-center h-40 bg-white hover:shadow-md transition cursor-pointer">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-cyan-600">
            <Mail className="w-5 h-5" /> البريد الإلكتروني
          </h2>
          <p className="text-gray-600 text-sm mt-2">
            {user
              ? "إدارة عناوين البريد المرتبطة."
              : "سجّل دخولك لإدارة بريدك الإلكتروني."}
          </p>
        </div>

        <a
          href={user ? "/account/edit" : "/login"}
          className="block border border-cyan-600 rounded-lg p-4 shadow-sm flex flex-col justify-center h-40 bg-white hover:shadow-md transition"
        >
          <h2 className="flex items-center gap-2 text-lg font-semibold text-cyan-600">
            <UserCircle className="w-5 h-5" /> المعلومات الشخصية
          </h2>
          <p className="text-gray-600 text-sm mt-2">
            {user
              ? "تعديل الاسم وصورتك وبياناتك."
              : "سجّل دخولك لتعديل بياناتك."}
          </p>
        </a>

        <a
          href="/account/cards"
          className="block border border-cyan-600 rounded-lg p-4 shadow-sm flex flex-col justify-center h-40 bg-white hover:shadow-md transition"
        >
          <h2 className="flex items-center gap-2 text-lg font-semibold text-cyan-600">
            <CreditCard className="w-5 h-5" /> البطاقات الائتمانية
          </h2>
          <p className="text-gray-600 text-sm mt-2">
            {user
              ? "إدارة بطاقاتك المرتبطة بالحساب."
              : "سجّل دخولك لإضافة بطاقات الدفع."}
          </p>
        </a>
      </div>
    </div>
  );
}

// ASSISTANT_FINAL: true

