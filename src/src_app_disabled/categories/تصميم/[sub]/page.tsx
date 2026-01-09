// Redirect page for old two-segment route -> new single-category ?sub= URL
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

type Props = { params: { sub: string } };

export default function SubDesignRedirect({ params }: Props) {
  const router = useRouter();
  useEffect(() => {
    const sub = decodeURIComponent(params.sub || "");
    const url = `/categories/${encodeURIComponent("تصميم")}?sub=${encodeURIComponent(sub)}`;
    // replace to avoid creating history entry for old path
    router.replace(url);
  }, [params, router]);

  return null;
}
