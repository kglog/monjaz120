"use client";

import React, { useState } from "react";

export default function UploadWidget({ userId, serviceId }: { userId: string; serviceId?: string }) {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  async function handleUpload() {
    if (!file) return;

    // Determine effective user id: prefer the prop, fallback to localStorage 'user' object if available.
    let effectiveUserId = userId;
    try {
      if ((!effectiveUserId || String(effectiveUserId).trim() === "") && typeof window !== "undefined") {
        const raw = window.localStorage.getItem("user");
        if (raw) {
          const parsed = JSON.parse(raw);
          // common keys: id, _id, userId
          effectiveUserId = parsed?.id || parsed?._id || parsed?.userId || effectiveUserId;
        }
      }
    } catch (e) {
      // ignore parse errors
    }

    // Guard: ensure we have a userId to send to the server
    if (!effectiveUserId || String(effectiveUserId).trim() === "") {
      setStatus("خطأ: لم يتم تمرير معرف البائع. سجّل دخولك أو أعد تحميل الصفحة.");
      return;
    }

    setStatus("requesting signed url...");

    const signedRes = await fetch("/api/uploads/signed-url", {
      method: "POST",
      headers: { "content-type": "application/json", "x-user-id": effectiveUserId, ...(serviceId ? { "x-service-id": serviceId } : {}) },
      body: JSON.stringify({ filename: file.name, contentType: file.type }),
    });
    const signed = await signedRes.json();
    // Surface the raw signed response in the widget status during dev to aid debugging
    if (!signed.ok || !signed.url) {
      setStatus(`signed-url error: ${JSON.stringify(signed)}`);
      return;
    }
    if (signed.local) setStatus(`got local upload url`);
    else setStatus(`got signed upload url`);

    setStatus("uploading to S3...");
    const putRes = await fetch(signed.url, {
      method: "PUT",
      body: file,
      headers: { "Content-Type": file.type, "x-user-id": effectiveUserId || "" },
    });
    if (!putRes.ok && putRes.status !== 200 && putRes.status !== 204) {
      setStatus(`upload failed: ${putRes.status}`);
      return;
    }

    setStatus("finalizing...");
    const completeRes = await fetch("/api/uploads/complete", {
      method: "POST",
      headers: { "content-type": "application/json", "x-user-id": effectiveUserId, ...(serviceId ? { "x-service-id": serviceId } : {}) },
      body: JSON.stringify({ key: signed.key, filename: file.name, size: file.size, mime: file.type }),
    });
    const complete = await completeRes.json();
    if (!complete.ok) {
      setStatus(`complete error: ${complete.error || "unknown"}`);
      return;
    }

    setStatus("uploaded and recorded");
    // dispatch a global event so parent modal/page can update UI immediately
    try {
      const previewUrl = URL.createObjectURL(file);
      const eventDetail = { serviceId: serviceId || null, url: previewUrl, filename: file.name, key: signed.key };
      window.dispatchEvent(new CustomEvent("service-image-uploaded", { detail: eventDetail }));
    } catch (e) {
      // ignore if dispatch fails
    }
    setFile(null);
  }

  return (
    <div className="p-3 border rounded bg-white">
      <h4 className="font-semibold mb-2">رفع صور الخدمة</h4>
      <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} className="mb-2" />
      <div className="flex gap-2">
        <button disabled={!file} onClick={handleUpload} className="px-3 py-1 bg-cyan-600 text-white rounded disabled:opacity-50">رفع</button>
        <div className="text-sm text-gray-600 self-center">{status}</div>
      </div>
    </div>
  );
}

// ASSISTANT_FINAL: true
