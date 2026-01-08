// src/lib/services.ts

export interface Service {
  id: number;
  title: string;
  category: string;
  seller: string;
  price: number;
  description: string;
  image: string;
}

export const allServices: Service[] = [
  {
    id: 1,
    title: "تصميم شعار احترافي",
    category: "تصميم",
    seller: "أحمد المصمم",
    price: 150,
    description: "سأقوم بتصميم شعار يعبر عن هوية مشروعك بجودة عالية.",
    image: "/design.jpg",
  },
  {
    id: 2,
    title: "كتابة محتوى تسويقي",
    category: "كتابة وترجمة",
    seller: "منى الكاتبة",
    price: 200,
    description: "كتابة محتوى تسويقي جذاب لخدماتك أو منتجاتك.",
    image: "/no-image.png",
  },
  {
    id: 3,
    title: "برمجة موقع Next.js",
    category: "برمجة وتطوير",
    seller: "سعود المطور",
    price: 500,
    description: "برمجة موقع احترافي باستخدام Next.js.",
    image: "/no-image.png",
  },
];
