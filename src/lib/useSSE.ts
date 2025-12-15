"use client";
import { useEffect, useRef } from "react";

type Opts = {
  url: string;
  onMessage: (data: any) => void;
};

export default function useSSE({ url, onMessage }: Opts) {
  const esRef = useRef<EventSource | null>(null);
  const ids = useRef<Set<string>>(new Set());
  const backoff = useRef(1000);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    let mounted = true;

    function connect() {
      try {
        esRef.current = new EventSource(url);
        esRef.current.onmessage = (e) => {
          try {
            const d = JSON.parse(e.data);
            // dedupe
            if (d && d.id && ids.current.has(d.id)) return;
            if (d && d.id) ids.current.add(d.id);
            onMessage(d);
          } catch (err) {
            // ignore parse errors
          }
        };
        esRef.current.onopen = () => {
          backoff.current = 1000;
        };
        esRef.current.onerror = () => {
          // try reconnect
          try { esRef.current?.close(); } catch {}
          if (!mounted) return;
          timer.current = window.setTimeout(() => {
            backoff.current = Math.min(30000, backoff.current * 1.6);
            connect();
          }, backoff.current);
        };
      } catch (e) {
        // fallback: schedule retry
        timer.current = window.setTimeout(() => {
          if (!mounted) return;
          connect();
        }, backoff.current);
      }
    }

    connect();

    return () => {
      mounted = false;
      try { esRef.current?.close(); } catch {}
      if (timer.current) clearTimeout(timer.current);
    };
  }, [url, onMessage]);
}

// ASSISTANT_FINAL: true
