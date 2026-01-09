// Redirect old two-segment route to single category + ?sub= URL
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

type Props = { params: { sub: string } };

export default function SubProgrammingRedirect(props: any) {
  const router = useRouter();
  useEffect(() => {
    const sub = decodeURIComponent(props.params?.sub || "");
    const url = `/categories/${encodeURIComponent("برمجة وتطوير")}?sub=${encodeURIComponent(sub)}`;
    router.replace(url);
  }, [props, router]);
  return null;
}
