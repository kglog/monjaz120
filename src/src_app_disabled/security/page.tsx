import { redirect } from "next/navigation";

export default function Page() {
  // Redirect the base /security path to the canonical categories page
  redirect(`/categories/${encodeURIComponent("الحماية الإلكترونية")}`);
}

// ASSISTANT_FINAL: true
