import React from "react";
import clsx from "clsx";

type BtnProps = React.HTMLAttributes<HTMLButtonElement | HTMLAnchorElement> & {
  as?: "button" | "a" | "span";
  href?: string;
  size?: "sm" | "md" | "lg";
  rounded?: "pill" | "xl";
};

const base =
  "shiny-static border border-black/20 text-gray-900 inline-flex items-center justify-center select-none bg-[linear-gradient(120deg,#eaf7ff_60%,#f6fbff_100%)]";

const sizes = {
  sm: "text-sm px-3 py-1.5",
  md: "text-base px-4 py-2.5",
  lg: "text-lg px-5 py-3",
};

const round = { pill: "rounded-full", xl: "rounded-xl" };

export function ShinyButton({
  as = "a", href, size = "md", rounded = "pill", className, children, ...rest
}: BtnProps) {
  const Comp: any = as;
  return (
    <Comp href={href} className={clsx(base, sizes[size], round[rounded], "bg-[#eaf7ff]/80", className)} {...rest}>
      {children}
    </Comp>
  );
}

export function ShinyChip({
  children, className,
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={clsx(
      "shiny-static rounded-full border border-black/20 px-3 py-1 text-sm shadow-sm bg-[#eaf7ff]/80",
      className
    )}>
      {children}
    </span>
  );
}

export function ShinyCard({
  className, children,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={clsx("glow-border rounded-2xl border border-black/20 bg-[#eaf7ff]/70 p-5", className)}>
      {children}
    </div>
  );
}
// ASSISTANT_FINAL: true
