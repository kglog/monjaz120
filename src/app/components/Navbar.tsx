'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { 
  Menu, X, Bell, Mail, User, LogOut, 
  Settings, HelpCircle, Bookmark, DollarSign, Edit,
  FolderKanban, ShoppingCart
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

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = '/';
  };

  return (
   <nav className="bg-white shadow px-4 py-2 flex justify-between items-center relative sticky top-0 z-50">

      {/* الشعار */}
      <Link
        href="/"
        className="text-base font-bold px-3 py-1 rounded-full border border-[#050505] text-[#050505] hover:bg-[#e0f7fd]/40 transition"
      >
        منصة.كوم
      </Link>

      {/* الروابط + الأيقونات */}
      <div className="flex gap-4 items-center relative">
        <Link href="/categories" className="flex items-center gap-1 text-sm text-gray-700 hover:text-[#38bdf8]">
          <FolderKanban className="w-4 h-4" />
          التصنيفات
        </Link>

        <Link href="/orders" className="flex items-center gap-1 text-sm text-gray-700 hover:text-[#38bdf8]">
          <ShoppingCart className="w-4 h-4" />
          المشتريات
        </Link>

        {/* الرسائل */}
        <button 
          onClick={() => setOpenMenu(openMenu === "messages" ? null : "messages")}
          className="dropdown-toggle"
        >
          <Mail className="w-5 h-5 text-gray-700" />
        </button>
        {openMenu === "messages" && (
          <div className="dropdown-menu absolute right-[120px] mt-2 w-56 bg-white shadow-lg border rounded-lg py-2 z-50">
            <p className="text-sm text-gray-500 px-3">لا جديد حتى اللحظة!</p>
            <Link href="/messages" className="mt-2 block text-sm text-blue-600 hover:underline px-3">
              جميع الرسائل
            </Link>
          </div>
        )}

        {/* الإشعارات */}
        <button 
          onClick={() => setOpenMenu(openMenu === "notifications" ? null : "notifications")}
          className="dropdown-toggle"
        >
          <Bell className="w-5 h-5 text-gray-700" />
        </button>
        {openMenu === "notifications" && (
          <div className="dropdown-menu absolute right-[80px] mt-2 w-56 bg-white shadow-lg border rounded-lg py-2 z-50">
            <p className="text-sm text-gray-500 px-3">لا جديد حتى اللحظة!</p>
            <Link href="/notifications" className="mt-2 block text-sm text-blue-600 hover:underline px-3">
              جميع الإشعارات
            </Link>
          </div>
        )}

        {/* حساب المستخدم */}
        <button
          onClick={() => setOpenMenu(openMenu === "account" ? null : "account")}
          className="dropdown-toggle w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-bold text-sm"
        >
          {user?.username ? user.username.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
        </button>
        {openMenu === "account" && (
          <div className="dropdown-menu absolute right-0 mt-2 w-52 bg-white shadow-lg border rounded-lg py-2 z-50">
            {user ? (
              <>
                <span className="block px-4 py-2 text-sm text-gray-600">مرحبًا {user.username}</span>
                <Link href="/account" className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100">
                  <User className="w-4 h-4" /> الملف الشخصي
                </Link>
                <Link href="/groups" className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100">
                  <Bookmark className="w-4 h-4" /> مجموعاتي
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
          </div>
        )}
      </div>
    </nav>
  );
}
