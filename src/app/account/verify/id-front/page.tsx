"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function IdFrontPage() {
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
      setError("يرجى رفع صورة وجه الهوية الأمامية.");
      return;
    }
    // هنا ترفع الصورة للسيرفر (لو فيه API)
    // بعد نجاح الرفع تنتقل للخطوة التالية
    router.push("/account/verify/id-back");
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow mt-10 border !border-black border-[1px]">
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