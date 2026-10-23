import * as React from "react";
import { cn } from "@/lib/cn";
import {
  colorBorder,
  colorBorderSoft,
  colorSolidBg,
  colorSoftBg,
  type ColorName,
} from "@/lib/color-classes";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "bordered" | "raised" | "color" | "solid";
  color?: ColorName;
  padded?: boolean;
}

export function Card({
  variant = "default",
  color,
  padded = true,
  className = "",
  children,
  ...props
}: CardProps) {
  const base =
    "rounded-xl transition-all duration-300 focus-within:ring-2 focus-within:ring-offset-1";

  const variants: Record<string, string> = {
    default: "bg-surface border border-border shadow-soft",
    bordered: "bg-surface border-2 border-border shadow-none",
    raised: "bg-surface-raised border border-border shadow-card hover:-translate-y-4 hover:border-cobalt hover:shadow-card",
    color: color ? `${colorSoftBg[color]} border ${colorBorderSoft[color]} shadow-none` : "bg-surface border border-border shadow-none",
    solid: color ? `${colorSolidBg[color]} border ${colorBorder[color]} shadow-none text-white` : "bg-ink border border-ink shadow-none text-white",
  };

  const padding = padded ? "p-6" : "p-0";

  return (
    <div
      {...props}
      className={cn(base, variants[variant], padding, className)}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function CardHeader({ className, ...props }: CardHeaderProps) {
  return (
    <div
      {...props}
      className={cn("flex flex-col space-y-1.5 pb-4", className)}
    />
  );
}

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  className?: string;
}

export function CardTitle({ className, ...props }: CardTitleProps) {
  return (
    <h3
      {...props}
      className={cn(
        "font-serif text-heading text-ink tracking-tight",
        className
      )}
    />
  );
}

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  className?: string;
}

export function CardDescription({
  className,
  ...props
}: CardDescriptionProps) {
  return (
    <p
      {...props}
      className={cn("text-body text-ink-secondary leading-relaxed", className)}
    />
  );
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function CardContent({ className, ...props }: CardContentProps) {
  return (
    <div {...props} className={cn("pt-4", className)} />
  );
}

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function CardFooter({ className, ...props }: CardFooterProps) {
  return (
    <div
      {...props}
      className={cn("flex items-center pt-4", className)}
    />
  );
}
