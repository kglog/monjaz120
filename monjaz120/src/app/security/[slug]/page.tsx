import { CATEGORY_MAP } from "@/lib/categoryData";
import ServiceListTemplate from "@/components/ServiceListTemplate";

export default function SubcategoryPage(props: any) {
  const slug = props.params?.slug || "";
  const cat = CATEGORY_MAP["security"];

  // Find popular item by key or title; fall back to slug-decoded title
  const popular = cat.popular.find((p) => p.key === slug || encodeURIComponent(p.title) === slug || p.title === decodeURIComponent(slug));
  const displayTitle = popular ? popular.title : decodeURIComponent(slug || cat.title);

  // Render the common ServiceListTemplate used by other static subcategory pages
  return <ServiceListTemplate title={displayTitle} subtitle={cat.hero.subtitle} categoryKey={cat.key} />;
}

// ASSISTANT_FINAL: true
