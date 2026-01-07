"use client";

import React, { useEffect, useState } from "react";
import UploadWidget from './UploadWidget';

type Service = {
  id: string;
  title: string;
  price?: number;
  images?: string[];
  rating?: number;
  description?: string;
};

export default function ServiceModal({ service, onClose, onDelete, onToggleActive, userId }: { service: Service | null; onClose: () => void; onDelete?: (id: string) => Promise<void>; onToggleActive?: (id: string, next: boolean) => Promise<void>; userId?: string; }) {
  if (!service) return null;
  const [images, setImages] = useState<string[]>(service.images || []);
  const [active, setActive] = useState<boolean>((service as any).active ?? false);
  const [loadingToggle, setLoadingToggle] = useState(false);

  // keep images in sync when the service prop changes (e.g., when modal reopened)
  useEffect(() => {
    setImages(service.images || []);
    setActive((service as any).active ?? false);
  }, [service.images]);

  useEffect(() => {
    function handler(e: any) {
      try {
        const detail = e?.detail || {};
        if (!detail) return;
        if (detail.serviceId && detail.serviceId !== service.id) return;
        if (detail.url) {
          setImages((cur) => [detail.url, ...cur]);
        }
      } catch (err) {
        // ignore
      }
    }
    window.addEventListener("service-image-uploaded", handler as EventListener);
    return () => window.removeEventListener("service-image-uploaded", handler as EventListener);
  }, [service.id]);

  return (
    <div className="fixed inset-0 bg-black/40 z-40 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white rounded shadow-lg overflow-auto max-h-[90vh]">
        <div className="p-4 border-b flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold">{service.title}</h3>
            <div className="text-sm text-gray-500">{`${service.price ?? 0} ر.س`} — تقييم: {service.rating ?? "-"}★</div>
          </div>
          <div>
            <button onClick={onClose} className="px-3 py-1 border rounded">إغلاق</button>
          </div>
        </div>

        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            {images && images.length > 0 ? (
              <div className="grid grid-cols-2 gap-2">
                {images.map((src, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={i} src={src} alt={`${service.title} ${i + 1}`} className="w-full h-40 object-cover rounded" />
                ))}
              </div>
            ) : (
              <div className="h-40 bg-gray-100 flex items-center justify-center">لا توجد صور</div>
            )}

            <div className="mt-4 text-sm text-gray-700">{service.description || "لا يوجد وصف"}</div>
          </div>

          <aside className="p-2 border rounded space-y-3">
            <div>
              <UploadWidget userId={userId || ""} serviceId={service.id} />
            </div>
            <div className="space-y-2">
              <button
                onClick={async () => {
                  if (!onToggleActive) return;
                  if (active) return; // already active
                  setLoadingToggle(true);
                  try {
                    await onToggleActive(service.id, true);
                    setActive(true);
                  } catch (err) {
                    console.error('toggle active error', err);
                    alert('فشل تحديث حالة الخدمة');
                  } finally {
                    setLoadingToggle(false);
                  }
                }}
                disabled={loadingToggle || active}
                className={`w-full px-3 py-2 border rounded ${active ? 'opacity-50 cursor-not-allowed' : 'bg-white'}`}
              >
                إظهار
              </button>

              <button
                onClick={async () => {
                  if (!onToggleActive) return;
                  if (!active) return; // already hidden
                  setLoadingToggle(true);
                  try {
                    await onToggleActive(service.id, false);
                    setActive(false);
                  } catch (err) {
                    console.error('toggle active error', err);
                    alert('فشل تحديث حالة الخدمة');
                  } finally {
                    setLoadingToggle(false);
                  }
                }}
                disabled={loadingToggle || !active}
                className={`w-full px-3 py-2 border rounded ${!active ? 'opacity-50 cursor-not-allowed' : 'bg-white'}`}
              >
                إخفاء
              </button>
            </div>
            <div>
              <button onClick={() => onDelete ? onDelete(service.id) : undefined} className="w-full px-3 py-2 border rounded text-red-600">حذف نهائي</button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

// ASSISTANT_FINAL: true
