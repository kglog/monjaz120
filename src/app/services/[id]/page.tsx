"use client";
import { useParams } from "next/navigation";

<<<<<<< HEAD
const services = [
  {
    id: "1",
    title: "تصميم شعار احترافي",
    description: "خدمة تصميم شعار مميز يعكس هوية مشروعك.",
    price: 50,
    rating: 4.9,
    seller: "أحمد الزهراني",
  },
  {
    id: "2",
    title: "تحليل بيانات باستخدام الذكاء الاصطناعي",
    description: "استخدام أدوات الذكاء الاصطناعي لاستخراج أنماط وتقارير من بياناتك.",
    price: 100,
    rating: 4.8,
    seller: "نورة العبدالله",
  },
];

export default function ServiceDetails() {
  const params = useParams();
  const service = services.find((s) => s.id === params?.id);

  if (!service) return <p className="p-6">الخدمة غير موجودة</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-2">{service.title}</h1>
      <p className="text-gray-600 mb-4">{service.description}</p>
      <p className="text-lg font-semibold text-green-600">السعر: {service.price} ريال</p>
      <p className="text-yellow-600">التقييم: ⭐ {service.rating}</p>
      <p className="text-gray-700 mt-2">البائع: {service.seller}</p>

      <button className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded">
        اطلب الخدمة الآن
=======
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import brain from "@/core/brain-safe";

// نوع الخدمة
type Service = {
  id: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  seller: string;
  category?: string;
};

// نصوص ثنائية اللغة (خفيفة وسليمة)
const t = (lang: "ar" | "en") => ({
  notFound: lang === "ar" ? "الخدمة غير موجودة" : "Service not found",
  backHome: lang === "ar" ? "⟵ رجوع للرئيسية" : "⟵ Back to Home",
  price: lang === "ar" ? "السعر" : "Price",
  rating: lang === "ar" ? "التقييم" : "Rating",
  seller: lang === "ar" ? "البائع" : "Seller",
  orderNow: lang === "ar" ? "اطلب الخدمة الآن" : "Order Now",
  willGoCheckout:
    lang === "ar" ? "لاحقًا سننتقل لخطوة الدفع/الطلب 👌" : "Next we’ll go to checkout 👌",
  offerTitle: lang === "ar" ? "عرض خاص لك" : "Special offer for you",
  offerBody:
    lang === "ar"
      ? "خصم 10% صالح لمدة قصيرة لأنك رجعت لنفس الخدمة."
      : "Get 10% off for a short time since you returned to this service.",
  claim: lang === "ar" ? "احصل على العرض" : "Claim Offer",
});

function getLang(): "ar" | "en" {
  try {
    const n =
      typeof navigator !== "undefined" ? navigator.language.toLowerCase() : "ar";
    return n.startsWith("ar") ? "ar" : "en";
  } catch {
    return "ar";
  }
}

// ASSISTANT_FINAL: true

// بصمة خفيفة للاستخدام التحفيزي لاحقًا (ليست حماية أمنية فعلية)
function ensureSoftFingerprint() {
  try {
    if (typeof localStorage === "undefined") return;
    if (!localStorage.getItem("mf_fp")) {
      const fp = `${Date.now().toString(36)}-${Math.random()
        .toString(36)
        .slice(2, 9)}`;
      localStorage.setItem("mf_fp", fp);
    }
  } catch {}
}

export default function ServiceDetails() {
  const { id } = useParams<{ id: string }>();
  const lang = getLang();
  const i18n = useMemo(() => t(lang), [lang]);

  // حالة الجلب من API بدل المصفوفة الثابتة
  const [data, setData] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  // عرض تحفيزي
  const [showOffer, setShowOffer] = useState(false);
  const [offerEndsAt, setOfferEndsAt] = useState<number | null>(null);
  const [now, setNow] = useState(Date.now());

  // جلب بيانات الخدمة + تسجيل + بصمة
  useEffect(() => {
    ensureSoftFingerprint();

    let stop = false;
    (async () => {
      try {
        brain.logEvent("open_service", { id });
        brain.logEvent("visit", { path: `/services/${id}` });

        const res = await fetch(`/api/services/${id}`, { cache: "no-store" });
        if (!res.ok) throw new Error("not found");
        const json: Service = await res.json();
        if (!stop) setData(json);

        // منطق العرض التحفيزي بناء على الرجوع لنفس الخدمة
        if (typeof localStorage !== "undefined") {
          const visitKey = `svc_visit_${id}`;
          const orderedKey = `svc_ordered_${id}`;
          const offerKey = `svc_offer_${id}`;

          const hasOrdered = localStorage.getItem(orderedKey) === "1";
          const visitedBefore = localStorage.getItem(visitKey) === "1";
          const existingOffer = localStorage.getItem(offerKey);

          if (!hasOrdered) {
            if (existingOffer) {
              const ends = Number(existingOffer);
              if (ends > Date.now()) {
                setShowOffer(true);
                setOfferEndsAt(ends);
              }
            } else if (visitedBefore) {
              const ends = Date.now() + 10 * 60 * 1000; // 10 دقائق
              localStorage.setItem(offerKey, String(ends));
              setShowOffer(true);
              setOfferEndsAt(ends);
              brain.logEvent("promo_offer_issued", { id, ends });
            } else {
              localStorage.setItem(visitKey, "1");
            }
          }
        }
      } catch {
        if (!stop) setData(null);
      } finally {
        if (!stop) setLoading(false);
      }
    })();

    return () => {
      stop = true;
    };
  }, [id]);

  // عدّاد زمني للعرض
  useEffect(() => {
    if (!showOffer || !offerEndsAt) return;
    const i = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(i);
  }, [showOffer, offerEndsAt]);

  const remainingSec = offerEndsAt
    ? Math.max(0, Math.floor((offerEndsAt - now) / 1000))
    : 0;
  useEffect(() => {
    if (remainingSec === 0 && showOffer) setShowOffer(false);
  }, [remainingSec, showOffer]);

  if (loading) {
    return <main className="max-w-3xl mx-auto p-6">جارِ التحميل…</main>;
  }

  if (!data) {
    return (
      <main className="max-w-3xl mx-auto p-6">
        <p className="rounded-lg border bg-white p-6 shadow">{i18n.notFound}</p>
        <a
          href="/"
          className="inline-block mt-6 px-4 py-2 border-2 border-black rounded-xl font-semibold"
          onClick={() => {
            try {
              brain.logEvent("action", {
                action: "back_to_home_from_service",
                service_id: id,
              });
            } catch {}
          }}
        >
          {i18n.backHome}
        </a>
      </main>
    );
  }

  const priceWithOffer = showOffer ? Math.round(data.price * 90) / 100 : data.price;

  return (
    <main className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow">
      {/* شريط عرض تحفيزي ذكي (إن وُجد) */}
      {showOffer && (
        <div className="mb-4 rounded-xl border-2 border-black p-4 bg-[#fff9db]">
          <div className="font-bold">{i18n.offerTitle}</div>
          <div className="text-sm mt-1">{i18n.offerBody}</div>
          <div className="mt-2 text-sm">
            ⏳ {lang === "ar" ? "ينتهي خلال" : "Ends in"}:{" "}
            <span className="font-semibold">
              {Math.floor(remainingSec / 60)}:
              {String(remainingSec % 60).padStart(2, "0")}
            </span>
          </div>
          <button
            className="mt-3 rounded-xl border-2 border-black px-4 py-2 font-semibold hover:bg-gray-100"
            onClick={() => {
              try {
                brain.logEvent("action", { action: "claim_offer", service_id: id });
              } catch {}
            }}
          >
            {i18n.claim}
          </button>
        </div>
      )}

      <h1 className="text-2xl font-bold mb-2">{data.title}</h1>
      <p className="text-gray-600 mb-4">{data.description}</p>

      <p className="text-lg font-semibold text-green-700">
        {i18n.price}: {priceWithOffer} {lang === "ar" ? "ريال" : "SAR"}
        {showOffer && (
          <span className="ml-2 line-through text-gray-400">{data.price}</span>
        )}
      </p>

      <p className="text-yellow-700">
        {i18n.rating}: ⭐ {data.rating}
      </p>
      <p className="text-gray-700 mt-2">
        {i18n.seller}: {data.seller}
      </p>

      <button
        className="mt-6 rounded-xl border-2 border-black px-5 py-2 font-semibold hover:bg-gray-100"
        onClick={() => {
          try {
            brain.logEvent("action", {
              action: "start_checkout",
              service_id: id,
              price: priceWithOffer,
              hasOffer: showOffer,
            });
            if (typeof localStorage !== "undefined")
              localStorage.setItem(`svc_ordered_${id}`, "1");
          } catch {}
          alert(i18n.willGoCheckout);
        }}
      >
        {i18n.orderNow}
>>>>>>> cf326c0 (chore: centralize CATALOG, unify category routing to ?sub=, make NAV and homepage read from catalog // ASSISTANT_FINAL: true)
      </button>

      <a
        href="/"
        className="inline-block mt-6 ml-3 px-4 py-2 border-2 border-black rounded-xl font-semibold"
        onClick={() => {
          try {
            brain.logEvent("action", {
              action: "back_to_home_from_service",
              service_id: id,
            });
          } catch {}
        }}
      >
        {i18n.backHome}
      </a>
    </main>
  );
}
