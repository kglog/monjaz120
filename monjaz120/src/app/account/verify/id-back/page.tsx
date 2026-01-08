<<<<<<< HEAD
'use client';
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function IdBackPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    const selectedFile = e.target.files?.[0] || null;
    if (selectedFile && !selectedFile.type.startsWith("image/")) {
      setError("يرجى رفع صورة (jpeg أو png فقط)");
      setFile(null);
      return;
    }
    setFile(selectedFile);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!file) {
      setError("يرجى رفع صورة وجه الهوية الخلفية.");
      return;
    }
    // هنا ترفع الصورة للسيرفر (لو فيه API)
    // بعد نجاح الرفع تنتقل للخطوة التالية
    router.push("/account/verify/selfie");
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow mt-10">
      <h2 className="text-xl font-bold mb-6 text-center text-cyan-700">
        رفع صورة الهوية (وجه خلفي)
      </h2>
      <div className="mb-5 p-4 bg-gray-50 border border-gray-200 rounded text-sm">
        <b>يرجى رفع صورة واضحة للوجه الخلفي للهوية.</b><br/>
        يجب أن تظهر كل البيانات والأرقام بوضوح، الحواف سوداء وحادة.<br/>
        لا تقم بتغطية أو تعديل أي جزء من الصورة.<br/>
        أي صورة غير واضحة أو معدلة سيتم رفضها تلقائيًا.<br/>
        <hr className="my-2" />
        <b>Please upload a clear image of your ID back side.</b><br/>
        All details and numbers must be visible, edges black and sharp.<br/>
        Do not cover or edit any part of the image.<br/>
        Any unclear or edited images will be rejected automatically.<br/>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mb-4"
        />
        {error && <div className="text-red-600 mb-4">{error}</div>}
        <button
          type="submit"
          className="w-full py-3 bg-cyan-600 text-white font-bold rounded hover:bg-cyan-700"
        >
          حفظ ومتابعة
        </button>
      </form>
    </div>
  );
}
=======
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { preCheck } from "../id-front/client-guard";
import brain from "@/core/brain"; // ✅ إضافة: ربط مع النواة الذكية

const MAX_SIZE = 8 * 1024 * 1024; // 8MB

export default function IdBackPage() {
  const router = useRouter();
  const [backFile, setBackFile] = useState<File | null>(null);
  const [selfie, setSelfie] = useState<File | null>(null);
  const [backPreview, setBackPreview] = useState<string | null>(null);
  const [selfiePreview, setSelfiePreview] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [statusMsg, setStatusMsg] = useState<React.ReactNode | null>(null);
  const [uploading, setUploading] = useState(false);
  const backRef = useRef<HTMLInputElement | null>(null);
  const selfieRef = useRef<HTMLInputElement | null>(null);
  const videoSelfieRef = useRef<HTMLVideoElement | null>(null);
  const canvasSelfieRef = useRef<HTMLCanvasElement | null>(null);
  const [cameraSelfieOpen, setCameraSelfieOpen] = useState(false);
  const mediaSelfieRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    return () => {
      if (backPreview) URL.revokeObjectURL(backPreview);
      if (selfiePreview) URL.revokeObjectURL(selfiePreview);
    };
  }, [backPreview, selfiePreview]);

  // ✅ خفّفنا شرط الحجم الافتراضي (من 700 إلى 300) عشان ما تنرفض كل صور قوقل
  function handleFile(
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: any,
    setPreview: any,
    minW = 300,
    minH = 300
  ) {
    setError("");
    const f = e.target.files?.[0] || null;
    if (!f) {
      setFile(null);
      setPreview(null);
      return;
    }
    (async () => {
      try {
        await preCheck(f, { minW, minH, maxSize: MAX_SIZE });
      } catch (err: any) {
        setError(err?.message || "خطأ في الملف.");
        setFile(null);
        setPreview(null);
        return;
      }
      setFile(f);
      setPreview(URL.createObjectURL(f));
    })();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!backFile) return setError("يرجى رفع صورة ظهر الهوية.");
    if (!selfie) return setError("يرجى رفع صورة سيلفي تحمل الهوية في اليد.");

    setUploading(true);
    try {
      const form = new FormData();
      form.append("back", backFile as Blob);
      form.append("selfie", selfie as Blob);

      const res = await fetch("/api/account/verify/id-back", {
        method: "POST",
        body: form,
      });
      const data = await res.json().catch(() => ({} as any));

      if (!res.ok) {
        // نفس خريطة الأخطاء حقتك
        const map: Record<string, string> = {
          TYPE: "صيغة غير مدعومة. ارفع صورة من نوع JPG أو PNG.",
          SIZE: "حجم الصورة كبير. قلّل الجودة أو استخدم صورة أقل من 8MB.",
          SMALL:
            "الصورة غير واضحة بما يكفي، حاول التقاط صورة أوضح وأقرب للهوية.",
          BLUR: "الصورة مهزوزة أو غير واضحة. أعد التقاطها مع تثبيت الكاميرا.",
          GLARE:
            "الصورة غير واضحة بسبب الإضاءة أو اللمعة. جرّب التصوير في إضاءة أهدأ بدون فلاش مباشر.",
          MOD: "تم رصد تعديل قوي على الصورة. استخدم صورة أصلية مباشرة من الكاميرا.",
          EXPIRE_MISMATCH:
            "بيانات ظهر الهوية لا تطابق الوجه الأمامي. تأكد من تصوير نفس البطاقة من الجهتين.",
          NO_FILE:
            "لم يتم إرفاق أي صورة، الرجاء رفع الصورة والمحاولة مرة أخرى.",
        };

        setError(
          data?.code
            ? map[data.code] || data.error || "خطأ في الرفع."
            : data?.error || "خطأ في الرفع."
        );
        setUploading(false);
        return;
      }

      // ✅ لو وصلت هنا يعني الرفع ناجح
      // نخزن حالة التوثيق في المتصفح عشان ما تضيع بعد ما تطلع وترجع
      try {
        if (typeof window !== "undefined") {
          window.localStorage.setItem("monjaz_verify_status", "pending");
        }
      } catch (e) {
        // نتجاهل أي خطأ هنا
      }

      // نرجع لصفحة الحساب ومعنا بارامتر يوضح أن الحالة pending
      router.push("/account?verifyStatus=pending");
    } catch (err) {
      console.error(err);
      setError("فشل الإرسال، حاول لاحقًا.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow mt-10">
      <h2 className="text-xl font-bold mb-4 text-center text-cyan-700">
        رفع صورة الهوية — الوجه الخلفي والسيلفي
      </h2>

      <p className="text-sm text-gray-600 mb-4">
        الصيغ المسموحة: JPG/PNG بحد أقصى 8MB. احرص أن تكون الصورة واضحة،
        والزوايا الأربع للبطاقة ظاهرة، وتاريخ الانتهاء والكود الخلفي مقروءين.
        يفضّل التصوير في إضاءة هادئة بدون فلاش مباشر، واستخدام صورة أصلية
        مباشرة من الكاميرا.
      </p>

      {statusMsg && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-800 rounded">{statusMsg}</div>
      )}

      <form onSubmit={handleSubmit}>
        <label className="block font-semibold mb-2">صورة ظهر الهوية</label>
        <input
          ref={backRef}
          type="file"
          accept="image/jpeg,image/png"
          onChange={(e) =>
            handleFile(e, setBackFile, setBackPreview, 300, 300)
          }
          className="mb-3 border-2 border-black/20 p-2 rounded"
        />
        {backPreview && (
          <img
            src={backPreview}
            alt="back"
            className="w-40 mb-3 rounded border-2 border-black/20"
          />
        )}

        <label className="block font-semibold mb-2">
          سيلفي مع الهوية (أمسك الهوية بيدك واضحة)
        </label>
        <input
          ref={selfieRef}
          type="file"
          accept="image/jpeg,image/png"
          onChange={(e) =>
            handleFile(e, setSelfie, setSelfiePreview, 300, 300)
          }
          className="mb-3 border-2 border-black/20 p-2 rounded"
        />
        <div className="flex gap-2 mb-3">
          <button
            type="button"
            onClick={async () => {
              setError("");
              try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
                mediaSelfieRef.current = stream;
                if (videoSelfieRef.current) videoSelfieRef.current.srcObject = stream;
                setCameraSelfieOpen(true);
              } catch (e) {
                setError("تعذّر الوصول إلى الكاميرا. تأكد من الإذن.");
              }
            }}
            className="px-3 py-2 border rounded bg-white"
          >
            فتح الكاميرا
          </button>
          {cameraSelfieOpen && (
            <>
              <button
                type="button"
                onClick={() => {
                  if (!videoSelfieRef.current) return;
                  const v = videoSelfieRef.current;
                  const w = v.videoWidth || 1280;
                  const h = v.videoHeight || 720;
                  if (canvasSelfieRef.current) {
                    canvasSelfieRef.current.width = w;
                    canvasSelfieRef.current.height = h;
                    const ctx = canvasSelfieRef.current.getContext("2d");
                    if (!ctx) return;
                    ctx.drawImage(v, 0, 0, w, h);
                    canvasSelfieRef.current.toBlob(async (blob) => {
                      if (!blob) return;
                      const f = new File([blob], `selfie-${Date.now()}.jpg`, { type: blob.type });
                      try {
                        await preCheck(f, { minW: 300, minH: 300, maxSize: MAX_SIZE });
                      } catch (err: any) {
                        setError(err?.message || "خطأ في الملف.");
                        return;
                      }
                      setSelfie(f);
                      setSelfiePreview(URL.createObjectURL(f));
                      // stop camera
                      try {
                        mediaSelfieRef.current?.getTracks().forEach((t) => t.stop());
                      } catch (e) {}
                      mediaSelfieRef.current = null;
                      setCameraSelfieOpen(false);
                    }, "image/jpeg", 0.92);
                  }
                }}
                className="px-3 py-2 bg-cyan-600 text-white rounded"
              >
                التقاط
              </button>
              <button
                type="button"
                onClick={() => {
                  try {
                    mediaSelfieRef.current?.getTracks().forEach((t) => t.stop());
                  } catch (e) {}
                  mediaSelfieRef.current = null;
                  setCameraSelfieOpen(false);
                }}
                className="px-3 py-2 border rounded"
              >
                إغلاق
              </button>
            </>
          )}
        </div>
        {cameraSelfieOpen && (
          <div className="mb-3">
            <video ref={videoSelfieRef} autoPlay playsInline className="w-full rounded border-2 border-black/20 mb-2" />
            <canvas ref={canvasSelfieRef} style={{ display: "none" }} />
          </div>
        )}
        {selfiePreview && (
          <img
            src={selfiePreview}
            alt="selfie"
            className="w-40 mb-3 rounded border-2 border-black/20"
          />
        )}

        {error && <div className="text-red-600 mb-3">{error}</div>}

        <div className="text-xs text-gray-500 mb-4">
          لأمانك: تُستخدم هذه الصور للتحقق فقط، ثم تُخفى/تُدار آليًا وفق سياسة
          الخصوصية، ولا تُشارك مع أي طرف خارجي إلا عند وجود التزام نظامي واضح.
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={uploading}
            className="flex-1 py-3 bg-cyan-600 text-white font-bold rounded hover:bg-cyan-700"
          >
            {uploading ? "جاري الإرسال..." : "إرسال واكتمال"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-3 py-3 border rounded"
          >
            العودة
          </button>
        </div>
      </form>
    </div>
  );
}
>>>>>>> cf326c0 (chore: centralize CATALOG, unify category routing to ?sub=, make NAV and homepage read from catalog // ASSISTANT_FINAL: true)
