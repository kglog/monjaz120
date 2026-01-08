export type Deal = {
	id: string;
	titleAr: string;
	titleEn: string;
	subcategory: string; // must match DESIGN_CATEGORIES.key
	price: number;
	endsAt: string; // ISO
};

export function getTodayDeals(): Deal[] {
	// مؤقتاً ثابت، لاحقاً نربطه بقاعدة بيانات/لوحة البائع
	const now = new Date();
	const end = new Date(now.getTime() + 8 * 60 * 60 * 1000); // بعد 8 ساعات
	return [
		{ id: "d1", titleAr: "عرض اليوم – شعار سريع", titleEn: "Deal of the Day – Quick Logo", subcategory: "logo", price: 95, endsAt: end.toISOString() },
		{ id: "d2", titleAr: "هوية مصغّرة", titleEn: "Mini Brand Kit", subcategory: "brand", price: 290, endsAt: end.toISOString() },
	];
}
