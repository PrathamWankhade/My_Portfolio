import Link from "next/link";
import { CurrentYear } from "@/components/ui/current-year";
import { Mail, Github, MapPin } from "lucide-react";
import { LinkedInIcon } from "@/components/icons/linkedin";
import { Logo } from "@/components/logo";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-[1.8fr_1.7fr_1fr] gap-12">
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <div className="mb-4">
              <Logo />
            </div>
            <p className="text-body text-ink-secondary leading-relaxed max-w-xs">
              AI/ML &amp; full-stack engineer. Mesh messaging, computer vision,
              security, and offline-first systems — documented with
              architecture, trade-offs, and honest limits.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-ink mb-4">Connect</h2>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-body text-ink-secondary">
                <Mail className="h-4 w-4 shrink-0 text-cobalt" aria-hidden="true" />
                <a
                  href="mailto:prathamwankhade2004@gmail.com"
                  className="min-w-0 break-all hover:text-cobalt transition-colors"
                >
                  prathamwankhade2004@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-body text-ink-secondary">
                <MapPin className="h-4 w-4 shrink-0 text-cobalt" aria-hidden="true" />
                Amravati, Maharashtra, India
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold text-ink mb-4">Elsewhere</h2>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://github.com/PrathamWankhade"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-body text-ink-secondary hover:text-cobalt transition-colors"
                >
                  <Github className="h-4 w-4 text-cobalt" aria-hidden="true" />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/pratham-wankhade"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-body text-ink-secondary hover:text-cobalt transition-colors"
                >
                  <LinkedInIcon className="h-4 w-4 text-cobalt" />
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted">
            ©{" "}
            <CurrentYear /> Pratham Wankhade. Original design and content.
            Verifiable claims only — no fabricated metrics.
          </p>
          <div className="flex items-center gap-2 sm:gap-6 text-xs text-muted uppercase tracking-widest">
            <Link href="/" className="inline-flex items-center min-h-[44px] px-2 -mx-2 hover:text-ink transition-colors">
              Home
            </Link>
            <Link href="/about" className="inline-flex items-center min-h-[44px] px-2 -mx-2 hover:text-ink transition-colors">
              About
            </Link>
            <Link href="/contact" className="inline-flex items-center min-h-[44px] px-2 -mx-2 hover:text-ink transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
