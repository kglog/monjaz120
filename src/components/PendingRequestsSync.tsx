"use client";
import { useEffect } from 'react';

export default function PendingRequestsSync() {
  useEffect(() => {
    async function sync() {
      try {
        const raw = localStorage.getItem('pending_requests');
        if (!raw) return;
        const items = JSON.parse(raw);
        if (!Array.isArray(items) || items.length === 0) return;

        for (const it of items) {
          try {
            const res = await fetch('/api/requests', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(it),
            });
            if (res.ok) {
              // remove this item from local list
              const current = JSON.parse(localStorage.getItem('pending_requests') || '[]');
              const remaining = current.filter((x: any) => x.__localId !== it.__localId);
              localStorage.setItem('pending_requests', JSON.stringify(remaining));
            }
          } catch (e) {
            // stop trying if network fails
            break;
          }
        }
      } catch (e) {
        // ignore parse errors
      }
    }

    sync();

    // retry when browser regains network
    function onOnline() { sync(); }
    window.addEventListener('online', onOnline);
    return () => { window.removeEventListener('online', onOnline); };
  }, []);

  return null;
}

// ASSISTANT_FINAL: true
