"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useEffect, useState, useCallback, useRef } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/experience", label: "Experience" },
  { href: "/achievements", label: "Writing" },
  { href: "/contact", label: "Contact" },
];

export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        close();
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40">
        <div className="border-b border-border/60 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex h-16 items-center justify-between">
              <Logo />
              <div className="hidden lg:flex items-center gap-6 xl:gap-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`relative text-sm font-medium transition-colors py-2 ${
                      isActive(item.href)
                        ? "text-cobalt"
                        : "text-ink-secondary hover:text-ink"
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`absolute -bottom-0.5 left-0 h-0.5 rounded-full bg-cobalt origin-left transition-transform duration-300 ${
                        isActive(item.href) ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </Link>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <div className="hidden min-[370px]:block">
                  <Button asChild variant="outline" size="sm">
                    <Link href="/contact">Get in touch</Link>
                  </Button>
                </div>
                <button
                  ref={triggerRef}
                  onClick={() => setOpen((prev) => !prev)}
                  className="lg:hidden flex items-center justify-center p-2 text-ink"
                  aria-label={open ? "Close menu" : "Open menu"}
                  aria-expanded={open}
                  aria-controls="mobile-nav"
                >
                  {open ? (
                    <X className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <Menu className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm"
          onClick={close}
        >
          <div className="absolute inset-0 bg-black/25" />
          <div
            id="mobile-nav"
            className="absolute inset-y-0 right-0 w-full sm:w-96 md:w-[24rem] bg-surface border-l border-border shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 flex items-center justify-between border-b border-border">
              <Logo onClick={close} />
              <button
                onClick={close}
                className="flex items-center justify-center p-2 text-ink"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <nav className="p-6 space-y-1 flex-1 overflow-y-auto">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={close}
                  className={`block px-4 py-3 text-lg font-medium rounded-lg transition-colors ${
                    isActive(item.href)
                      ? "bg-cobalt-soft text-cobalt"
                      : "text-ink-secondary hover:bg-surface-raised hover:text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
