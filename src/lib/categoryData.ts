export type CategoryItem = {
  id: string;
  title: string;
  slug: string;
  icon?: string;
};

export type CategoryMap = Record<string, CategoryItem[]>;

export const CATEGORY_MAP: CategoryMap = {
  ai: [{ id: "ai-1", title: "ذكاء اصطناعي", slug: "ai" }],
  design: [{ id: "design-1", title: "تصميم", slug: "design" }],
  dev: [{ id: "dev-1", title: "برمجة", slug: "dev" }],
};

export const CATEGORIES: CategoryItem[] = Object.entries(CATEGORY_MAP).map(([key, items]) => ({
  id: key,
  title: items?.[0]?.title ?? key,
  slug: key,
}));
// ASSISTANT_FINAL: true
