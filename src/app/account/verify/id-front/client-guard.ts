export async function preCheck(file: File, opts?: { minW?: number; minH?: number }) {
  const MIN_W = opts?.minW ?? 900;
  const MIN_H = opts?.minH ?? 600;
  const okType = ["image/jpeg", "image/png"].includes(file.type);
  const okSize = file.size <= 8 * 1024 * 1024;
  if (!okType) throw new Error("يُقبل JPG/PNG فقط.");
  if (!okSize) throw new Error("الحجم الأقصى 8MB.");

  // check dimensions by loading image
  const url = URL.createObjectURL(file);
  try {
    await new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const okDim = img.naturalWidth >= MIN_W && img.naturalHeight >= MIN_H;
        URL.revokeObjectURL(url);
        if (!okDim) return reject(new Error(`الصورة صغيرة. التقط صورة أعلى جودة (≥ ${MIN_W}×${MIN_H}).`));
        resolve();
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error("فشل في قراءة الصورة. حاول ملفًا آخر."));
      };
      img.src = url;
    });
  } finally {
    try { URL.revokeObjectURL(url); } catch (e) {}
  }
}

export default preCheck;

// ASSISTANT_FINAL: true
