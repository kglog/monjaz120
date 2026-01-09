// src/app/admin-login/page.tsx
"use client";

import { useState } from "react";

export default function AdminLoginPage() {
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErr("");

    const res = await fetch("/api/admin/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pass }),
    });

    setLoading(false);
    if (res.ok) {
      window.location.href = "/orders";
    } else {
      const data = await res.json().catch(() => ({}));
      setErr(data?.message || "كلمة مرور غير صحيحة");
    }
  };

  return (
    <main className="max-w-sm mx-auto p-6">
      <h1 className="text-center text-2xl font-bold mb-6">تسجيل دخول المدير</h1>

      <form onSubmit={submit} className="space-y-3">
        <input
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          placeholder="أدخل كلمة المرور"
          className="w-full border-2 border-black rounded-md px-3 py-2"
        />
        {err && <p className="text-red-600 text-sm">{err}</p>}
        <button
          disabled={loading}
          className="w-full border-2 border-black rounded-md px-3 py-2 hover:bg-gray-50"
        >
          {loading ? "جاري الدخول..." : "دخول"}
        </button>
      </form>
    </main>
  );
}
