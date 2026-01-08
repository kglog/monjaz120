"use client";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { bcTrack } from "@/lib/brain";

export default function BCPageTracker() {
  const path = usePathname(); const qs = useSearchParams();
  useEffect(() => { bcTrack("page_view", { path, query: qs?.toString() || "" }); }, [path, qs]);
  return null;
}
