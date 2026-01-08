"use client";
import React from "react";
import { useState, useEffect } from "react";

export type FiltersState = {
	budgetMin: number;
	budgetMax: number;
	delivery: "any" | "1" | "3" | "7" | "custom";
	sellerLevel: "any" | "new" | "mid" | "pro";
	sellerStatus: "any" | "online" | "verified";
	lang: "ar" | "en" | "any";
	dealsOnly: boolean;
};

export default function DesignFilters({
	onChange,
	lang = "ar",
}: {
	onChange?: (f: FiltersState) => void;
	lang?: "ar" | "en";
}) {
	const [state, setState] = useState<FiltersState>({
		budgetMin: 10,
		budgetMax: 2000,
		delivery: "any",
		sellerLevel: "any",
		sellerStatus: "any",
		lang: "any",
		dealsOnly: false,
	});

	useEffect(() => { onChange?.(state); }, [state, onChange]);

	return (
		<div className="rounded-2xl border border-gray-200 p-4 space-y-3 sticky top-4">
			<div className="font-semibold">{lang === "ar" ? "الفلاتر" : "Filters"}</div>

			<div>
				<div className="text-sm mb-1">الميزانية (ر.س)</div>
				<div className="flex items-center gap-2">
					<input type="number" className="w-24 rounded border p-1"
						value={state.budgetMin}
						onChange={e => setState(s => ({ ...s, budgetMin: Number(e.target.value || 0) }))}/>
					<span className="text-gray-500">—</span>
					<input type="number" className="w-24 rounded border p-1"
						value={state.budgetMax}
						onChange={e => setState(s => ({ ...s, budgetMax: Number(e.target.value || 0) }))}/>
				</div>
			</div>

			<div>
				<div className="text-sm mb-1">مدة التسليم</div>
				<select className="w-full rounded border p-2"
					value={state.delivery}
					onChange={e => setState(s => ({ ...s, delivery: e.target.value as FiltersState["delivery"] }))}>
					<option value="any">أي مدة</option>
					<option value="1">اليوم</option>
					<option value="3">3 أيام</option>
					<option value="7">7 أيام</option>
					<option value="custom">مخصص</option>
				</select>
			</div>

			<div>
				<div className="text-sm mb-1">مستوى البائع</div>
				<select className="w-full rounded border p-2"
					value={state.sellerLevel}
					onChange={e => setState(s => ({ ...s, sellerLevel: e.target.value as FiltersState["sellerLevel"] }))}>
					<option value="any">الكل</option>
					<option value="new">جديد</option>
					<option value="mid">متمرّس</option>
					<option value="pro">خبير</option>
				</select>
			</div>

			<div>
				<div className="text-sm mb-1">حالة البائع</div>
				<select className="w-full rounded border p-2"
					value={state.sellerStatus}
					onChange={e => setState(s => ({ ...s, sellerStatus: e.target.value as FiltersState["sellerStatus"] }))}>
					<option value="any">الكل</option>
					<option value="online">متواجد حالياً</option>
					<option value="verified">هوية موثقة</option>
				</select>
			</div>

			<div>
				<div className="text-sm mb-1">اللغة</div>
				<select className="w-full rounded border p-2"
					value={state.lang}
					onChange={e => setState(s => ({ ...s, lang: e.target.value as FiltersState["lang"] }))}>
					<option value="any">الكل</option>
					<option value="ar">عربي</option>
					<option value="en">English</option>
				</select>
			</div>

			<label className="flex items-center gap-2 text-sm">
				<input type="checkbox"
					checked={state.dealsOnly}
					onChange={e => setState(s => ({ ...s, dealsOnly: e.target.checked }))}/>
				عروض اليوم فقط
			</label>
		</div>
	);
}
