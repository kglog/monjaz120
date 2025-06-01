// 📁 src/app/api/services/route.ts

import { NextResponse } from 'next/server';

let services = [
  {
    id: 1,
    title: 'تصميم لوقو',
    description: 'خدمة تصميم احترافي للشعارات',
    category: 'تصميم',
    price: 150,
    featured: true
  },
  {
    id: 2,
    title: 'كتابة مقالات',
    description: 'محتوى عربي حصري 100%',
    category: 'كتابة وترجمة',
    price: 80,
    featured: false
  },
  {
    id: 3,
    title: 'خطة تسويق ذكية',
    description: 'نموذج خطة تسويقية جاهزة للتحميل',
    category: 'أفكار جاهزة للبيع',
    price: 200,
    featured: true
  },
  {
    id: 4,
    title: 'إعلانات سوشيال ميديا',
    description: 'نصوص جذابة + تصميمات',
    category: 'تسويق وإعلان',
    price: 120,
    featured: false
  }
];

export async function GET() {
  return NextResponse.json(services);
}
