"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function ChatPage(){
  const params:any = useParams();
  const requestId = params.requestId;
  const [msgs, setMsgs] = useState<any[]>([]);
  const [text, setText] = useState('');
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  async function load(){
    try{ const res = await fetch(`/api/chats/${requestId}`); const j = await res.json(); setMsgs(j.data||[]); } catch(e){ setMsgs([]); }
  }

  useEffect(()=>{ load(); const t = setInterval(load,2000); return ()=> clearInterval(t); },[requestId]);

  useEffect(()=>{
    // scroll to bottom on msgs change
    try { if (containerRef.current) containerRef.current.scrollTop = containerRef.current.scrollHeight; } catch(e){}
  },[msgs]);

  async function send(){
    if (!text.trim()) return;
    const body = { senderId: 'me', text: text.trim() };
    try{ const res = await fetch(`/api/chats/${requestId}`, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(body) }); if (res.ok){ setText(''); load(); } }
    catch(e){}
  }

  return (
    <div className="min-h-screen p-6 max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">الدردشة للطلب {requestId}</h2>
      <div ref={containerRef} className="border rounded p-4 h-[60vh] overflow-auto bg-white mb-3">
        {msgs.map(m => (
            <div key={m.id} className={`mb-3 ${m.senderId==='me'? 'text-right': 'text-left'}`}>
              <div className="text-xs text-slate-500">{m.senderId}</div>
              <div className="inline-block px-3 py-2 rounded bg-gray-100">{m.text}</div>
              <div className="text-xs text-slate-400">{new Date(m.createdAt).toLocaleString()}</div>
            </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input value={text} onChange={(e)=> setText(e.target.value)} className="flex-1 p-2 border rounded" placeholder="اكتب رسالة" />
        <button onClick={send} className="px-4 py-2 bg-cyan-600 text-white rounded">إرسال</button>
      </div>
    </div>
  );
}

// ASSISTANT_FINAL: true
