import * as React from "react";
import { cn } from "@/lib/cn";

interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "color" | "outline";
  color?: "cobalt" | "coral" | "tangerine" | "lavender" | "emerald";
  size?: "sm" | "md";
}

export function Chip({
  variant = "default",
  color = "cobalt",
  size = "md",
  className = "",
  children,
  ...props
}: ChipProps) {
  const base =
    "inline-flex items-center gap-1.5 rounded-full font-mono text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-1";

  const variants: Record<string, string> = {
    default: "bg-surface-raised border border-border text-ink-secondary",
    color: {
      cobalt: "bg-cobalt-soft border border-cobalt/20 text-cobalt",
      coral: "bg-coral-soft border border-coral/20 text-coral",
      tangerine: "bg-tangerine-soft border border-tangerine/20 text-tangerine",
      lavender: "bg-lavender-soft border border-lavender/20 text-lavender",
      emerald: "bg-emerald-soft border border-emerald/20 text-emerald",
    }[color],
    outline: "border border-border text-ink-secondary hover:bg-surface-raised",
  };

  const sizes: Record<string, string> = {
    sm: "px-2 py-0.5",
    md: "px-3 py-1",
  };

  const variantClass =
    variant === "color"
      ? variants.color
      : variant === "outline"
        ? variants.outline
        : variants.default;

  return (
    <span
      {...props}
      className={cn(base, variantClass, sizes[size], className)}
    >
      {children}
    </span>
  );
}
