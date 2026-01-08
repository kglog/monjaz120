"use client";
import React from 'react';

export default function OwnerLogoutButton() {
  return (
    <button
      onClick={async () => {
        await fetch("/api/owner/logout", { method: "POST" });
        window.location.href = "/owner/login";
      }}
      className="rounded-xl border px-4 py-2"
    >
      خروج المالك
    </button>
  );
}

// ASSISTANT_FINAL: true
