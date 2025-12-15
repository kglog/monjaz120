"use client";
<<<<<<< HEAD

import { useEffect, useState } from "react";
import { User } from "lucide-react";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
=======
import React from "react";

import { useEffect, useState } from "react";
import { User } from "lucide-react";
import useCurrentUser from "../components/useCurrentUser";

type VendorStats = {
  ordersCount?: number;
  totalEarnings?: number;
  servicesCount?: number;
};

export default function ProfilePage() {
  const { user: currentUser, loading } = useCurrentUser();
  const [localUser, setLocalUser] = useState<any>(null);
  const [stats, setStats] = useState<VendorStats | null>(null);
  const [loadingStats, setLoadingStats] = useState(false);
>>>>>>> cf326c0 (chore: centralize CATALOG, unify category routing to ?sub=, make NAV and homepage read from catalog // ASSISTANT_FINAL: true)

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
<<<<<<< HEAD
      setUser(JSON.parse(storedUser));
    }
  }, []);

=======
      setLocalUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    // If the current user is a seller, fetch vendor dashboard and services count
    let mounted = true;
    async function loadStats() {
      if (!currentUser || currentUser.role !== "seller") return;
      setLoadingStats(true);
      try {
        const [dashRes, svcRes] = await Promise.all([
          fetch("/api/vendor/dashboard"),
          fetch("/api/seller/services"),
        ]);
        const dash = await dashRes.json();
        const svcs = await svcRes.json();
        if (!mounted) return;
        setStats({
          ordersCount: dash.ordersCount ?? dash?.data?.ordersCount ?? 0,
          totalEarnings: dash.totalEarnings ?? dash?.data?.totalEarnings ?? 0,
          servicesCount: Array.isArray(svcs?.services) ? svcs.services.length : 0,
        });
      } catch (e) {
        // ignore and keep stats null
      } finally {
        if (mounted) setLoadingStats(false);
      }
    }

    loadStats();
    return () => {
      mounted = false;
    };
  }, [currentUser]);

  const displayName = currentUser?.name || localUser?.username || "اسم المستخدم";

>>>>>>> cf326c0 (chore: centralize CATALOG, unify category routing to ?sub=, make NAV and homepage read from catalog // ASSISTANT_FINAL: true)
  return (
    <div className="bg-white min-h-screen py-8">
      {/* صورة واسم */}
      <div className="flex flex-col items-center">
<<<<<<< HEAD
        <div className="w-28 h-28 rounded-full bg-orange-600 flex items-center justify-center text-white text-4xl font-bold shadow-md">
          {user?.username
            ? user.username.charAt(0).toUpperCase()
            : <User className="w-12 h-12" />}
        </div>
        <h1 className="mt-4 text-xl font-bold text-gray-800">
          {user?.username || "اسم المستخدم"}
        </h1>
        <p className="text-sm text-gray-500">
          مستخدم جديد • <span className="text-green-600">متصل الآن</span>
        </p>
=======
        <div className="w-28 h-28 rounded-full bg-orange-600 flex items-center justify-center text-white text-4xl font-bold shadow-md overflow-hidden border border-black">
          {displayName && displayName.length ? displayName.charAt(0).toUpperCase() : <User className="w-12 h-12" />}
        </div>
        <h1 className="mt-4 text-xl font-bold text-gray-800">{displayName}</h1>
        {/* المسمى الوظيفي تحت الاسم إذا موجود */}
        {localUser?.job ? (
          <p className="text-sm text-gray-700">{localUser.job}</p>
        ) : (
          <p className="text-sm text-gray-500">
            {currentUser ? (
              <>
                {currentUser.role === "seller" ? (
                  <span className="text-blue-600">بائع</span>
                ) : (
                  <span>مستخدم</span>
                )}
                &nbsp;•&nbsp;<span className="text-green-600">متصل الآن</span>
              </>
            ) : (
              <>مستخدم جديد • <span className="text-green-600">متصل الآن</span></>
            )}
          </p>
        )}
>>>>>>> cf326c0 (chore: centralize CATALOG, unify category routing to ?sub=, make NAV and homepage read from catalog // ASSISTANT_FINAL: true)
      </div>

      {/* أزرار */}
      <div className="flex justify-center mt-6">
<<<<<<< HEAD
        <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition">
          تعديل الملف الشخصي
        </button>
=======
        <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition">تعديل الملف الشخصي</button>
      </div>

      {/* الأقسام */}
      <div className="max-w-4xl mx-auto mt-10 grid md:grid-cols-2 gap-6">
        {/* نبذة */}
        <div className="bg-gray-50 border rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-2">نبذة عني</h2>
          <p className="text-gray-600 text-sm">{localUser?.bio || "لم يكتب نبذة شخصية"}</p>
        </div>

        {/* إحصائيات */}
        <div className="bg-gray-50 border rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">إحصائيات</h2>

          {/* Seller view */}
          {currentUser && currentUser.role === "seller" && (
            <div className="space-y-3">
              {/* helper formatters */}
              {/* @ts-ignore client-only Intl usage is ok */}
              {(() => {
                const fmtNumber = (n: any) => (n === null || n === undefined ? "0" : Number(n).toLocaleString("ar-EG"));
                const fmtCurrency = (n: any) => (n === null || n === undefined ? "0 ر.س" : new Intl.NumberFormat("ar-SA", { style: "currency", currency: "SAR" }).format(Number(n)));
                return (
                  <>
                    <div className="flex justify-between items-center bg-white p-3 rounded border">
                      <div className="text-gray-700">الخدمات</div>
                      <div className="text-lg font-semibold">{loadingStats ? "..." : fmtNumber(stats?.servicesCount ?? 0)}</div>
                    </div>

                    <div className="flex justify-between items-center bg-white p-3 rounded border">
                      <div className="text-gray-700">الطلبات</div>
                      <div className="text-lg font-semibold">{loadingStats ? "..." : fmtNumber(stats?.ordersCount ?? 0)}</div>
                    </div>

                    <div className="flex justify-between items-center bg-white p-3 rounded border">
                      <div className="text-gray-700">الإيرادات الكلية</div>
                      <div className="text-lg font-semibold">{loadingStats ? "..." : fmtCurrency(stats?.totalEarnings ?? 0)}</div>
                    </div>

                    <div className="flex justify-between items-center bg-white p-3 rounded border">
                      <div className="text-gray-700">عدد العملاء</div>
                      <div className="text-lg font-semibold">{loadingStats ? "..." : "—"}</div>
                    </div>

                    <div className="flex justify-between items-center bg-white p-3 rounded border">
                      <div className="text-gray-700">متوسط سرعة الرد</div>
                      <div className="text-lg font-semibold">{loadingStats ? "..." : "—"}</div>
                    </div>
                  </>
                );
              })()}
            </div>
          )}

          {/* Non-seller or guest view */}
          {(!currentUser || currentUser.role !== "seller") && (
            <div className="text-center py-6">
              <p className="text-gray-700 mb-4">الإحصائيات التفصيلية متاحة فقط للبائعين.</p>
              <div className="flex justify-center">
                <a href="/become-seller" className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700">كن بائعًا الآن</a>
              </div>
            </div>
          )}
        </div>

        {/* توثيقات */}
        <div className="bg-gray-50 border rounded-lg p-4 shadow-sm col-span-2">
          <h2 className="text-lg font-semibold mb-2">توثيقات</h2>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>البريد الإلكتروني: <span className="text-green-600 font-bold">✓</span></li>
            <li>رقم الجوال: <span className="text-red-600 font-bold">✗</span></li>
            <li>الهوية الشخصية: <span className="text-red-600 font-bold">✗</span></li>
          </ul>
        </div>
>>>>>>> cf326c0 (chore: centralize CATALOG, unify category routing to ?sub=, make NAV and homepage read from catalog // ASSISTANT_FINAL: true)
      </div>

      {/* الأقسام */}
      <div className="max-w-4xl mx-auto mt-10 grid md:grid-cols-2 gap-6">
        {/* نبذة */}
        <div className="bg-gray-50 border rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-2">نبذة عني</h2>
          <p className="text-gray-600 text-sm">
            {user?.bio || "لم يكتب نبذة شخصية"}
          </p>
        </div>

        {/* إحصائيات */}
        <div className="bg-gray-50 border rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-2">إحصائيات</h2>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>تاريخ التسجيل: 27 سبتمبر 2025</li>
            <li>آخر تواجد: الآن</li>
          </ul>
        </div>

        {/* توثيقات */}
        <div className="bg-gray-50 border rounded-lg p-4 shadow-sm col-span-2">
          <h2 className="text-lg font-semibold mb-2">توثيقات</h2>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>البريد الإلكتروني: <span className="text-green-600 font-bold">✓</span></li>
            <li>رقم الجوال: <span className="text-red-600 font-bold">✗</span></li>
            <li>الهوية الشخصية: <span className="text-red-600 font-bold">✗</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
