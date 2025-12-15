"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useCurrentUser from "../../../components/useCurrentUser";
import { CATEGORY_MAP } from '@/lib/categoryData';

export default function NewServicePage() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [category, setCategory] = useState<string>("");
  const [subcategory, setSubcategory] = useState<string>("");
  const [priceFrom, setPriceFrom] = useState<number>(10);
  const [deliveryDays, setDeliveryDays] = useState("1");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [keywords, setKeywords] = useState<string>("");
  const { user: currentUser, loading: loadingUser } = useCurrentUser();
  const [errors, setErrors] = useState<string[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Use canonical CATEGORY_MAP as single source of truth
  const CATEGORIES = Object.values(CATEGORY_MAP).map((c) => ({ id: c.key, name: c.title, subs: c.subcategories }));

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
      try {
      setErrors([]);
      // access control: require seller role
      const isDev = process.env.NODE_ENV !== 'production';
      // allow a dev shortcut: if not a seller locally, emulate one so publish works
      let effectiveUser = currentUser;
      if (!effectiveUser || effectiveUser?.role !== 'seller') {
        if (isDev) {
          try {
            document.cookie = 'dev_user_role=seller; path=/';
            document.cookie = 'dev_user_name=DevSeller; path=/';
            document.cookie = 'dev_user_id=dev-1; path=/';
          } catch (e) {
            // ignore cookie failures
          }
          effectiveUser = { id: 'dev-1', name: 'DevSeller', email: null, role: 'seller', avatar: null } as any;
        } else {
          setErrors(['يجب أن يكون حسابك بائعًا لنشر خدمة.']);
          setLoading(false);
          return;
        }
      }

      // validate required fields
      const nextErrors: string[] = [];
  if (!title || title.trim().length < 3) nextErrors.push('أدخل عنوانًا صحيحًا للخدمة.');
      if (!description || description.trim().length < 10) nextErrors.push('أدخل وصفًا مختصرًا لا يقل عن 10 أحرف.');
      if (!images || images.length === 0) nextErrors.push('أضف صورة واحدة على الأقل للخدمة.');
  if (!category) nextErrors.push('اختر تصنيفًا رئيسيًا للخدمة.');
      if (!priceFrom || Number(priceFrom) < 10) nextErrors.push('الحد الأدنى للسعر 10 ريال.');
      if (Number(deliveryDays) < 1) nextErrors.push('مدة التسليم يجب أن تكون يوم واحد على الأقل.');
      if (nextErrors.length) {
        setErrors(nextErrors);
        setLoading(false);
        return;
      }

      // prepare images as base64
      const imgs: any[] = [];
      for (const f of images) {
        const data = await fileToBase64(f);
        imgs.push({ filename: f.name, data });
      }

    const sellerName = effectiveUser?.name || effectiveUser?.email || 'بائع تجريبي';
  const parsedKeywords = (keywords || '').split(',').map(k => k.trim()).filter(Boolean);
  const payloadObj = { title, subtitle, category, subcategory, priceFrom: Number(priceFrom), deliveryDays, description, images: imgs, keywords: parsedKeywords, seller: sellerName };
      const payloadStr = JSON.stringify(payloadObj);

      // send using XHR so we can report upload progress
      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/api/seller/services');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.upload.onprogress = (ev) => {
          if (ev.lengthComputable) {
            const percent = Math.round((ev.loaded / ev.total) * 100);
            setUploadProgress(percent);
          }
        };
        xhr.onload = () => {
          try {
            const json = JSON.parse(xhr.responseText || '{}');
            if (xhr.status >= 200 && xhr.status < 300 && json?.ok) {
              resolve();
            } else {
              reject(new Error(json?.error || 'فشل إنشاء الخدمة'));
            }
          } catch (e) {
            reject(e);
          }
        };
        xhr.onerror = () => reject(new Error('Network error'));
        xhr.send(payloadStr);
      });
      setUploadProgress(100);
      router.push('/seller/services?created=1');
    } catch (err) {
      setErrors(['خطأ في الشبكة، حاول لاحقًا.']);
    } finally {
      setLoading(false);
    }
  }

  function fileToBase64(file: File) {
    return new Promise<string>((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => resolve(String(r.result));
      r.onerror = reject;
      r.readAsDataURL(file);
    });
  }

  // handle previews when files change
  useEffect(() => {
    // revoke previous object URLs on unmount
    return () => {
      previews.forEach((p) => URL.revokeObjectURL(p));
    };
  }, []);

  function handleFilesChange(files: File[]) {
    // simple limits: max 5 images
    const limited = files.slice(0, 5);
    setImages(limited);
    // create previews
    const urls = limited.map((f) => URL.createObjectURL(f));
    // revoke any old previews
    previews.forEach((p) => URL.revokeObjectURL(p));
    setPreviews(urls);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const dt = e.dataTransfer;
    if (!dt) return;
    const files = Array.from(dt.files).filter((f) => f.type.startsWith('image/'));
    if (files.length) handleFilesChange(files);
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  function removeImage(index: number) {
    const newImgs = images.slice();
    const newPreviews = previews.slice();
    // revoke the object URL
    const p = newPreviews[index];
    if (p) URL.revokeObjectURL(p);
    newImgs.splice(index, 1);
    newPreviews.splice(index, 1);
    setImages(newImgs);
    setPreviews(newPreviews);
  }

  return (
    <main className="p-6 min-h-screen bg-white">
      <div className="max-w-3xl mx-auto">
        {/* kept intentionally empty: removed brand strip per user request */}
        <h1 className="text-2xl font-bold mb-4">أضف خدمة جديدة</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">عنوان الخدمة</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm mb-1">جملة مختصرة (subtitle)</label>
            <input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm mb-1">وصف الخدمة</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border rounded px-3 py-2 h-32" />
          </div>

          <div>
            <label className="block text-sm mb-1">الكلمات المفتاحية</label>
            <input
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="مثال: تصميم شعار, هوية، لوجو"
              className="w-full border rounded px-3 py-2"
            />
            <p className="text-xs text-slate-500 mt-1">نصيحة: ضع 3-5 كلمات قصيرة مفصولة بفاصلة لزيادة فرص ظهور خدمتك في نتائج البحث.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm mb-1">يبدأ من (ريال)</label>
                <input
                  type="number"
                  value={priceFrom}
                  min={10}
                  step={1}
                  onChange={(e) => setPriceFrom(Number(e.target.value))}
                  className="w-full border rounded px-3 py-2"
                  placeholder="10"
                />
            </div>
            <div>
              <label className="block text-sm mb-1">مدة التسليم (أيام)</label>
              <select value={deliveryDays} onChange={(e) => setDeliveryDays(e.target.value)} className="appearance-none w-full border rounded px-3 py-2">
                <option value="1">1 يوم</option>
                <option value="2">2 يوم</option>
                <option value="3">3 يوم</option>
                <option value="5">5 يوم</option>
                <option value="7">7 يوم</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">التصنيف الرئيسي</label>
              <div className="relative">
                <select value={category} onChange={(e) => { setCategory(e.target.value); setSubcategory(''); }} className="appearance-none w-full border rounded px-3 py-2 pl-10">
                  <option value="">اختر التصنيف</option>
                  {Object.values(CATEGORY_MAP).map((c) => (
                    <option key={c.key} value={c.key}>{c.title}</option>
                  ))}
                </select>
                {/* Arrow for RTL: placed on the left so it doesn't overlap text */}
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M8 9l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            <div>
              <label className="block text-sm mb-1">التصنيف الفرعي</label>
              <div className="relative">
                <select value={subcategory} onChange={(e) => setSubcategory(e.target.value)} className="appearance-none w-full border rounded px-3 py-2 pl-10">
                  <option value="">اختر التصنيف الفرعي</option>
                  {(CATEGORY_MAP[category]?.subcategories || []).map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M8 9l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">صور الخدمة (مطلوبة)</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleFilesChange(Array.from(e.target.files || []))}
            />
            <p className="text-xs text-slate-500 mt-1">يفضل إضافة صورة رئيسية واحدة على الأقل لزيادة فرص الظهور.</p>

            {previews.length > 0 && (
              <div className="mt-3 flex gap-3">
                {previews.map((p, idx) => (
                  <div key={p} className="w-24 h-24 rounded overflow-hidden border">
                    <img src={p} alt={`preview-${idx}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {errors.length > 0 && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded">
              <ul className="list-disc list-inside">
                {errors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex justify-end">
            <button type="submit" disabled={loading} className="px-4 py-2 bg-cyan-600 text-white rounded">{loading ? 'جاري الحفظ...' : 'نشر الخدمة'}</button>
          </div>
        </form>
      </div>
    </main>
  );
}
