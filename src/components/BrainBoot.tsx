"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import * as brain from "@/lib/brain";
const b: any = brain;

/** نأخذ الـdefault إن وجد، وإلا الكائن نفسه */
const bStart   = b.start   ?? b.boot   ?? b.init   ?? (() => {});
const bConnect = b.connect ?? b.attach ?? b.bind   ?? (() => {});
const bLog     = b.log     ?? b.track  ?? b.event  ?? (() => {});

export default function BrainBoot() {
  const path = usePathname();

  useEffect(() => {
    try { bStart();   } catch {}
    try { bConnect(); } catch {}
    // للتطمين في الكونسول إن التشغيل تم من الـlayout
    console.log("[brain] started via layout");
  }, []);

  useEffect(() => {
    try { bLog("visit", { path }); } catch {}
    if (path === "/")              try { bLog("action", { action: "visit_home" }); } catch {}
    else if (path.startsWith("/design"))
                                   try { bLog("action", { action: "visit_design" }); } catch {}
  }, [path]);

  return null;
}
// ASSISTANT_FINAL: true