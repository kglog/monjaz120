"use client";
import React, { useEffect, useState } from 'react';

type Req = {
  id: string;
  __localId?: string;
  title: string;
  description?: string | null;
  status?: string;
  createdAt?: string;
  claimedBy?: string | null;
};

export default function MyRequestsPage() {
  const [serverRequests, setServerRequests] = useState<Req[]>([]);
  const [pending, setPending] = useState<Req[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadServer();
    loadPending();
  }, []);

  function loadPending() {
    try {
      const raw = localStorage.getItem('pending_requests') || '[]';
      const arr = JSON.parse(raw);
      setPending(Array.isArray(arr) ? arr : []);
    } catch (e) {
      setPending([]);
    }
  }

  async function loadServer() {
    setLoading(true);
    try {
      const res = await fetch('/api/requests');
      if (!res.ok) throw new Error('failed');
      const json = await res.json();
      setServerRequests(json.data || []);
    } catch (e) {
      setServerRequests([]);
    } finally {
      setLoading(false);
    }
  }

  async function removePending(localId: string) {
    const raw = localStorage.getItem('pending_requests') || '[]';
    const arr = JSON.parse(raw).filter((x: any) => x.__localId !== localId);
    localStorage.setItem('pending_requests', JSON.stringify(arr));
    loadPending();
  }

  async function retryPending(item: any) {
    try {
      const res = await fetch('/api/requests', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title: item.title, description: item.description }) });
      if (!res.ok) throw new Error('failed');
      // remove local pending
      removePending(item.__localId);
      // refresh server list
      loadServer();
      alert('تمت المزامنة بنجاح');
    } catch (e) {
      alert('فشل المزامنة، حاول لاحقاً');
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">طلباتي</h1>
      <div className="flex justify-end mb-4">
        <button onClick={async () => {
          const raw = localStorage.getItem('pending_requests') || '[]';
          const arr = JSON.parse(raw);
          if (!Array.isArray(arr) || arr.length === 0) return alert('لا توجد طلبات للمزامنة');
          let success = 0;
          for (const it of arr.slice()) {
            try {
              const res = await fetch('/api/requests', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title: it.title, description: it.description }) });
              if (res.ok) {
                success++;
                await fetch('/api/debug/requests'); // warm
                // remove it
                const rem = JSON.parse(localStorage.getItem('pending_requests')||'[]').filter((x:any)=> x.__localId !== it.__localId);
                localStorage.setItem('pending_requests', JSON.stringify(rem));
              }
            } catch(e){}
          }
          loadPending();
          loadServer();
          alert(`تمت محاولة المزامنة. العناصر المنقولة: ${success}`);
        }} className="px-3 py-2 border rounded">محاولة مزامنة الكل</button>
      </div>
      <section className="mb-8">
        <h2 className="text-lg font-medium mb-3">طلبات قيد المزامنة (محفوظة محلياً)</h2>
        {pending.length === 0 && <p className="text-sm text-slate-500">لا توجد طلبات محلية معلّقة.</p>}
        <ul className="space-y-3">
          {pending.map((p) => (
            <li key={p.__localId} className="border rounded p-3 bg-white">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <div className="font-semibold">{p.title}</div>
                  <div className="text-sm text-slate-600">{p.description}</div>
                  <div className="text-xs text-slate-400 mt-1">{new Date(p.createdAt || Date.now()).toLocaleString()}</div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-sm text-amber-600">محلي (بانتظار المزامنة)</span>
                  <button onClick={() => removePending(p.__localId!)} className="text-xs px-2 py-1 border rounded">إلغاء الحفظ</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-medium mb-3">طلبات محفوظة في النظام</h2>
        {loading && <p>جاري التحميل...</p>}
        {!loading && serverRequests.length === 0 && <p className="text-sm text-slate-500">لا توجد طلبات محفوظة.</p>}
        <ul className="space-y-3">
          {serverRequests.map((r) => (
            <li key={r.id} className="border rounded p-3 bg-white">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <div className="font-semibold">{r.title}</div>
                  <div className="text-sm text-slate-600">{r.description}</div>
                  <div className="text-xs text-slate-400 mt-1">{new Date(r.createdAt || Date.now()).toLocaleString()}</div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-sm text-green-600">{r.status ?? 'open'}</span>
                  <span className="text-xs text-slate-500">مطالب به: {r.claimedBy ?? '-'}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

// ASSISTANT_FINAL: true
