"use client";
import React, { useEffect, useState } from 'react';
import RequestModal from '@/components/RequestModal';

function InlineForm({ onCreated }:{ onCreated?: ()=>void }){
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    setError(null);
    if (!title.trim()) return setError('اكتب اسم الخدمة');
    setLoading(true);
    try {
      const res = await fetch('/api/requests', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ title: title.trim(), description: desc.trim() }) });
      if (!res.ok) throw new Error(await res.text());
      setTitle(''); setDesc('');
      onCreated?.();
    } catch (e:any) {
      // save local
      try {
        const pending = JSON.parse(localStorage.getItem('pending_requests')||'[]');
        const id = `local_${Date.now()}`;
        pending.unshift({ __localId: id, id, title: title.trim(), description: desc.trim(), createdAt: new Date().toISOString(), status: 'pending' });
        localStorage.setItem('pending_requests', JSON.stringify(pending));
        setTitle(''); setDesc('');
        onCreated?.();
      } catch (err){ setError('فشل الإرسال'); }
    } finally { setLoading(false); }
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg p-6 shadow-md">
      <h2 className="text-xl font-semibold mb-3">أضف طلبك هنا</h2>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <input value={title} onChange={(e)=> setTitle(e.target.value)} placeholder="مثال: تصميم شعار احترافي" className="w-full p-2 border rounded mb-2" />
      <textarea value={desc} onChange={(e)=> setDesc(e.target.value)} placeholder="تفاصيل إضافية" className="w-full p-2 border rounded mb-2" rows={4} />
      <div className="flex justify-end gap-2">
        <button onClick={submit} disabled={loading} className="px-4 py-2 bg-cyan-600 text-white rounded">{loading? 'جارٍ...' : 'نشر الطلب'}</button>
      </div>
    </div>
  );
}

export default function RequestsHub() {
  const [serverRequests, setServerRequests] = useState<any[]>([]);
  const [pending, setPending] = useState<any[]>([]);

  useEffect(()=>{ load(); loadPending(); },[]);

  async function load(){
    try{ const res = await fetch('/api/requests'); const j = await res.json(); setServerRequests(j.data||[]); } catch(e){ setServerRequests([]); }
  }

  function loadPending(){ try{ const p = JSON.parse(localStorage.getItem('pending_requests')||'[]'); setPending(Array.isArray(p)?p:[]); } catch(e){ setPending([]); } }

  return (
    <div className="min-h-screen py-10">
      <div className="mx-auto max-w-6xl px-4">
        <InlineForm onCreated={()=>{ load(); loadPending(); }} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div>
            <h3 className="font-semibold mb-3">طلبات الناس (نظامية)</h3>
            <ul className="space-y-3">
              {serverRequests.map(r=> (
                <li key={r.id} className="border rounded p-3 bg-white">
                  <div className="font-semibold">{r.title}</div>
                  <div className="text-sm text-slate-600">{r.description}</div>
                  <div className="mt-2 flex gap-2 justify-end">
                    <a href={`/chat/${r.id}`} className="px-3 py-1 border rounded text-sm">الدردشة</a>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">طلبات محفوظة محلياً (بانتظار المزامنة)</h3>
            <ul className="space-y-3">
              {pending.map((p:any)=> (
                <li key={p.__localId} className="border rounded p-3 bg-white">
                  <div className="font-semibold">{p.title}</div>
                  <div className="text-sm text-slate-600">{p.description}</div>
                  <div className="mt-2 flex gap-2 justify-end">
                    <a href={`/chat/${p.id}`} className="px-3 py-1 border rounded text-sm">الدردشة</a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// ASSISTANT_FINAL: true
