// Redirect old two-segment route to single category + ?sub= URL
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

type Props = { params: { sub: string } };

export default function SubProgrammingRedirect({ params }: Props) {
  const router = useRouter();
  useEffect(() => {
    const sub = decodeURIComponent(params.sub || "");
    const url = `/categories/${encodeURIComponent("برمجة وتطوير")}?sub=${encodeURIComponent(sub)}`;
    router.replace(url);
  }, [params, router]);
  return null;
}
