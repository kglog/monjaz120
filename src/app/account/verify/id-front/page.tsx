use client;

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
    <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow mt-10">
      <h2 className="text-xl font-bold mb-6 text-center text-cyan-700">
        رفع صورة الهوية (وجه أمامي)
      </h2>
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