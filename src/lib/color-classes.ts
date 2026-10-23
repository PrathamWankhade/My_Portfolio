/**
 * Static Tailwind class maps for every accent colour.
 *
 * Tailwind only generates classes it can see as complete literals in source
 * files, so interpolated strings like `text-${color}` silently produce no CSS.
 * Every colour-dependent surface must look its classes up here instead.
 */

export type ColorName =
  | "cobalt"
  | "coral"
  | "tangerine"
  | "lavender"
  | "emerald";

/** Extendable neutral used where a channel should read as "ink", not an accent. */
export type AnyColorName = ColorName | "ink";

/** Raw brand hex values — for gradients and inline SVG fills. */
export const colorHex: Record<AnyColorName, string> = {
  cobalt: "#1d4ed8",
  coral: "#ef4444",
  tangerine: "#fb923c",
  lavender: "#a78bfa",
  emerald: "#10b981",
  ink: "#0f172a",
};

/** Soft tint backgrounds (`--*-soft` tokens). */
export const colorSoftBg: Record<ColorName, string> = {
  cobalt: "bg-cobalt-soft",
  coral: "bg-coral-soft",
  tangerine: "bg-tangerine-soft",
  lavender: "bg-lavender-soft",
  emerald: "bg-emerald-soft",
};

/** Solid accent backgrounds. */
export const colorSolidBg: Record<AnyColorName, string> = {
  cobalt: "bg-cobalt",
  coral: "bg-coral",
  tangerine: "bg-tangerine",
  lavender: "bg-lavender",
  emerald: "bg-emerald",
  ink: "bg-ink",
};

/** Accent text colour. */
export const colorText: Record<AnyColorName, string> = {
  cobalt: "text-cobalt",
  coral: "text-coral",
  tangerine: "text-tangerine",
  lavender: "text-lavender",
  emerald: "text-emerald",
  ink: "text-ink",
};

/** Hover text colour. */
export const colorHoverText: Record<AnyColorName, string> = {
  cobalt: "hover:text-cobalt",
  coral: "hover:text-coral",
  tangerine: "hover:text-tangerine",
  lavender: "hover:text-lavender",
  emerald: "hover:text-emerald",
  ink: "hover:text-ink",
};

/** 30%-opacity borders. */
export const colorBorder: Record<ColorName, string> = {
  cobalt: "border-cobalt/30",
  coral: "border-coral/30",
  tangerine: "border-tangerine/30",
  lavender: "border-lavender/30",
  emerald: "border-emerald/30",
};

/** 20%-opacity borders. */
export const colorBorderSoft: Record<ColorName, string> = {
  cobalt: "border-cobalt/20",
  coral: "border-coral/20",
  tangerine: "border-tangerine/20",
  lavender: "border-lavender/20",
  emerald: "border-emerald/20",
};

/** Group-hover 50%-opacity borders. */
export const colorGroupBorder: Record<AnyColorName, string> = {
  cobalt: "group-hover:border-cobalt/50",
  coral: "group-hover:border-coral/50",
  tangerine: "group-hover:border-tangerine/50",
  lavender: "group-hover:border-lavender/50",
  emerald: "group-hover:border-emerald/50",
  ink: "group-hover:border-ink/50",
};

/** Ready-made pill treatment: tinted background + accent border + accent text. */
export const colorPill: Record<ColorName, string> = {
  cobalt: "border-cobalt/30 bg-cobalt-soft text-cobalt",
  coral: "border-coral/30 bg-coral-soft text-coral",
  tangerine: "border-tangerine/30 bg-tangerine-soft text-tangerine",
  lavender: "border-lavender/30 bg-lavender-soft text-lavender",
  emerald: "border-emerald/30 bg-emerald-soft text-emerald",
};

/** Soft panel: tinted background + light accent border. */
export const colorPanel: Record<ColorName, string> = {
  cobalt: "bg-cobalt-soft border-cobalt/20",
  coral: "bg-coral-soft border-coral/20",
  tangerine: "bg-tangerine-soft border-tangerine/20",
  lavender: "bg-lavender-soft border-lavender/20",
  emerald: "bg-emerald-soft border-emerald/20",
};
