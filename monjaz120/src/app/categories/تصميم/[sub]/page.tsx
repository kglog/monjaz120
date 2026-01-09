// Redirect page for old two-segment route -> new single-category ?sub= URL
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

type Props = { params: { sub: string } };

export default function SubDesignRedirect(props: any) {
  const router = useRouter();
  useEffect(() => {
    const sub = decodeURIComponent(props.params?.sub || "");
    const url = `/categories/${encodeURIComponent("تصميم")}?sub=${encodeURIComponent(sub)}`;
    // replace to avoid creating history entry for old path
    router.replace(url);
  }, [props, router]);

  return null;
}
