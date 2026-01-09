"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import useCurrentUser from "@/app/components/useCurrentUser";

type Service = { id: string; title: string; seller: string; priceFrom: string; rating: number };

export default function SellerServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const { user: currentUser, loading } = useCurrentUser();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/api/seller/services");
        const json = await res.json();
        if (!mounted) return;
        const all = json.services || [];
        // if we have a logged-in seller, filter to only their services
        if (currentUser && currentUser.name) {
          const filtered = all.filter((s: any) => String(s.seller || s.author || '').toLowerCase() === String(currentUser.name || '').toLowerCase());
          setServices(filtered);
        } else {
          // fallback: keep empty until user resolved
          setServices([]);
        }
      } catch (err) {
        setServices([]);
      }
    })();
    return () => { mounted = false; };
  }, [currentUser]);

// ASSISTANT_FINAL: true

  return (
    <main className="p-6 min-h-screen bg-white">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">خدماتي</h1>
          <Link href="/seller/services/new" className="px-3 py-2 bg-cyan-600 text-white rounded">أضف خدمة</Link>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {services.map((s) => (
            <article key={s.id} className="p-4 border rounded bg-white shadow-sm">
              <div className="h-40 mb-3 bg-slate-50 rounded overflow-hidden flex items-center justify-center">
                {s.images && s.images[0] ? (
                  <img src={`/api/static/uploads?name=${encodeURIComponent(s.images[0].split('/').pop())}`} alt={s.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-slate-400">لا توجد صورة</div>
                )}
              </div>
              <h3 className="font-semibold">{s.title}</h3>
              <p className="text-sm text-slate-600">بائع: {s.seller}</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="font-bold">{s.priceFrom}</span>
                <Link href={`/seller/services/${s.id}`} className="text-sm text-cyan-600">تحرير</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
