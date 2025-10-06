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
      setError("يرجى رفع صورة السيلفي.");
      return;
    }
    // هنا ترفع الصورة للسيرفر (لو فيه API)
    // بعد نجاح الرفع تنتقل لصفحة الحالة
    router.push("/account/verify/status");
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow mt-10 border !border-black border-[1px]">
      <h2 className="text-xl font-bold mb-6 text-center text-cyan-700">
        رفع صورة سيلفي
      </h2>
      <div className="mb-5 p-4 bg-gray-50 border border-gray-200 rounded text-sm">
        <b>يرجى رفع صورة سيلفي واضحة.</b><br/>
        يجب أن يكون وجهك واضحاً ومعالمك ظاهرة بشكل كامل.<br/>
        تأكد من أن الإضاءة جيدة والصورة حادة وواضحة.<br/>
        لا تستخدم فلاتر أو تعديلات على الصورة.<br/>
        أي صورة غير واضحة أو معدلة سيتم رفضها تلقائيًا.<br/>
        <hr className="my-2" />
        <b>Please upload a clear selfie photo.</b><br/>
        Your face must be clearly visible with all features shown.<br/>
        Make sure the lighting is good and the image is sharp and clear.<br/>
        Do not use filters or edits on the photo.<br/>
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
