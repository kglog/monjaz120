'use client';
import React, { useState } from 'react';

const containsForbidden = (text: string) => {
  const forbidden = [
    /\b(05\d{8}|\+9665\d{8}|\d{7,12})\b/,
    /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/,
    /(https?:\/\/|www\.)/i,
    /\b(واتس|واتساب|whatsapp|telegram|تليجرام|snap|discord|@)\b/i,
  ];
  return forbidden.some((r) => r.test(text));
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Array<{ id: string; text: string; from: 'me' | 'them' }>>([]);
  const [input, setInput] = useState('');
  const [error, setError] = useState<string | null>(null);

  async function reportIncident(text: string) {
    try {
      await fetch('/api/incidents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'forbidden_contact', message: text }),
      });
    } catch (err) {
      console.error('failed to report incident', err);
    }
  }

  async function handleSend(e?: React.FormEvent) {
    e?.preventDefault();
    setError(null);
    const text = input.trim();
    if (!text) return;
    if (containsForbidden(text)) {
      setError('نعتذر، يمنع إرسال أرقام الهاتف أو الروابط أو وسائل التواصل.');
      await reportIncident(text);
      return;
    }

    setMessages((m) => [...m, { id: Date.now().toString(), text, from: 'me' }]);
    setInput('');
    // fake reply for demo
    setTimeout(() => {
      setMessages((m) => [...m, { id: (Date.now()+1).toString(), text: 'شكرًا! سأعاود الرد قريبا', from: 'them' }]);
    }, 800);
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-3">محادثة الطلب</h2>
      <div className="border rounded p-3 h-72 overflow-y-auto mb-3 bg-white">
        {messages.length === 0 && <p className="text-sm text-slate-500">لا توجد رسائل بعد — ابدأ بالمراسلة أدناه.</p>}
        {messages.map((m) => (
          <div key={m.id} className={`mb-2 ${m.from === 'me' ? 'text-right' : 'text-left'}`}>
            <div className={`inline-block px-3 py-2 rounded ${m.from === 'me' ? 'bg-emerald-100' : 'bg-slate-100'}`}>
              {m.text}
            </div>
          </div>
        ))}
      </div>

      {error && <div className="text-red-600 mb-2">{error}</div>}

      <form onSubmit={(e)=>handleSend(e)} className="flex gap-2">
        <input value={input} onChange={(e)=> setInput(e.target.value)} placeholder="اكتب رسالة..." className="flex-1 rounded border px-3 py-2" />
        <button type="submit" className="px-4 py-2 bg-cyan-600 text-white rounded">إرسال</button>
      </form>
    </div>
  );
}
