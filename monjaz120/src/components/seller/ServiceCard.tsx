"use client";

import React from "react";

type Service = {
  id: string;
  title: string;
  price?: number;
  images?: string[];
  rating?: number;
  description?: string;
};

export default function ServiceCard({ service, onView, onDelete, onEdit }: { service: Service; onView: (s: Service) => void; onDelete?: (id: string) => void; onEdit?: (s: Service) => void }) {
  return (
    <div className="relative rounded-2xl border border-black bg-white overflow-hidden shadow-sm hover:shadow-md transition duration-150 rtl">
  <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
        {service.images && service.images.length > 0 ? (
          // normalize image urls for dev fallback (data/uploads) -> use API proxy
          (() => {
            const img = service.images![0];
            let src = img;
            try {
              // if it's an absolute URL (http/https) leave it as-is
              if (/^https?:\/\//i.test(img)) {
                src = img;
              } else if (img.startsWith('/data/uploads/')) {
                // convert to API URL that serves files from data/uploads
                const parts = img.split('/');
                const filename = parts[parts.length - 1];
                src = `/api/static/uploads?name=${encodeURIComponent(filename)}`;
              } else if (img.startsWith('/uploads/')) {
                // already public-friendly
                src = img;
              }
            } catch (e) {
              src = img;
            }
            // eslint-disable-next-line @next/next/no-img-element
            return <img src={src} alt={service.title} className="w-full h-full object-cover" />;
          })()
        ) : (
          <div className="text-gray-400">لا توجد صورة</div>
        )}
      </div>
  <div className="pt-5 pb-12 px-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="transform -translate-y-[6px] font-semibold text-sm mb-1 truncate">{service.title}</h3>
          <div className="transform -translate-y-[6px] text-sm text-slate-900 font-semibold">{`${service.price ?? 0} ر.س`}</div>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-gray-500">{(service as any).ordersCount ? `${(service as any).ordersCount} طلب` : ''}</span>
          </div>
        </div>

        {/* action buttons: moved to absolute bottom-right to align with rating */}
      </div>
      {/* pinned rating in bottom-left so it doesn't affect flow */}
  <div className="absolute right-3 bottom-2 flex gap-2">
        <button onClick={() => onView(service)} className="px-3 py-1 bg-cyan-600 text-white rounded text-sm">عرض</button>
        <button onClick={() => onEdit ? onEdit(service) : onView(service)} className="px-3 py-1 border border-black rounded text-sm">تعديل</button>
        <button onClick={() => onDelete ? onDelete(service.id) : undefined} className="px-3 py-1 border border-black rounded text-sm text-red-600">حذف</button>
      </div>

      <div className="absolute left-3 bottom-3">
        <span className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-md text-sm font-semibold shadow-sm">{service.rating ?? "-"} ★</span>
      </div>
    </div>
  );
}

// ASSISTANT_FINAL: true
