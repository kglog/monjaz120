"use client";
import React from "react";
import { useState } from "react";
import Link from "next/link";

export type Service = {
	id: string;
	title: string;
	seller: string;
	verified: boolean;
	rating: number;    // 0..5
	orders: number;
	deliveryDays: number;
	price: number;
	subcategory: string;
};

export default function ServiceCard({ s, onOrder }: { s: Service; onOrder?: (s: Service)=>void }) {
	const [hover, setHover] = useState(false);
	return (
		<div
			className={`relative rounded-2xl border border-sky-200 bg-white p-4 shadow-sm ${hover ? "shadow-md border-sky-300" : ""}`}
			onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}
		>
			<div className="aspect-video rounded-xl bg-sky-50 mb-3"></div>
			<div className="flex items-center justify-between mb-1">
				<div className="font-semibold text-sky-900 -translate-y-[2px]">{s.title}</div>
				{s.verified && <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">موثّق</span>}
			</div>
			<div className="text-sm text-gray-600 mb-2">بواسطة {s.seller}</div>
			<div className="flex items-center gap-3 text-sm text-gray-700 mb-3">
				<span>طلبات: {s.orders}</span>
				<span>تسليم: {s.deliveryDays}يوم</span>
			</div>
			<div className="flex items-center justify-between">
				<div>
					<div className="text-lg font-bold text-sky-900 -translate-y-[2px]">{s.price} ر.س</div>
					<div className="mt-2 text-amber-500 text-sm font-semibold">⭐ {s.rating.toFixed(1)}</div>
				</div>
				<div className="flex gap-2">
					<button onClick={()=>onOrder?.(s)} className="px-3 py-1.5 rounded-xl border border-sky-800 bg-sky-900 text-white filter brightness-95">
						اطلب الآن
					</button>
					<button className="px-3 py-1.5 rounded-xl border">أضف للمقارنة</button>
				</div>
			</div>
		</div>
	);
}
