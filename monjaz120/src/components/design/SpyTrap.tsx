"use client";
import { useEffect } from "react";

/** واجهة صامتة 100%: لا ترندر أي عناصر على الصفحة العامة */
export default function SpyTrap() {
  useEffect(() => {
    // لاحقاً: إرسال أحداث سرّية فقط بدون أي DOM ظاهر
    const handler = () => { /* noop for now */ };
    document.addEventListener("monjaz-probe", handler);
    return () => document.removeEventListener("monjaz-probe", handler);
  }, []);
  return null; // ✅ لا عناصر، لا نص، لا "hidden-probe"
}
