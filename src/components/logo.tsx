import Link from "next/link";

/**
 * Site logo — a compact cobalt monogram mark + serif wordmark.
 * Replaces the old sparkle icon with a quieter editorial mark.
 */
export function Logo({
  href = "/",
  className = "",
  onClick,
}: {
  href?: string;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`group inline-flex items-center gap-2.5 ${className}`}
      aria-label="Pratham Wankhade — home"
    >
      <span
        aria-hidden="true"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-cobalt text-white shadow-[0_1px_2px_rgba(29,78,216,0.35)] transition-transform duration-300 group-hover:-translate-y-0.5"
      >
        <span className="editor-text text-[17px] font-semibold leading-none tracking-tight">
          P
        </span>
      </span>
      <span className="editor-text text-lg sm:text-heading font-semibold tracking-tight text-ink whitespace-nowrap">
        Pratham <span className="text-coral">Wankhade</span>
      </span>
    </Link>
  );
}
