"use client";

import React, { useEffect, useState } from "react";

export default function OwnerHeaderBadge() {
  const [name, setName] = useState<string>("");

  useEffect(() => {
    fetch("/api/owner/me", { cache: "no-store" })
      .then(async (r) => (r.ok ? r.json() : null))
      .then((j) => setName(j?.owner?.name || ""))
      .catch(() => setName(""));
  }, []);

  if (!name) return null;

  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <div className="rounded-2xl border bg-white px-4 py-2 text-sm">
        <span className="font-semibold">👑 المالك:</span> {name}
        <span className="text-xs text-gray-500"> — جلسة خاصة</span>
      </div>
    </div>
  );
}

// ASSISTANT_FINAL: true
