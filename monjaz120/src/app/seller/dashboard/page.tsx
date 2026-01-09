"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import SellerStatsBar from '@/components/seller/SellerStatsBar';
import ServiceCard from '@/components/seller/ServiceCard';
import ServiceModal from '@/components/seller/ServiceModal';
import OrdersTable from '@/components/seller/OrdersTable';
import useCurrentUser from '@/app/components/useCurrentUser';

type User = { id: string; name?: string | null; email?: string | null; role?: string | null; avatar?: string | null };

function UploadWidget({ userId }: { userId: string }) {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  async function handleUpload() {
    if (!file) return;
    setStatus("requesting signed url...");

    const signedRes = await fetch("/api/uploads/signed-url", {
      method: "POST",
      headers: { "content-type": "application/json", "x-user-id": userId },
      body: JSON.stringify({ filename: file.name, contentType: file.type }),
    });
    const signed = await signedRes.json();
    if (!signed.ok || !signed.url) {
      setStatus(`signed-url error: ${signed.error || "unknown"}`);
      return;
    }

    setStatus("uploading to S3...");
    const putRes = await fetch(signed.url, { method: "PUT", body: file, headers: { "Content-Type": file.type } });
    if (!putRes.ok && putRes.status !== 200 && putRes.status !== 204) {
      setStatus(`upload failed: ${putRes.status}`);
      return;
    }

    setStatus("finalizing...");
    const completeRes = await fetch("/api/uploads/complete", {
      method: "POST",
      headers: { "content-type": "application/json", "x-user-id": userId },
      body: JSON.stringify({ key: signed.key, filename: file.name, size: file.size, mime: file.type }),
    });
    const complete = await completeRes.json();
    if (!complete.ok) {
      setStatus(`complete error: ${complete.error || "unknown"}`);
      return;
    }

    setStatus("uploaded and recorded");
    setFile(null);
  }

  return (
    <div className="p-4 border rounded-md bg-white shadow-sm">
      <h3 className="font-semibold mb-2">رفع صور الخدمة (للبائع فقط)</h3>
      <input
        aria-label="اختر صورة"
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
        className="mb-2"
      />
      <div className="flex gap-2">
        <button
          disabled={!file}
          onClick={handleUpload}
          className="px-3 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          ارفع
        </button>
        <div className="text-sm text-gray-600 self-center">{status}</div>
      </div>
    </div>
  );
}

export default function SellerDashboardPage() {
  const { user, loading } = useCurrentUser();
  const [services, setServices] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedService, setSelectedService] = useState<any | null>(null);
  const [dataLoading, setDataLoading] = useState(true);

  // load services and orders for the seller
  useEffect(() => {
    let mounted = true;
    async function loadData() {
      setDataLoading(true);
      try {
        const [svcRes, ordRes] = await Promise.all([
          fetch('/api/seller/services').then(r => r.json()).catch(() => ({ services: [] })),
          fetch('/api/seller/orders').then(r => r.json()).catch(() => ({ orders: [] })),
        ]);

        if (!mounted) return;
        setServices(Array.isArray(svcRes?.services) ? svcRes.services : []);
        setOrders(Array.isArray(ordRes?.orders) ? ordRes.orders : []);
      } catch (err) {
        console.error('dashboard load error', err);
      } finally {
        if (mounted) setDataLoading(false);
      }
    }

    loadData();
    return () => { mounted = false; };
  }, [user?.id]);

  // Shared delete handler used by both the modal and the card delete button
  async function handleDelete(id: string) {
    if (!confirm('هل أنت متأكد أنك تريد حذف هذه الخدمة؟')) return;
    try {
      const res = await fetch(`/api/seller/services/${id}`, { method: 'DELETE' });
      let body: any = {};
      try { body = await res.json(); } catch (e) { body = { error: `status ${res.status}` }; }
      if (!res.ok) {
        console.error('delete failed', res.status, body);
        alert(`فشل حذف الخدمة: ${body?.error || 'خطأ غير معروف'}`);
        return;
      }
      // success: remove from local list and close modal if open
      setServices((cur: any) => cur.filter((s: any) => (s.id || s._id) !== id));
      setSelectedService((cur: any) => ((cur && ((cur.id || cur._id) === id)) ? null : cur));
    } catch (err) {
      console.error('delete service error', err);
      alert('فشل حذف الخدمة — تحقق من سطر الأوامر (terminal) لمزيد من التفاصيل');
    }
  }

  // Listen for uploads and update services list and selectedService in-memory so UI updates immediately
  useEffect(() => {
    function handler(e: any) {
      try {
        const detail = e?.detail || {};
        if (!detail) return;
        const svcId = detail.serviceId;
        // update services list
        if (svcId) {
          setServices((cur: any) => cur.map((s: any) => ((s.id || s._id) === svcId ? { ...s, images: [detail.url, ...(s.images || [])] } : s)));
          // also update selectedService if it's the same
          setSelectedService((cur: any) => {
            if (!cur) return cur;
            if ((cur.id || cur._id) === svcId) {
              return { ...cur, images: [detail.url, ...(cur.images || [])] };
            }
            return cur;
          });
        }
      } catch (err) {
        // ignore
      }
    }
    window.addEventListener("service-image-uploaded", handler as EventListener);
    return () => window.removeEventListener("service-image-uploaded", handler as EventListener);
  }, []);

  if (loading) return <div className="p-6">جارٍ التحميل...</div>;

  // If not logged in or not a seller/vendor, show a read-only public view encouragement
  if (!user || (user.role !== "seller" && user.role !== "vendor")) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold">لوحة البائع (مقتصر على البائعين)</h1>
        <p className="mt-2 text-gray-700">الصفحة هذه مخصّصة للبائعين لإدارة خدماتهم. إذا كنت مشتريًا فمرحبًا بك في صفحة العرض — لا تُعرض لديك أدوات الرفع.</p>
        <div className="mt-4 p-4 border rounded bg-yellow-50">الوصول مقيّد: تحتاج أن تكون دورك <strong>seller</strong> لرفع صور أو إدارة الخدمات.</div>
      </div>
    );
  }

  const displayName = (() => {
    if (!user) return 'بائع';
    const isDevLabel = (n?: string | null) => {
      if (!n) return true;
      const cleaned = n.trim().toLowerCase();
      return cleaned === 'devseller' || cleaned === 'dev seller' || cleaned === 'dev';
    };

    // First, prefer the navbar/localStorage username if present (ensures parity with top menu)
    try {
      if (typeof window !== 'undefined') {
        const raw = localStorage.getItem('user');
        if (raw) {
          const parsed = JSON.parse(raw);
          const uname = parsed?.username || parsed?.name || parsed?.userName || null;
          if (uname && !isDevLabel(uname)) return uname;
        }
      }
    } catch (e) {
      // ignore parse errors
    }

    // Prefer a real user name if it's not the dev placeholder
    if (user.name && !isDevLabel(user.name)) return user.name;

    // Otherwise, look through services for a non-dev seller name
    if (Array.isArray(services) && services.length > 0) {
      const found = services.find((s: any) => s?.seller && !isDevLabel(String(s.seller)));
      if (found && found.seller) return found.seller;
    }

    // fallback to email or a neutral label
    // as a last resort, try localStorage (the navbar saves a `user` object there)
    try {
      if (typeof window !== 'undefined') {
        const raw = localStorage.getItem('user');
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed && parsed.username && !isDevLabel(parsed.username)) return parsed.username;
        }
      }
    } catch (e) {
      // ignore
    }

    return (user.email && !isDevLabel(user.email) ? user.email : 'بائع');
  })();

  return (
    <div className="p-6 space-y-6">
      <header className="flex items-center gap-4">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
          {user.avatar ? <img src={user.avatar} alt="avatar" /> : <span className="text-2xl">{displayName ? displayName[0] : "ب"}</span>}
        </div>
        <div>
          <h1 className="text-2xl font-semibold">مرحباً، {displayName}</h1>
    <div className="text-sm text-gray-500">لوحة تحكم البائع — إدارة الخدمات والطلبات</div>
        </div>
      </header>

      {/* Seller stats bar (quick overview) */}
      <SellerStatsBar userId={user?.id} />

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <main className="lg:col-span-2 space-y-6">
          {/* Services grid */}
          <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">خدماتي</h2>
                <div className="text-sm text-gray-500">يمكنك الضغط على "عرض" لرؤية التفاصيل أو تحرير الخدمة</div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="seller-services-grid">
                {dataLoading ? (
                  <div className="col-span-2 p-4 text-center text-gray-500">جارٍ تحميل الخدمات...</div>
                ) : services.length === 0 ? (
                  <div className="col-span-2 p-4 text-center text-gray-500">لا توجد خدمات بعد. أنشئ أول خدمة لك.</div>
                ) : (
                  services.map((s) => (
                    <ServiceCard key={s.id || s._id} service={s} onView={(svc) => setSelectedService(svc)} onDelete={handleDelete} />
                  ))
                )}
              </div>
          </div>

          {/* Orders table */}
          <div>
            <h2 className="text-lg font-semibold mb-3">الطلبات</h2>
            <div className="p-4 bg-white border-2 border-black rounded-lg">
              {dataLoading ? (
                <div className="text-gray-500">جارٍ تحميل الطلبات...</div>
              ) : (
                <OrdersTable orders={orders} sellerView={true} />
              )}
            </div>
          </div>
        </main>

        <aside className="space-y-4">
            <div className="p-3 bg-white -mt-6">
              <h3 className="font-semibold mb-2">إجراءات سريعة</h3>
              <div className="text-sm text-gray-600 mb-3">أزرار لإنشاء خدمة جديدة، مشاهدة المبيعات، أو تعديل الإعدادات.</div>
              <div className="flex flex-col gap-2">
                <Link href="/seller/services/new" className="inline-flex items-center justify-center rounded-xl px-3 py-2 bg-[#d3e5f5] text-black font-medium hover:bg-[#c7def0]">
                  إنشاء خدمة جديدة
                </Link>
                <Link href="/seller/orders" className="inline-flex items-center justify-center rounded-xl px-3 py-2 bg-white text-black font-medium border border-black hover:bg-gray-50">
                  مشاهدة الطلبات
                </Link>
                <Link href="/seller/settings" className="inline-flex items-center justify-center rounded-xl px-3 py-2 bg-white text-black font-medium border border-black hover:bg-gray-50">
                  الإعدادات
                </Link>
              </div>
            </div>
        </aside>
      </section>
      {/* Service details modal */}
      {selectedService && (
        <ServiceModal
          service={selectedService}
          userId={user?.id}
          onClose={() => setSelectedService(null)}
          onDelete={handleDelete}
          onToggleActive={async (id, next) => {
            try {
              const res = await fetch(`/api/seller/services/${id}`, { method: 'PATCH', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ active: next }) });
              const json = await res.json().catch(() => ({}));
              if (!res.ok) throw new Error(json.error || 'update failed');
              setServices((cur: any) => cur.map((s: any) => ((s.id || s._id) === id ? { ...s, active: next } : s)));
              setSelectedService((cur: any) => {
                if (!cur) return cur;
                return ((cur.id || cur._id) === id) ? { ...cur, active: next } : cur;
              });
            } catch (err) {
              console.error('toggle active error', err);
              alert('فشل تحديث حالة الخدمة');
            }
          }}
        />
      )}
  {/* Service details modal (rendered above with userId) */}
    </div>
  );
}

// ASSISTANT_FINAL: true
