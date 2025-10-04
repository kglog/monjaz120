"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function VerifyRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/account/verify/basic-info");
  }, [router]);
  return null;
}