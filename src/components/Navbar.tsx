"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav>
      <Link href="/">الصفحة الرئيسية</Link> |{" "}
      <Link href="/dashboard">لوحة التحكم</Link> |{" "}
      <Link href="/market">الخدمات</Link> |{" "}
      <Link href="/orders">الطلبات</Link> |{" "}
      <Link href="/profile">ملفي الشخصي</Link>
    </nav>
  );
}
