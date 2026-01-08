"use client";

import { useEffect, useState } from "react";

export default function EditAccountPage() {
<<<<<<< HEAD
=======
<<<<<<< HEAD
  const [user, setUser] = useState<{ name: string; email: string; job?: string; bio?: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) return <div className="text-center py-10">جارٍ تحميل البيانات...</div>;

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">
        تعديل الملف الشخصي
      </h1>

      <form className="space-y-6">
=======
>>>>>>> 00718cd219b2fc648988ef78590cdd3567cd44d0
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
<<<<<<< HEAD
=======
      // هنا نحدّث localStorage فورياً (بدون backend) ليظهر التغيير مباشرة
>>>>>>> 00718cd219b2fc648988ef78590cdd3567cd44d0
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

<<<<<<< HEAD
=======
      // توجيه للصفحة الشخصية بعد حفظ
>>>>>>> 00718cd219b2fc648988ef78590cdd3567cd44d0
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

<<<<<<< HEAD
=======
  // enable seller role (dev-only) from edit page
  // Toggle role between buyer <-> seller (dev-only endpoint)
  async function toggleRole() {
    try {
      const currentRole = storedUser?.role || 'buyer';
      const targetRole = currentRole === 'seller' ? 'buyer' : 'seller';

      // Optional confirm when downgrading from seller to buyer
      if (currentRole === 'seller') {
        const ok = confirm('هل أنت متأكد أنك تريد التحويل إلى مشتري؟ بذلك ستختفي صلاحيات البائع (إضافة خدمات وإدارة الطلبات).');
        if (!ok) return;
      }

      const res = await fetch('/api/account/role', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ role: targetRole, id: storedUser.id || 'dev-user', name: storedUser.username || storedUser.name || 'مستخدم' }),
      });
      const json = await res.json();
      if (json.ok) {
        // update localStorage and local state so UI reflects new role immediately
        const updated = { ...storedUser, role: targetRole } as any;
        localStorage.setItem('user', JSON.stringify(updated));
        setStoredUser(updated);

        // redirect: if became seller go to dashboard, otherwise back to account
        if (targetRole === 'seller') {
          window.location.href = '/seller/dashboard';
        } else {
          // simple feedback and stay on account edit or go back to /account
          setMessage('تم التحويل إلى مشتري');
          setTimeout(() => (window.location.href = '/account'), 800);
        }
      } else {
        alert('فشل تغيير الدور: ' + (json.error || 'خطأ'));
      }
    } catch (err) {
      console.error(err);
      alert('خطأ في الشبكة');
    }
  }

>>>>>>> 00718cd219b2fc648988ef78590cdd3567cd44d0
  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">تعديل الملف الشخصي</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
<<<<<<< HEAD
=======
>>>>>>> cf326c0 (chore: centralize CATALOG, unify category routing to ?sub=, make NAV and homepage read from catalog // ASSISTANT_FINAL: true)
>>>>>>> 00718cd219b2fc648988ef78590cdd3567cd44d0
        {/* الاسم */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">الاسم</label>
          <input
            type="text"
<<<<<<< HEAD
            value={name}
            onChange={(e) => setName(e.target.value)}
=======
<<<<<<< HEAD
            defaultValue={user.name}
=======
            value={name}
            onChange={(e) => setName(e.target.value)}
>>>>>>> cf326c0 (chore: centralize CATALOG, unify category routing to ?sub=, make NAV and homepage read from catalog // ASSISTANT_FINAL: true)
>>>>>>> 00718cd219b2fc648988ef78590cdd3567cd44d0
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
          />
        </div>

        {/* البريد */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">البريد الإلكتروني</label>
          <input
            type="email"
<<<<<<< HEAD
            value={email}
            onChange={(e) => setEmail(e.target.value)}
=======
<<<<<<< HEAD
            defaultValue={user.email}
=======
            value={email}
            onChange={(e) => setEmail(e.target.value)}
>>>>>>> cf326c0 (chore: centralize CATALOG, unify category routing to ?sub=, make NAV and homepage read from catalog // ASSISTANT_FINAL: true)
>>>>>>> 00718cd219b2fc648988ef78590cdd3567cd44d0
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
          />
        </div>

        {/* المسمى الوظيفي */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">المسمى الوظيفي</label>
          <input
            type="text"
<<<<<<< HEAD
            value={job}
            onChange={(e) => setJob(e.target.value)}
=======
<<<<<<< HEAD
            defaultValue={user.job || ""}
=======
            value={job}
            onChange={(e) => setJob(e.target.value)}
>>>>>>> cf326c0 (chore: centralize CATALOG, unify category routing to ?sub=, make NAV and homepage read from catalog // ASSISTANT_FINAL: true)
>>>>>>> 00718cd219b2fc648988ef78590cdd3567cd44d0
            placeholder="مثال: مترجم، مصمم، مطور..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
          />
        </div>

        {/* النبذة */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">النبذة التعريفية</label>
          <textarea
<<<<<<< HEAD
            value={bio}
            onChange={(e) => setBio(e.target.value)}
=======
<<<<<<< HEAD
            defaultValue={user.bio || ""}
=======
            value={bio}
            onChange={(e) => setBio(e.target.value)}
>>>>>>> cf326c0 (chore: centralize CATALOG, unify category routing to ?sub=, make NAV and homepage read from catalog // ASSISTANT_FINAL: true)
>>>>>>> 00718cd219b2fc648988ef78590cdd3567cd44d0
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
<<<<<<< HEAD
=======
<<<<<<< HEAD
            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none"
          />
        </div>

=======
>>>>>>> 00718cd219b2fc648988ef78590cdd3567cd44d0
            onChange={handleFile}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none"
          />
          {avatarPreview && (
            <img src={avatarPreview} alt="preview" className="mt-3 w-24 h-24 rounded-full object-cover shadow" />
          )}
        </div>

        {message && <div className="text-center text-sm text-green-600">{message}</div>}

<<<<<<< HEAD
=======
>>>>>>> cf326c0 (chore: centralize CATALOG, unify category routing to ?sub=, make NAV and homepage read from catalog // ASSISTANT_FINAL: true)
>>>>>>> 00718cd219b2fc648988ef78590cdd3567cd44d0
        {/* الأزرار */}
        <div className="flex justify-between mt-6">
          <button
            type="submit"
<<<<<<< HEAD
=======
<<<<<<< HEAD
            className="bg-cyan-600 text-white px-6 py-2 rounded-lg hover:bg-cyan-700 transition"
          >
            حفظ التعديلات
=======
>>>>>>> 00718cd219b2fc648988ef78590cdd3567cd44d0
            disabled={loading}
            className="bg-cyan-600 text-white px-6 py-2 rounded-lg hover:bg-cyan-700 transition"
          >
            {loading ? 'جاري الحفظ...' : 'حفظ التعديلات'}
<<<<<<< HEAD
=======
>>>>>>> cf326c0 (chore: centralize CATALOG, unify category routing to ?sub=, make NAV and homepage read from catalog // ASSISTANT_FINAL: true)
>>>>>>> 00718cd219b2fc648988ef78590cdd3567cd44d0
          </button>
          <a
            href="/account"
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            إلغاء
          </a>
        </div>
      </form>
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======

      {/* Section: role switch (dev-only) */}
      <div className="mt-8 border-t pt-6">
        <h2 className="text-lg font-semibold">صلاحية الحساب</h2>
        <p className="text-sm text-slate-600 mt-2">الحالة الحالية: <strong className="mx-2">{storedUser?.role || 'buyer'}</strong></p>
        <p className="text-sm text-slate-600 mt-2">يمكنك تعديل صلاحية حسابك هنا — هذا العمل يعمل في بيئة التطوير فقط.</p>
        <div className="mt-3">
          <button onClick={toggleRole} className="px-4 py-2 bg-cyan-600 text-white rounded">
            {storedUser?.role === 'seller' ? 'التحويل إلى مشتري' : 'تفعيل حساب كبائع'}
          </button>
        </div>
      </div>
>>>>>>> cf326c0 (chore: centralize CATALOG, unify category routing to ?sub=, make NAV and homepage read from catalog // ASSISTANT_FINAL: true)
>>>>>>> 00718cd219b2fc648988ef78590cdd3567cd44d0
    </main>
  );
}
