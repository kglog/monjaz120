"use client";
import React, { useState } from "react";

export default function ClaimButton({ requestId, onClaim } : { requestId: string; onClaim?: () => void }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClaim() {
    setError(null);
    let sellerId: string | null = null;
    try {
      const stored = localStorage.getItem('user');
      if (stored) {
        const u = JSON.parse(stored);
        sellerId = u?.id || u?.userId || u?.uid || null;
      }
    } catch (e) {
      sellerId = null;
    }

    if (!sellerId) {
      sellerId = prompt('ادخل معرف البائع (seller id)');
      if (!sellerId) return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/requests/${requestId}/claim`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sellerId }),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'فشل المطالبة');
      }
      onClaim && onClaim();
    } catch (err: any) {
      setError(err.message || 'خطأ');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-end">
      <button onClick={handleClaim} disabled={loading} className="px-3 py-1 rounded bg-emerald-600 text-white text-sm">
        {loading ? 'جارٍ...' : 'مطالبة'}
      </button>
      {error && <div className="text-xs text-red-600 mt-1">{error}</div>}
    </div>
  );
}
