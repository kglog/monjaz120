import React from "react";
import Link from "next/link";
import { DESIGN_CATEGORIES } from "../../lib/design/categories";

export default function DesignCategories({ lang = "ar" }: { lang?: "ar" | "en" }) {
	return (
		<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
			{DESIGN_CATEGORIES.map((cat: any) => (
				<Link
					key={cat.key}
					href={`/design/${cat.key}`}
					className="block rounded-2xl border border-sky-200 bg-white p-4 shadow-sm hover:shadow-md hover:border-sky-300 transition"
				>
					<div className="text-lg font-semibold text-sky-900 mb-1">
						{lang === "ar" ? cat.nameAr : cat.nameEn}
					</div>
					<div className="text-sm text-gray-600">
						{lang === "ar" ? cat.descAr : cat.descEn}
					</div>
					<div className="mt-3 text-sm text-sky-700">ادخل</div>
				</Link>
			))}
		</div>
	);
}
