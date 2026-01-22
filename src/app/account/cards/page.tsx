"use client";

import { useEffect, useState } from "react";

type Card = {
  id: string;
  holder: string;
  number: string; // stored masked except for demo
  expiryMonth: string;
  expiryYear: string;
  type: string;
};

const STORAGE_KEY = "account.cards";

export default function CardsPage() {
  const [cards, setCards] = useState<Card[]>([]);
  const [holder, setHolder] = useState("");
  const [number, setNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [type, setType] = useState("visa");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setCards(JSON.parse(raw));
    } catch (e) {
      console.warn("Failed to read cards from localStorage", e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
    } catch (e) {
      console.warn("Failed to save cards to localStorage", e);
    }
  }, [cards]);

  function maskNumber(num: string) {
    const cleaned = num.replace(/\s+/g, "");
    if (cleaned.length <= 4) return cleaned;
    return "•••• •••• •••• " + cleaned.slice(-4);
  }

  function addCard(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const cleaned = number.replace(/\D/g, "");
    if (cleaned.length < 13 || cleaned.length > 19) {
      setError("رقم البطاقة غير صحيح. تأكد من إدخال رقم صالح.");
      return;
    }
    if (!holder) {
      setError("أدخل اسم حامل البطاقة.");
      return;
    }
    if (!expiryMonth || !expiryYear) {
      setError("أدخل تاريخ انتهاء صالح.");
      return;
    }

    const newCard: Card = {
      id: Date.now().toString(),
      holder: holder.trim(),
      number: maskNumber(cleaned),
      expiryMonth,
      expiryYear,
      type,
    };

    setCards((s) => [newCard, ...s]);
    // reset
    setHolder("");
    setNumber("");
    setExpiryMonth("");
    setExpiryYear("");
    setType("visa");
  }

  function removeCard(id: string) {
    setCards((s) => s.filter((c) => c.id !== id));
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        إدارة البطاقات
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        <section className="p-6 border rounded-lg bg-white">
          <h2 className="font-medium mb-3">أضف بطاقة جديدة</h2>
          <form onSubmit={addCard} className="space-y-3">
            <div>
              <label className="block text-sm text-gray-600">اسم حامل البطاقة</label>
              <input
                value={holder}
                onChange={(e) => setHolder(e.target.value)}
                className="mt-1 w-full border rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600">رقم البطاقة</label>
              <input
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="xxxx xxxx xxxx xxxx"
                className="mt-1 w-full border rounded px-3 py-2"
                inputMode="numeric"
                required
              />
            </div>

            <div className="flex gap-2">
              <div className="flex-1">
                <label className="block text-sm text-gray-600">شهر الانتهاء</label>
                <input
                  value={expiryMonth}
                  onChange={(e) => setExpiryMonth(e.target.value)}
                  placeholder="MM"
                  className="mt-1 w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm text-gray-600">سنة الانتهاء</label>
                <input
                  value={expiryYear}
                  onChange={(e) => setExpiryYear(e.target.value)}
                  placeholder="YY"
                  className="mt-1 w-full border rounded px-3 py-2"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-600">نوع البطاقة</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="mt-1 w-full border rounded px-3 py-2"
              >
                <option value="visa">Visa</option>
                <option value="mada">Mada</option>
                <option value="mastercard">MasterCard</option>
              </select>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="flex gap-2">
              <button className="bg-cyan-600 text-white px-4 py-2 rounded">حفظ البطاقة</button>
              <button
                type="button"
                onClick={() => {
                  setHolder("");
                  setNumber("");
                  setExpiryMonth("");
                  setExpiryYear("");
                  setType("visa");
                }}
                className="border px-4 py-2 rounded"
              >
                إلغاء
              </button>
            </div>

            <p className="text-xs text-gray-500">
              ملاحظة: هذا نموذج تجريبي لحفظ البطاقات في المتصفح فقط. لا تخزن بيانات حساسة (كـ CVV) في الإنتاج بدون تشفير واتباع معايير PCI.
            </p>
          </form>
        </section>

        <section className="p-6 border rounded-lg bg-white">
          <h2 className="font-medium mb-3">البطاقات المحفوظة</h2>
          {cards.length === 0 ? (
            <p className="text-sm text-gray-600">لم تضف أي بطاقات بعد.</p>
          ) : (
            <ul className="space-y-3">
              {cards.map((c) => (
                <li key={c.id} className="p-3 border rounded flex items-center justify-between">
                  <div>
                    <div className="font-medium">{c.holder}</div>
                    <div className="text-sm text-gray-600">{c.type.toUpperCase()} — {c.number}</div>
                    <div className="text-xs text-gray-500">انتهاء: {c.expiryMonth}/{c.expiryYear}</div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <button onClick={() => removeCard(c.id)} className="text-sm text-red-600">حذف</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
