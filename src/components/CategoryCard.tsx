'use client';

import Link from 'next/link';

type Props = {
  title: string;
  description: string;
  icon: string;
  href?: string;
};

export default function CategoryCard({ title, description, icon, href }: Props) {
  const Card = (
    <div
      className="
        w-full h-[165px] p-4
        rounded-xl border-4 border-black
  bg-[#fdfeff] text-center
        flex flex-col items-center justify-center
        shadow-sm hover:shadow-md transition
      "
    >
      <div className="text-[45px] mb-1">{icon}</div>
      <h3 className="text-[18px] font-bold tracking-tight text-gray-900">
        {title}
      </h3>
      <p className="mt-1 text-[15px] font-medium text-gray-900 leading-snug">
        {description}
      </p>
    </div>
  );

  // نخلي الرابط كتلة عشان ياخذ عرض الشبكة بالكامل
  return href ? (
    <Link href={href} className="block">
      {Card}
    </Link>
  ) : (
    Card
  );
}
