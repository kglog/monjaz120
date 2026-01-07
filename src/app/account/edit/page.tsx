"use client";

import { useEffect, useState } from "react";

export default function EditAccountPage() {
  const [storedUser, setStoredUser] = useState<any>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [job, setJob] = useState("");
  const [bio, setBio] = useState("");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const s = localStorage.getItem("user");
    if (s) {
      const u = JSON.parse(s);
      setStoredUser(u);
      setName(u.username || u.name || "");
      setEmail(u.email || "");
      setJob(u.job || u.title || "");
      setBio(u.bio || "");
      setAvatarPreview(u.avatar || null);
    }
  }, []);

  if (!storedUser) return <div className="text-center py-10">جارٍ تحميل البيانات...</div>;

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setAvatarPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const updated = {
        ...storedUser,
        username: name,
        email,
        job,
        bio,
      } as any;
      if (avatarPreview) updated.avatar = avatarPreview;

      localStorage.setItem("user", JSON.stringify(updated));
      setMessage("تم حفظ التعديلات");

      setTimeout(() => {
        window.location.href = "/account";
      }, 800);
    } catch (err) {
      console.error(err);
      setMessage("فشل حفظ التعديلات");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">تعديل الملف الشخصي</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* الاسم */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">الاسم</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
          />
        </div>

        {/* البريد */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">البريد الإلكتروني</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
          />
        </div>

        {/* المسمى الوظيفي */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">المسمى الوظيفي</label>
          <input
            type="text"
            value={job}
            onChange={(e) => setJob(e.target.value)}
            placeholder="مثال: مترجم، مصمم، مطور..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
          />
        </div>

        {/* النبذة */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">النبذة التعريفية</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            placeholder="اكتب نبذة مختصرة عن نفسك..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
          />
        </div>

        {/* صورة الحساب */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">صورة الحساب</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none"
          />
          {avatarPreview && (
            <img src={avatarPreview} alt="preview" className="mt-3 w-24 h-24 rounded-full object-cover shadow" />
          )}
        </div>

        {message && <div className="text-center text-sm text-green-600">{message}</div>}

        {/* الأزرار */}
        <div className="flex justify-between mt-6">
          <button
            type="submit"
            disabled={loading}
            className="bg-cyan-600 text-white px-6 py-2 rounded-lg hover:bg-cyan-700 transition"
          >
            {loading ? 'جاري الحفظ...' : 'حفظ التعديلات'}
          </button>
          <a
            href="/account"
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            إلغاء
          </a>
        </div>
      </form>
    </main>
  );
}
