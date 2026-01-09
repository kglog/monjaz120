"use client";
import React, { useEffect, useState } from "react";
import ClaimButton from "../../components/ClaimButton";
import useSSE from '../../lib/useSSE';
import Toasts, { toastsStore } from '../../components/Toasts';

type Req = {
  id: string;
  title: string;
  description?: string | null;
  status: string;
  claimedBy?: string | null;
  price?: number | null;
  createdAt: string;
};

export default function RequestsPage() {
  const [requests, setRequests] = useState<Req[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch('/api/requests');
      const json = await res.json();
      setRequests(json.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // SSE subscription (best-effort)
    const es: EventSource | null = null;
    // SSE handled with hook below
    const poll = setInterval(() => load(), 3000);
    return () => { clearInterval(poll); };
  }, []);

  // SSE subscription with dedupe and toast
  useSSE({ url: '/api/requests/stream', onMessage: (item:any) => {
    setRequests((prev) => [item, ...prev]);
    try { toastsStore.push?.({ id: item.id || `id_${Date.now()}`, title: 'طلب جديد', msg: item.title }); } catch(e){}
  }});

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Toasts />
      <h1 className="text-2xl font-semibold mb-4">طلبات المستخدمين</h1>
      {loading && <p>جاري التحميل...</p>}
      {!loading && requests.length === 0 && <p>لا توجد طلبات حالياً.</p>}

      <ul className="space-y-4">
        {requests.map((r) => (
          <li key={r.id} className="p-4 border rounded-md bg-white">
            <div className="flex justify-between items-start gap-4">
              <div>
                <h3 className="font-medium">{r.title}</h3>
                <p className="text-sm text-slate-600">{r.description}</p>
                <p className="text-xs text-slate-400 mt-2">{new Date(r.createdAt).toLocaleString()}</p>
              </div>

              <div className="flex flex-col items-end gap-2">
                <span className="text-sm font-medium">{r.status}</span>
                {r.status === 'open' ? (
                  <ClaimButton requestId={r.id} onClaim={() => load()} />
                ) : (
                  <span className="text-xs text-slate-500">مطالب به: {r.claimedBy ?? '-'}</span>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ASSISTANT_FINAL: true
