"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "outline" | "color";
  color?: "cobalt" | "coral" | "tangerine" | "lavender" | "emerald";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

const colorClasses: Record<string, string> = {
  cobalt: "bg-cobalt text-white border border-cobalt/30 hover:bg-cobalt/90 focus-visible:ring-cobalt active:scale-[0.98]",
  coral: "bg-coral text-white border border-coral/30 hover:bg-coral/90 focus-visible:ring-coral active:scale-[0.98]",
  tangerine: "bg-tangerine text-white border border-tangerine/30 hover:bg-tangerine/90 focus-visible:ring-tangerine active:scale-[0.98]",
  lavender: "bg-lavender text-white border border-lavender/30 hover:bg-lavender/90 focus-visible:ring-lavender active:scale-[0.98]",
  emerald: "bg-emerald text-white border border-emerald/30 hover:bg-emerald/90 focus-visible:ring-emerald active:scale-[0.98]",
};

export function Button({
  variant = "primary",
  color = "cobalt",
  size = "md",
  className = "",
  children,
  asChild = false,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-medium whitespace-nowrap rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const variants: Record<string, string> = {
    primary: colorClasses[color] || colorClasses.cobalt,
    ghost:
      "bg-surface text-ink hover:bg-surface-raised border-transparent focus-visible:ring-muted/20 active:scale-[0.98]",
    outline:
      "border border-ink/20 text-ink hover:bg-ink/5 focus-visible:ring-ink/30 active:scale-[0.98]",
    color: colorClasses[color] || colorClasses.cobalt,
  };

  const sizes: Record<string, string> = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const mergedClassName = cn(base, variants[variant], sizes[size], className);

  if (asChild) {
    return (
      <>
        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) return child;
          const element = child as React.ReactElement<Record<string, unknown>>;
          const mergedProps: Partial<Record<string, unknown>> = {
            ...element.props,
            ...props,
            className: cn(
              typeof element.props.className === "string"
                ? element.props.className
                : "",
              mergedClassName
            ),
          };
          return React.cloneElement(element, mergedProps);
        })}
      </>
    );
  }

  return (
    <button type="button" className={mergedClassName} {...props}>
      {children}
    </button>
  );
}
