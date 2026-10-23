import Link from "next/link";
import { about } from "@/content/about";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Reveal } from "@/components/reveal";

export const metadata = {
  title: "About",
  description: "Pratham Wankhade — personal story, education, technical philosophy, and interests.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col flex-1">
      <section className="overflow-hidden pt-28 pb-14 sm:pt-32">
        <div className="relative mx-auto max-w-3xl px-6">
          <div className="absolute -inset-1 bg-gradient-to-r from-cobalt via-coral to-tangerine rounded-2xl blur opacity-20" />
          <div className="relative rounded-2xl border border-border bg-surface p-8 md:p-12 shadow-card">
            <span className="editor-text text-xs font-semibold tracking-widest text-cobalt uppercase mb-4 block">
              Atlas · About
            </span>
            <h1 className="editor-text text-display font-semibold leading-[1.04] tracking-tight text-ink mb-6">
              The quiet chapter
              <br />
              <span className="text-coral italic">after the opening credits</span>
            </h1>
            <p className="text-lg text-ink-secondary leading-relaxed mb-6">
              {about.bio}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="text-sm font-medium text-cobalt hover:text-cobalt/90 transition-colors">
                Get in touch <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16 border-y border-border/50">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal>
            <div className="editor-text text-heading font-semibold tracking-tight text-ink mb-6">
              My story
            </div>
            <p className="border-l-[3px] border-cobalt/40 pl-5 sm:pl-7 text-lg text-ink-secondary leading-relaxed drop-cap">
              {about.story}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-3 gap-10">
            <Reveal className="lg:col-span-2">
              <h3 className="editor-text text-heading font-semibold tracking-tight text-ink mb-6">
                Technical philosophy
              </h3>
              <div className="space-y-5">
                {about.techPhilosophy.map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-cobalt font-mono text-sm">
                      {i + 1}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-ink mb-1">{item.title}</h4>
                      <p className="text-sm text-ink-secondary leading-relaxed max-w-[65ch]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={120} as="aside" className="h-full">
              <Card variant="solid" color="cobalt" padded={false} className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-8 w-8 rounded-full border border-white/40 bg-white/20 flex items-center justify-center text-white">
                    <span className="font-mono text-xs font-medium">PW</span>
                  </div>
                  <div>
                    <p className="font-semibold text-white">{about.name}</p>
                    <p className="text-xs text-cobalt-soft/80">{about.role}</p>
                  </div>
                </div>
                <p className="text-sm text-white/80 leading-relaxed mb-6 max-w-sm">
                  {about.location} · AI/ML &amp; full-stack engineer building
                  mesh, vision, and security systems.
                </p>
                <div className="space-y-3">
                  <a
                    href={`mailto:${about.email}`}
                    className="flex items-center gap-2 min-w-0 text-sm text-white hover:text-cobalt-soft transition-colors"
                  >
                    <span className="h-4 w-4 shrink-0 rounded-full border border-white/30 bg-white/10 flex items-center justify-center text-[0.7rem]">
                      @
                    </span>
                    <span className="break-all">{about.email}</span>
                  </a>
                  <a
                    href={`tel:${about.phone.replace(/\s/g, "")}`}
                    className="flex items-center gap-2 min-w-0 text-sm text-white hover:text-cobalt-soft transition-colors"
                  >
                    <span className="h-4 w-4 shrink-0 rounded-full border border-white/30 bg-white/10 flex items-center justify-center text-[0.7rem]">
                      ☎
                    </span>
                    {about.phone}
                  </a>
                  <a
                    href={about.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 min-w-0 text-sm text-white hover:text-cobalt-soft transition-colors"
                  >
                    <span className="h-4 w-4 shrink-0 rounded-full border border-white/30 bg-white/10 flex items-center justify-center text-[0.7rem]">
                      <span className="text-[0.6rem]">/</span>
                    </span>
                    <span className="break-all">github.com/PrathamWankhade</span>
                  </a>
                </div>
              </Card>
            </Reveal>
          </div>

          <div className="mt-12 pt-10 border-t border-border">
            <h3 className="editor-text text-heading font-semibold tracking-tight text-ink mb-6">
              Interests
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {about.interests.map((interest, i) => (
                <Reveal key={interest.name} delay={i * 70} className="h-full">
                  <Card variant="bordered" padded={false} className="p-5 h-full">
                    <CardTitle className="mb-2">{interest.name}</CardTitle>
                    <CardDescription>{interest.description}</CardDescription>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
