"use client";

import { useEffect, useState } from "react";

export type CurrentUser = { id: string; name?: string | null; email?: string | null; role?: string | null; avatar?: string | null } | null;

export default function useCurrentUser() {
  const [user, setUser] = useState<CurrentUser>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (!mounted) return;
        const data = await res.json();
        // Normalize backend role values so the UI always sees 'seller' for vendors
  let rawUser = data.user || null;
        // If API didn't return a user name, try to read the app's localStorage
        // where the navbar may have stored a `user` object with `username`.
        try {
          if ((!rawUser || !rawUser.name) && typeof window !== 'undefined') {
            const stored = localStorage.getItem('user');
            if (stored) {
              const parsed = JSON.parse(stored);
              if (parsed && parsed.username) {
                if (!rawUser) rawUser = { id: parsed.id || parsed.userId || 'local', name: parsed.username, email: parsed.email || null, role: parsed.role || null, avatar: parsed.avatar || null } as any;
                else if (!rawUser.name) rawUser.name = parsed.username;
                if (!rawUser.email && parsed.email) rawUser.email = parsed.email;
              }
            }
          }
        } catch (e) {
          // ignore localStorage parsing errors
        }

        if (rawUser && rawUser.role === 'vendor') {
          rawUser.role = 'seller';
        }
        setUser(rawUser);
      } catch (e) {
        setUser(null);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return { user, loading };
}

// ASSISTANT_FINAL: true
