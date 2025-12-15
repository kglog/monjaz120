"use client";
<<<<<<< HEAD
=======

>>>>>>> cf326c0 (chore: centralize CATALOG, unify category routing to ?sub=, make NAV and homepage read from catalog // ASSISTANT_FINAL: true)
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { preCheck } from "./client-guard";

const MAX_SIZE = 8 * 1024 * 1024; // 8MB
const ATTEMPT_KEY = "verify.attempts";

function getAttempts() {
  try {
    const raw = localStorage.getItem(ATTEMPT_KEY);
    if (!raw) return { date: new Date().toDateString(), count: 0 };
    return JSON.parse(raw);
  } catch {
    return { date: new Date().toDateString(), count: 0 };
  }
}

function incAttempt() {
  const now = new Date().toDateString();
  const cur = getAttempts();
  if (cur.date !== now) {
    localStorage.setItem(ATTEMPT_KEY, JSON.stringify({ date: now, count: 1 }));
  } else {
    localStorage.setItem(ATTEMPT_KEY, JSON.stringify({ date: now, count: cur.count + 1 }));
  }
}

export default function IdFrontPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    (async () => {
      setError("");
      const selectedFile = e.target.files?.[0] || null;
      if (!selectedFile) {
        setFile(null);
        setPreview(null);
        return;
      }

      try {
        await preCheck(selectedFile);
      } catch (err: any) {
        setError(err?.message || "خطأ في الملف.");
        setFile(null);
        setPreview(null);
        return;
      }

      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    })();
  };

  async function openCamera() {
    setError("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      mediaStreamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
      setCameraOpen(true);
    } catch (err: any) {
      setError("تعذّر الوصول إلى الكاميرا. تأكد من إعطاء الإذن.");
    }
  }

  function closeCamera() {
    setCameraOpen(false);
    try {
      mediaStreamRef.current?.getTracks().forEach((t) => t.stop());
    } catch (e) {}
    mediaStreamRef.current = null;
  }

  async function captureFromCamera() {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const w = video.videoWidth || 1280;
    const h = video.videoHeight || 720;
    if (canvasRef.current) {
      canvasRef.current.width = w;
      canvasRef.current.height = h;
      const ctx = canvasRef.current.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(video, 0, 0, w, h);
      canvasRef.current.toBlob(async (blob) => {
        if (!blob) return;
        const f = new File([blob], `capture-${Date.now()}.jpg`, { type: blob.type });
        try {
          await preCheck(f);
        } catch (err: any) {
          setError(err?.message || "خطأ في الملف.");
          return;
        }
        setFile(f);
        setPreview(URL.createObjectURL(f));
        closeCamera();
      }, "image/jpeg", 0.92);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const attempts = getAttempts();
    if (attempts.date === new Date().toDateString() && attempts.count >= 5) {
      setError("تجاوزت حد محاولات الرفع اليوم. حاول لاحقًا أو تواصل الدعم.");
      return;
    }

    if (!file) {
      setError("يرجى رفع صورة وجه الهوية الأمامية.");
      return;
    }
<<<<<<< HEAD
    // هنا ترفع الصورة للسيرفر (لو فيه API)
    // بعد نجاح الرفع تنتقل للخطوة التالية
    router.push("/account/verify/id-back");
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow mt-10">
      <h2 className="text-xl font-bold mb-6 text-center text-cyan-700">
        رفع صورة الهوية (وجه أمامي)
      </h2>
      <div className="mb-5 p-4 bg-gray-50 border border-gray-200 rounded text-sm">
        <b>يرجى رفع صورة واضحة للوجه الأمامي للهوية.</b><br/>
        يجب أن تظهر كل البيانات والأرقام بوضوح، الحواف سوداء وحادة.<br/>
        لا تقم بتغطية أو تعديل أي جزء من الصورة.<br/>
        أي صورة غير واضحة أو معدلة سيتم رفضها تلقائيًا.<br/>
        <hr className="my-2" />
        <b>Please upload a clear image of your ID front side.</b><br/>
        All details and numbers must be visible, edges black and sharp.<br/>
        Do not cover or edit any part of the image.<br/>
        Any unclear or edited images will be rejected automatically.<br/>
      </div>
=======

    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", file as Blob);

      const res = await fetch("/api/account/verify/id-front", {
        method: "POST",
        body: form,
      });

      const codeMap: Record<string,string> = {
        TYPE: "يُقبل JPG/PNG فقط.",
        SIZE: "الحجم الأقصى 8MB.",
        SMALL: "الصورة صغيرة. التقط صورة أعلى جودة (≥ 900×600).",
        BLUR: "الصورة غير واضحة. أعد الالتقاط بإضاءة أفضل وثبات أعلى.",
        GLARE: "فيه وهج/انعكاس قوي. أعد الالتقاط بزاوية أفضل.",
        NID_OCR_FAIL: "تعذّر قراءة رقم الهوية من الصورة.",
        PPT_OCR_FAIL: "تعذّر قراءة رقم الجواز. تأكد من الوضوح."
      };

      if (res.status === 429) {
        setError("تجاوزت حد محاولات الرفع اليوم. حاول لاحقًا أو تواصل الدعم.");
        setUploading(false);
        return;
      }

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg = data?.code ? (codeMap[data.code] || data.error || "خطأ في الرفع.") : (data?.error || "خطأ في الرفع.");
        setError(msg);
        setUploading(false);
        return;
      }

      incAttempt();
      router.push("/account/verify/id-back");
    } catch (err: any) {
      console.error(err);
      setError("فشل في رفع الصورة. حاول مرة أخرى.");
    } finally {
      setUploading(false);
    }
  };

  return (
  <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow mt-10 border-2 border-black/20">
      <h2 className="text-xl font-bold mb-4 text-center text-cyan-700">رفع صورة الهوية — الوجه الأمامي</h2>

      <p className="text-sm text-gray-600 mb-4">اتبع التعليمات التالية لتسريع المراجعة:</p>
      <ul className="list-disc list-inside text-sm text-gray-600 mb-4">
        <li>الصيغ المسموحة: JPG/PNG فقط — بحد أقصى 8MB.</li>
        <li>الجودة: صورة واضحة بلا ضباب/اهتزاز أو وهج، كاملة من الزوايا الأربع.</li>
        <li>الالتقاط: خلفية سادة، ضوء طبيعي، لا فلاتر ولا قص شديد.</li>
        <li>الخصوصية: نستخدم الصورة للتحقق فقط، ثم تُحجب/تُطمس تلقائيًا بعد اكتمال التحقق.</li>
        <li className="text-red-600">تحذير: صور مموّهة أو مقصوصة/معدّلة يتم رفضها فورًا.</li>
      </ul>

>>>>>>> cf326c0 (chore: centralize CATALOG, unify category routing to ?sub=, make NAV and homepage read from catalog // ASSISTANT_FINAL: true)
      <form onSubmit={handleSubmit}>
        <label className="block font-semibold mb-2">اختر صورة الوجه الأمامي</label>
  <div className="flex gap-2 mb-2">
    <input ref={inputRef} type="file" accept="image/jpeg,image/png" onChange={handleFileChange} className="flex-1 border-2 border-black/20 p-2 rounded" />
    <button type="button" onClick={openCamera} className="px-3 py-2 border rounded bg-white">فتح الكاميرا</button>
  </div>

  {cameraOpen && (
    <div className="mb-3">
      <div className="mb-2">
        <video ref={videoRef} autoPlay playsInline className="w-full rounded border-2 border-black/20" />
      </div>
      <div className="flex gap-2">
        <button type="button" onClick={captureFromCamera} className="px-3 py-2 bg-cyan-600 text-white rounded">التقاط</button>
        <button type="button" onClick={closeCamera} className="px-3 py-2 border rounded">إغلاق</button>
      </div>
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  )}

        {preview && (
          <div className="mb-3">
            <div className="text-xs text-gray-500 mb-1">معاينة:</div>
            <img src={preview} alt="preview" className="w-40 h-auto rounded border-2 border-black/20" />
          </div>
        )}

        {error && <div className="text-red-600 mb-3">{error}</div>}

        <div className="text-xs text-gray-500 mb-4">لأمانك: تُستخدم الصور فقط للتحقق وستُحذف بعد إتمام الغرض وفق سياسة الاحتفاظ.</div>

        <button type="submit" disabled={uploading} className="w-full py-3 bg-cyan-600 text-white font-bold rounded hover:bg-cyan-700">
          {uploading ? "جاري الرفع..." : "حفظ ومتابعة"}
        </button>
      </form>
    </div>
  );
}