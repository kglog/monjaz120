"use client";

import React from "react";

export default function LoginFallbackLinks() {
  // Avoid rendering dynamic href attributes during SSR/client hydration.
  // Instead render stable anchors and perform navigation via onClick which
  // is only executed on the client. This prevents attribute mismatches.

  const handleGoogle = (e: React.MouseEvent) => {
    e.preventDefault();
    const callback = encodeURIComponent(window.location.href);
    window.location.assign(`/api/auth/signin/google?callbackUrl=${callback}`);
  };

  const handleMicrosoft = (e: React.MouseEvent) => {
    e.preventDefault();
    const callback = encodeURIComponent(window.location.href);
    window.location.assign(`/api/auth/signin/microsoft?callbackUrl=${callback}`);
  };

  return (
    <div className="space-y-1">
      <div className="text-xs text-slate-600 text-right mt-1">
        <a href="#" onClick={handleGoogle} className="underline">
          اضغط هنا إن لم يحدث توجيه تلقائي
        </a>
      </div>

      <div className="text-xs text-slate-600 text-right mt-1">
        <a href="#" onClick={handleMicrosoft} className="underline">
          اضغط هنا إن لم يحدث توجيه تلقائي
        </a>
      </div>
    </div>
  );
}

// ASSISTANT_FINAL: true
