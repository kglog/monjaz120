'use client';
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SelfiePage() {
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
      setError("يرجى رفع صورة سيلفي واضحة.");
      return;
    }
    // هنا ترفع الصورة للسيرفر (لو فيه API)
    // بعد نجاح الرفع تنتقل للصفحة الرئيسية أو صفحة التأكيد
    router.push("/account/verify");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow mt-10">
      <h2 className="text-xl font-bold mb-6 text-center text-cyan-700">
        رفع صورة شخصية (سيلفي)
      </h2>
      <div className="mb-5 p-4 bg-gray-50 border border-gray-200 rounded text-sm">
        <b>يرجى رفع صورة سيلفي واضحة لوجهك.</b><br/>
        يجب أن تظهر ملامح الوجه بوضوح.<br/>
        لا تقم بتغطية أو تعديل أي جزء من الصورة.<br/>
        أي صورة غير واضحة أو معدلة سيتم رفضها تلقائيًا.<br/>
        <hr className="my-2" />
        <b>Please upload a clear selfie of your face.</b><br/>
        All facial features must be clearly visible.<br/>
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
