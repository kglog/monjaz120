import React from "react";
import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer";

export const metadata = {
  title: "منصة.كوم",
  description: "أكبر سوق عربي للخدمات المصغّرة",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-[#f7f8fa] text-gray-800">
    <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

