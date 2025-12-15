"use client";

import React, { useEffect, useState } from "react";
// Stripe packages are loaded dynamically at runtime so the page still builds
// when `@stripe/stripe-js` and `@stripe/react-stripe-js` are not installed.

const PUB_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "";

function DevFallback({ onSaved }: { onSaved: (card: any) => void }) {
  // Simple fallback for local dev (kept but disabled in production)
  const [holder, setHolder] = useState("");
  const [number, setNumber] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState<string | null>(null);

  function maskNumber(num: string) {
    const cleaned = num.replace(/\s+/g, "");
    return cleaned.length > 4 ? "•••• •••• •••• " + cleaned.slice(-4) : cleaned;
  }

  function luhnCheck(num: string) {
    const cleaned = num.replace(/\D/g, "");
    let sum = 0;
    let shouldDouble = false;
    for (let i = cleaned.length - 1; i >= 0; i--) {
      let digit = parseInt(cleaned.charAt(i), 10);
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0;
  }

  function formatCardNumber(digits: string) {
    return digits.replace(/(\d{4})/g, "$1 ").trim();
  }

  function onNumberChange(v: string) {
    const digits = v.replace(/\D/g, "").slice(0, 19); // max 19 digits
    setNumber(formatCardNumber(digits));
  }

  function onCvvChange(v: string) {
    const digits = v.replace(/\D/g, "").slice(0, 4);
    setCvv(digits);
  }

  function onMonthChange(v: string) {
    const digits = v.replace(/\D/g, "").slice(0, 2);
    setMonth(digits);
  }

  function onYearChange(v: string) {
    const digits = v.replace(/\D/g, "").slice(0, 2);
    setYear(digits);
  }

  function save(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const cleaned = number.replace(/\D/g, "");
    if (cleaned.length < 13 || cleaned.length > 19) return setError("رقم البطاقة يجب أن يكون بين 13 و19 رقماً");
    if (!luhnCheck(cleaned)) return setError("رقم البطاقة غير صالح (Luhn)");
    if (!/^(0[1-9]|1[0-2])$/.test(month)) return setError("شهر غير صالح");
    if (!/^\d{2}$/.test(year)) return setError("أدخل سنة من خانتين (مثال: 25)");
    if (!/^[0-9]{3,4}$/.test(cvv)) return setError("رمز التحقق (CVV) يجب أن يكون 3 أو 4 أرقام");

    // Do NOT store CVV. Dev fallback only stores masked number and expiry.
    onSaved({ holder: holder.trim(), number: maskNumber(cleaned), expMonth: month, expYear: year });
    setHolder("");
    setNumber("");
    setMonth("");
    setYear("");
    setCvv("");
  }

  return (
    <form onSubmit={save} className="space-y-3">
      <div>
        <label className="block text-sm text-gray-600">اسم حامل البطاقة</label>
        <input value={holder} onChange={(e) => setHolder(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" required />
      </div>
      <div>
        <label className="block text-sm text-gray-600">رقم البطاقة</label>
        <input value={number} onChange={(e) => onNumberChange(e.target.value)} placeholder="1234 1234 1234 1234" className="mt-1 w-full border rounded px-3 py-2" inputMode="numeric" required />
      </div>
      <div className="flex gap-2">
        <div className="flex-1">
          <label className="block text-sm text-gray-600">شهر الانتهاء (MM)</label>
          <input value={month} onChange={(e) => onMonthChange(e.target.value)} placeholder="" className="mt-1 w-full border rounded px-3 py-2" inputMode="numeric" maxLength={2} required />
        </div>
        <div className="flex-1">
          <label className="block text-sm text-gray-600">سنة الانتهاء (YY)</label>
          <input value={year} onChange={(e) => onYearChange(e.target.value)} placeholder="" className="mt-1 w-full border rounded px-3 py-2" inputMode="numeric" maxLength={2} required />
        </div>
      </div>
      <div>
        <label className="block text-sm text-gray-600">رمز التحقق CVV</label>
        <input value={cvv} onChange={(e) => onCvvChange(e.target.value)} placeholder="123" className="mt-1 w-40 border rounded px-3 py-2" inputMode="numeric" required maxLength={4} />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex gap-2">
        <button className="bg-cyan-600 text-white px-4 py-2 rounded">حفظ البطاقة (Dev)</button>
      </div>
    </form>
  );
}

// StripeForm will be created dynamically inside the component when react-stripe-js
// is available so we avoid referencing Stripe hooks at module load time.

export default function CardsPage() {
  const [cards, setCards] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editHolder, setEditHolder] = useState("");
  const [editMonth, setEditMonth] = useState("");
  const [editYear, setEditYear] = useState("");
  const [editError, setEditError] = useState<string | null>(null);
  const [editLoading, setEditLoading] = useState(false);
  const [stripeJs, setStripeJs] = useState<any | null>(null);
  const [reactStripe, setReactStripe] = useState<any | null>(null);
  const [stripeLoadError, setStripeLoadError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("account.cards");
      if (raw) setCards(JSON.parse(raw));
    } catch (e) {
      console.warn("Failed to read cards from localStorage", e);
    }
  }, []);

  useEffect(() => {
    if (!PUB_KEY) return;
    let mounted = true;
    (async () => {
      try {
        const stripeJsMod = await import("@stripe/stripe-js");
        const reactStripeMod = await import("@stripe/react-stripe-js");
        if (mounted) {
          setStripeJs(stripeJsMod);
          setReactStripe(reactStripeMod);
        }
      } catch (err: any) {
        console.warn("Stripe packages not available:", err?.message || err);
        setStripeLoadError("Stripe packages not installed");
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  function onSaved(card: any) {
    // saved card is from server (prisma) or from dev fallback
    const entry = {
      id: card.id || Date.now().toString(),
      holder: card.holder || card.userId || "",
      brand: card.brand || card.brand,
      last4: card.last4 || card.number?.slice(-4),
      expMonth: card.expMonth || card.expiryMonth,
      expYear: card.expYear || card.expiryYear,
      stripePaymentMethodId: card.stripePaymentMethodId || card.paymentMethodId,
      createdAt: card.createdAt || new Date().toISOString(),
    };

    const next = [entry, ...cards];
    setCards(next);
    localStorage.setItem("account.cards", JSON.stringify(next));
  }

  function removeCard(id: string) {
    if (!confirm("هل تريد حقًا حذف هذه البطاقة؟")) return;
    const next = cards.filter((c) => c.id !== id);
    setCards(next);
    localStorage.setItem("account.cards", JSON.stringify(next));
  }

  function startEdit(card: any) {
    setEditingId(card.id);
    setEditHolder(card.holder || "");
    setEditMonth((card.expMonth || "").toString().padStart(2, "0").slice(-2));
    setEditYear((card.expYear || "").toString().slice(-2));
    setEditError(null);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditHolder("");
    setEditMonth("");
    setEditYear("");
    setEditError(null);
  }

  async function saveEdit(id: string) {
    setEditError(null);
    const cleanedMonth = editMonth.replace(/\D/g, "");
    const cleanedYear = editYear.replace(/\D/g, "");
    if (!/^(0[1-9]|1[0-2])$/.test(cleanedMonth)) return setEditError("شهر غير صالح");
    if (!/^\d{2}$/.test(cleanedYear)) return setEditError("أدخل سنة من خانتين (مثال: 25)");

    setEditLoading(true);
    try {
      const next = cards.map((c) => {
        if (c.id !== id) return c;
        return { ...c, holder: editHolder.trim(), expMonth: cleanedMonth, expYear: cleanedYear };
      });
      setCards(next);
      localStorage.setItem("account.cards", JSON.stringify(next));

      const card = cards.find((c) => c.id === id);
      // If this card was saved via Stripe, try to inform server to update metadata (non-blocking)
      if (card?.stripePaymentMethodId) {
        try {
          const res = await fetch("/api/payments/update-card", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ paymentMethodId: card.stripePaymentMethodId, holder: editHolder.trim(), expMonth: cleanedMonth, expYear: cleanedYear }),
          });
          if (!res.ok) {
            // server may not implement this route yet; just warn the user
            console.warn("Failed to update card on server", await res.text());
          }
        } catch (err) {
          console.warn("Update-card request failed", err);
        }
      }

      cancelEdit();
    } finally {
      setEditLoading(false);
    }
  }

  // If stripe modules are loaded, create a local StripeForm that uses their hooks
  let StripeElementsComp: any = null;
  let StripeFormLocal: any = null;
  if (stripeJs && reactStripe) {
    const { Elements, CardElement, useStripe, useElements } = reactStripe;

    StripeElementsComp = Elements;

    StripeFormLocal = function StripeFormLocal({ onSaved }: { onSaved: (card: any) => void }) {
      const stripe = useStripe();
      const elements = useElements();
      const [holder, setHolder] = useState("");
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState<string | null>(null);

      async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        if (!stripe || !elements) return setError("Stripe not loaded");
        const cardEl = elements.getElement(CardElement) as any | null;
        if (!cardEl) return setError("Card element not found");

        setLoading(true);
        const { error: createErr, paymentMethod } = await stripe.createPaymentMethod({
          type: "card",
          card: cardEl,
          billing_details: { name: holder || undefined },
        });

        if (createErr) {
          setLoading(false);
          setError(createErr.message || "خطأ في إدخال البطاقة");
          return;
        }

        try {
          const userRaw = localStorage.getItem("user");
          const user = userRaw ? JSON.parse(userRaw) : null;
          if (!user?.id) {
            setError("مستخدم غير موجود - سجّل دخولك");
            setLoading(false);
            return;
          }

          const res = await fetch("/api/payments/save-card", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ paymentMethodId: paymentMethod?.id, userId: user.id }),
          });

          const data = await res.json();
          if (!res.ok) throw new Error(data.message || "خطأ في الخادم");

          onSaved(data.card);
        } catch (err: any) {
          setError(err?.message || "خطأ أثناء الحفظ");
        } finally {
          setLoading(false);
        }
      }

      return (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm text-gray-600">اسم حامل البطاقة</label>
            <input value={holder} onChange={(e) => setHolder(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" required />
          </div>

          <div>
            <label className="block text-sm text-gray-600">تفاصيل البطاقة</label>
            <div className="mt-1 p-3 border rounded bg-white">
              <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
            </div>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex gap-2">
            <button className="bg-cyan-600 text-white px-4 py-2 rounded" disabled={loading}>{loading ? 'جاري الحفظ...' : 'حفظ البطاقة'}</button>
          </div>
        </form>
      );
    };
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">إدارة البطاقات</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <section className="p-6 border rounded-lg bg-white">
          <h2 className="font-medium mb-3">أضف بطاقة جديدة</h2>
          {PUB_KEY && stripeJs && reactStripe && StripeElementsComp && StripeFormLocal ? (
            <StripeElementsComp stripe={stripeJs.loadStripe(PUB_KEY)}>
              <StripeFormLocal onSaved={onSaved} />
            </StripeElementsComp>
          ) : (
            <DevFallback onSaved={onSaved} />
          )}
          <p className="text-xs text-gray-500 mt-3">ملاحظة: في الإنتاج يجب ربط مفاتيح Stripe في المتغيرات البيئية (STRIPE_SECRET_KEY و NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY).</p>
        </section>

        <section className="p-6 border rounded-lg bg-white">
          <h2 className="font-medium mb-3">البطاقات المحفوظة</h2>
          {cards.length === 0 ? (
            <p className="text-sm text-gray-600">لم تضف أي بطاقات بعد.</p>
          ) : (
            <ul className="space-y-3">
              {cards.map((c) => (
                <li key={c.id} className="p-3 border rounded">
                  {editingId === c.id ? (
                    <div className="space-y-2">
                      <div>
                        <label className="block text-sm text-gray-600">اسم حامل البطاقة</label>
                        <input value={editHolder} onChange={(e) => setEditHolder(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" />
                      </div>
                      <div className="flex gap-2">
                        <input value={editMonth} onChange={(e) => setEditMonth(e.target.value.replace(/\D/g, "").slice(0,2))} placeholder="" className="mt-1 w-1/2 border rounded px-3 py-2" inputMode="numeric" maxLength={2} />
                        <input value={editYear} onChange={(e) => setEditYear(e.target.value.replace(/\D/g, "").slice(0,2))} placeholder="" className="mt-1 w-1/2 border rounded px-3 py-2" inputMode="numeric" maxLength={2} />
                      </div>
                      {editError && <div className="text-sm text-red-600">{editError}</div>}
                      <div className="flex gap-2">
                        <button onClick={() => saveEdit(c.id)} disabled={editLoading} className="bg-cyan-600 text-white px-3 py-1 rounded">{editLoading ? 'جاري الحفظ...' : 'حفظ'}</button>
                        <button onClick={cancelEdit} className="px-3 py-1 rounded border">إلغاء</button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{c.holder}</div>
                        <div className="text-sm text-gray-600">{(c.brand || "").toUpperCase()} — •••• •••• •••• {c.last4}</div>
                        <div className="text-xs text-gray-500">انتهاء: {c.expMonth}/{c.expYear}</div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="flex gap-2">
                          <button onClick={() => startEdit(c)} className="text-sm text-blue-600">تعديل</button>
                          <button onClick={() => removeCard(c.id)} className="text-sm text-red-600">حذف</button>
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
