"use client";
import React from "react";

import Link from "next/link";
import { useEffect, useState } from "react";
import { 
  Menu, X, Bell, Mail, User, LogOut, 
<<<<<<< HEAD
  Settings, HelpCircle, Bookmark, DollarSign, Edit 
=======
  Settings, HelpCircle, FilePlus, DollarSign, Edit, ShoppingCart 
>>>>>>> cf326c0 (chore: centralize CATALOG, unify category routing to ?sub=, make NAV and homepage read from catalog // ASSISTANT_FINAL: true)
} from "lucide-react";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<"messages" | "notifications" | "account" | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // إغلاق القوائم المنسدلة إذا ضغطت براها
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".dropdown-menu") &&
          !(e.target as HTMLElement).closest(".dropdown-toggle")) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // إغلاق القائمة الجانبية إذا ضغطت براها
  useEffect(() => {
    const handleSidebarOutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".sidebar") &&
          !(e.target as HTMLElement).closest(".sidebar-toggle")) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener("click", handleSidebarOutside);
    }
    return () => document.removeEventListener("click", handleSidebarOutside);
  }, [menuOpen]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = '/';
  };

  return (
<<<<<<< HEAD
<nav className="bg-[#f7fcff] w-full px-6 py-2 flex justify-between items-center relative sticky top-0 z-50 border-t border-b border-black border-x-0"
     style={{ borderTopWidth: "0.5px", borderBottomWidth: "0.5px" }}>
=======
  <>
  <nav className="bg-[#ffffff] w-full px-6 py-2 flex justify-between items-center relative sticky top-0 z-50 border-t border-b border-black border-x-0"
    style={{ borderTopWidth: "0.5px", borderBottomWidth: "0.5px" }}>

      {/* platform rectangle: moved below the header (rendered after the nav) */}
>>>>>>> cf326c0 (chore: centralize CATALOG, unify category routing to ?sub=, make NAV and homepage read from catalog // ASSISTANT_FINAL: true)



      {/* شعار + زر الشرطات */}
      <div className="flex items-center gap-0">
        <Link
          href="/"
<<<<<<< HEAD
          className="text-x1 font-bold px-4 py-1.5 rounded-full border-[1.5px] border-[#050505] text-[#050505] hover:bg-[#e0f7fd]/40 transition"
=======
  className="text-[1.2rem] font-bold px-2 py-1 rounded-xl border-[1.5px] border-black bg-[#ffffff] text-black hover:bg-gray-100 transition translate-x-5"
  style={{ transform: 'translateX(20px)' }}
>>>>>>> cf326c0 (chore: centralize CATALOG, unify category routing to ?sub=, make NAV and homepage read from catalog // ASSISTANT_FINAL: true)
        >
          منصة.كوم
        </Link>

<<<<<<< HEAD
        {/* زر الثلاث شرطات */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sidebar-toggle p-2 text-black hover:text-gray-600 transition"
=======
        {/* Request button removed from here — moved to hero search area as a small card */}

        {/* زر الثلاث شرطات */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sidebar-toggle p-2 text-gray-900 hover:text-gray-700 transition"
>>>>>>> cf326c0 (chore: centralize CATALOG, unify category routing to ?sub=, make NAV and homepage read from catalog // ASSISTANT_FINAL: true)
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* روابط المستخدم + الأيقونات */}
      <div className="flex gap-3.5 items-center relative">
<<<<<<< HEAD
        {/* الرسائل */}
        <div className="relative">
          <button 
            onClick={() => setOpenMenu(openMenu === "messages" ? null : "messages")}
            className="dropdown-toggle"
          >
            <Mail className="w-[25px] h-[25px] text-gray-700 -mr-8 " strokeWidth={2.5} />
          </button>
          {openMenu === "messages" && (
            <div className="dropdown-menu absolute right-0 mt-2 w-64 bg-white shadow-lg border rounded-lg p-3 z-50">
              <p className="text-sm text-gray-500">لا جديد حتى اللحظة!</p>
              <Link href="/messages" className="mt-2 block text-sm text-blue-600 hover:underline">
                جميع الرسائل
              </Link>            </div>
          )}
        </div>

        {/* الإشعارات */}
        <div className="relativetransform translate-x-1.5">
          <button 
  onClick={() => setOpenMenu(openMenu === "notifications" ? null : "notifications")}
  className="dropdown-toggle -mr-[6px]"
>
  <Bell className="w-[24px] h-[24px] text-black mr-1" strokeWidth={2.5} />
</button>

=======
  {/* الرسائل + سلة المشتريات (صف واحد) */}
  <div className="relative flex items-center gap-3 -translate-y-0.5">
            <button 
            onClick={() => setOpenMenu(openMenu === "messages" ? null : "messages")}
            className="dropdown-toggle translate-y-0"
          >
            <Mail className="w-[25px] h-[25px] text-gray-900" strokeWidth={2.5} />
          </button>

          <Link href="/my-purchases" aria-label="عرض المشتريات" className="inline-block">
            <ShoppingCart className="w-[25px] h-[25px] text-gray-900" strokeWidth={2.5} />
          </Link>

          {openMenu === "messages" && (
            <div className="dropdown-menu absolute right-0 mt-2 w-64 bg-white shadow-lg border rounded-lg p-3 z-50">
              <p className="text-sm text-gray-500">لا جديد حتى اللحظة!</p>
              <Link href="/messages" className="mt-2 block text-sm text-blue-600 hover:underline">
                جميع الرسائل
              </Link>
            </div>
          )}
        </div>

        {/* الإشعارات */}
        <div className="relativetransform translate-x-1.5">
          <button 
  onClick={() => setOpenMenu(openMenu === "notifications" ? null : "notifications")}
  className="dropdown-toggle -mr-[6px]"
>
  <Bell className="w-[24px] h-[24px] text-gray-900 mr-1" strokeWidth={2.5} />
</button>

        

>>>>>>> cf326c0 (chore: centralize CATALOG, unify category routing to ?sub=, make NAV and homepage read from catalog // ASSISTANT_FINAL: true)
          {openMenu === "notifications" && (
            <div className="dropdown-menu absolute left-0 mt-2 w-56 bg-white shadow-lg border rounded-lg py-2 z-50">
              <p className="text-sm text-gray-500">لا جديد حتى اللحظة!</p>
              <Link href="/notifications" className="mt-2 block text-sm text-blue-600 hover:underline">
                جميع الإشعارات
              </Link>
            </div>
          )}
        </div>

      {/* حساب المستخدم */}
<div className="relative">
  <button
  onClick={() => setOpenMenu(openMenu === "account" ? null : "account")}
<<<<<<< HEAD
  className="dropdown-toggle w-[28px] h-[28px] rounded-full border-[3px] border-black flex items-center justify-center text-gray-800 text-sm font-bold bg-transparent -mt-[7px] -mr-[8px]"
=======
  className="dropdown-toggle w-[28px] h-[28px] rounded-full border-[2.5px] border-black flex items-center justify-center text-gray-900 text-sm font-bold bg-transparent -mt-[7px] -mr-[8px]"
>>>>>>> cf326c0 (chore: centralize CATALOG, unify category routing to ?sub=, make NAV and homepage read from catalog // ASSISTANT_FINAL: true)
>
  {user?.username ? user.username.charAt(0).toUpperCase() : <User className="w-5 h-5" />}
</button>


  {openMenu === "account" && (
    <div className="dropdown-menu absolute right-0 mt-2 w-56 bg-white shadow-lg border rounded-lg py-2 z-50 transform translate-x-[200px]">

      {user ? (
        <>
          <span className="block px-4 py-2 text-sm text-gray-600">
            مرحبًا {user.username}
          </span>
          <Link href="/account" className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100">
            <User className="w-4 h-4" /> الملف الشخصي
          </Link>
<<<<<<< HEAD
          <Link href="/groups" className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100">
            <Bookmark className="w-4 h-4" /> مجموعاتي
=======
          <Link href="/requests-hub" className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100">
            <FilePlus className="w-4 h-4" /> اطلب خدمة
>>>>>>> cf326c0 (chore: centralize CATALOG, unify category routing to ?sub=, make NAV and homepage read from catalog // ASSISTANT_FINAL: true)
          </Link>
          <Link href="/balance" className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100">
            <DollarSign className="w-4 h-4" /> الرصيد
          </Link>
          <Link href="/settings" className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100">
            <Settings className="w-4 h-4" /> الإعدادات
          </Link>
          <Link href="/edit-account" className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100">
            <Edit className="w-4 h-4" /> تعديل الحساب
          </Link>
          <Link href="/help" className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100">
            <HelpCircle className="w-4 h-4" /> مساعدة
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
          >
            <LogOut className="w-4 h-4" /> تسجيل خروج
          </button>
        </>
      ) : (
        <>
          <Link href="/login" className="block px-4 py-2 text-sm hover:bg-gray-100">دخول</Link>
          <Link href="/register" className="block px-4 py-2 text-sm hover:bg-gray-100">حساب جديد</Link>
        </>
      )}
<<<<<<< HEAD
    </div>
  )}
</div>

      </div>

      {/* القائمة المنسدلة اليمنى */}
{menuOpen && (
  <div className="absolute top-14 right-6 w-56 bg-white shadow-lg border rounded-xl py-3 z-50">
    <Link href="/categories/تصميم" className="block px-4 py-2 hover:bg-gray-100">تصميم</Link>
    <Link href="/categories/كتابة" className="block px-4 py-2 hover:bg-gray-100">كتابة وترجمة</Link>
    <Link href="/categories/تسويق" className="block px-4 py-2 hover:bg-gray-100">تسويق رقمي</Link>
    <Link href="/categories/برمجة" className="block px-4 py-2 hover:bg-gray-100">برمجة وتطوير</Link>
    <Link href="/categories/فيديو" className="block px-4 py-2 hover:bg-gray-100">فيديو وأنيميشن</Link>
    <Link href="/categories/هندسة" className="block px-4 py-2 hover:bg-gray-100">هندسة وعمارة</Link>
    <Link href="/categories/أعمال" className="block px-4 py-2 hover:bg-gray-100">أعمال</Link>
=======
    </div>
  )}
</div>

      </div>

      {/* القائمة المنسدلة اليمنى */}
{menuOpen && (
  <div className="absolute top-14 right-6 w-[min(92vw,960px)] bg-white shadow-lg border rounded-xl py-4 z-50">
    {/* Responsive grid showing categories horizontally in multiple columns */}
    <div className="px-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        { }
        {require("@/lib/sections").sections.map((s: any, idx: number) => (
          <Link
            key={idx}
            href={`/categories/${encodeURIComponent(s.title)}`}
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded text-right"
          >
            <div className="w-10 h-10 flex items-center justify-center bg-white border rounded-full shadow-sm">
              {s.icon}
            </div>
            <span className="text-sm font-medium">{s.title}</span>
          </Link>
        ))}
      </div>
    </div>
>>>>>>> cf326c0 (chore: centralize CATALOG, unify category routing to ?sub=, make NAV and homepage read from catalog // ASSISTANT_FINAL: true)
  </div>
)}

    </nav>
<<<<<<< HEAD
=======
  </>
>>>>>>> cf326c0 (chore: centralize CATALOG, unify category routing to ?sub=, make NAV and homepage read from catalog // ASSISTANT_FINAL: true)
  );
}

  // ASSISTANT_FINAL: true
