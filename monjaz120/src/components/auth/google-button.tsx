"use client";

import { signIn } from "next-auth/react";
import React from "react";

export default function GoogleButton({ callbackUrl = "/" }: { callbackUrl?: string }) {
  return (
    <button
      onClick={() => signIn("google", { redirect: true, callbackUrl })}
      className="w-full rounded-lg py-3"
      aria-label="تسجيل باستخدام جوجل"
    >
      تسجيل باستخدام جوجل
    </button>
  );
}

// ASSISTANT_FINAL: true
