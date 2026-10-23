"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Reveal-on-scroll wrapper. Adds `.is-visible` once the block enters the
 * viewport so the CSS transition in globals.css can play. The content is
 * always rendered (no conditional children), so it stays in the DOM for
 * search engines and screen readers — only opacity/transform animate.
 *
 * Motion is neutralised for visitors with `prefers-reduced-motion`, and a
 * <noscript> rule in the root layout keeps everything visible without JS.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  /** Optional transition delay in ms for staggered groups. */
  delay?: number;
  as?: "div" | "section" | "aside" | "li" | "article";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // No IntersectionObserver support: show immediately, never hide content.
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={cn("reveal", className)}
      style={delay > 0 ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
