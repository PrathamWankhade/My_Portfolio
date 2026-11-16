import Link from "next/link";
import { achievements, talks } from "@/content/experience";
import { publications, authorPositionLabel } from "@/content/publications";
import { Card, CardTitle } from "@/components/ui/card";
import { Reveal } from "@/components/reveal";

export const metadata = {
  title: "Achievements & Writing",
  description: "Verifiable achievements, talks, and published writing only.",
};

export default function AchievementsPage() {
  return (
    <div className="flex flex-col flex-1">
      <section className="pt-28 pb-14 sm:pt-32">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <span className="editor-text text-xs font-semibold tracking-widest text-cobalt uppercase mb-4 block">
            Record
          </span>
          <h1 className="editor-text text-display font-semibold leading-[1.04] tracking-tight text-ink mb-6">
            Achievements &amp; writing
          </h1>
          <p className="text-lg text-ink-secondary leading-relaxed max-w-lg mx-auto">
            A peer-reviewed Springer chapter, certifications, hackathon results,
            and talks — only what I can verify. No inflated metrics, no invented
            awards.
          </p>
        </div>
      </section>

      {/* Publication */}
      <section className="py-14 sm:py-16 border-b border-border/50">
        <div className="mx-auto max-w-5xl px-6">
          <div className="editor-text text-heading font-semibold tracking-tight text-ink mb-6">
            Publication
          </div>
          <div className="space-y-6">
            {publications.map((p) => (
              <Reveal key={p.doi}>
                <Card variant="bordered" className="p-6">
                  <p className="text-xs font-mono text-cobalt mb-2">
                    Springer · ICAIA 2025 · pp. {p.pages} · online {p.onlineDate}
                  </p>
                  <CardTitle className="mb-2">{p.title}</CardTitle>
                  <p className="text-sm text-ink-secondary">{p.authors.join(", ")}</p>
                  <p className="mt-3 text-sm text-ink-secondary leading-relaxed max-w-[65ch]">
                    {p.venue}. {p.series}. {p.publisher}, {p.year}. Co-author,{" "}
                    {authorPositionLabel(p.authorPosition, p.authors.length)}.
                    {p.conferenceDates && p.hostedAt && (
                      <> Presented at {p.hostedAt}, {p.conferenceDates}.</>
                    )}
                  </p>
                  <p className="mt-3 text-sm text-ink-secondary leading-relaxed max-w-[65ch]">
                    <span className="font-semibold text-ink">
                      {p.reportedResult.value} {p.reportedResult.label.toLowerCase()}
                    </span>{" "}
                    — {p.reportedResult.condition}.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-4">
                    <Link
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-medium text-cobalt hover:text-cobalt/90 transition-colors"
                    >
                      Read the chapter <span aria-hidden="true">→</span>
                    </Link>
                    <Link
                      href={p.scholar}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-medium text-cobalt hover:text-cobalt/90 transition-colors"
                    >
                      Google Scholar <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="editor-text text-heading font-semibold tracking-tight text-ink mb-6">
            Achievements
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((a, i) => (
              <Reveal key={a.title} delay={(i % 3) * 80} className="h-full">
                <Card variant="bordered" className="hover-card p-6 h-full">
                  <CardTitle className="mb-2">{a.title}</CardTitle>
                  <p className="text-sm text-ink-secondary mb-4">{a.organization}</p>
                  <p className="text-xs font-mono text-cobalt">
                    {a.kind === "certification" ? "Certification" : "Award"}
                    {a.date ? ` · ${a.date}` : ""}
                  </p>
                  <p className="mt-4 text-sm text-ink-secondary leading-relaxed max-w-[65ch]">
                    {a.description}
                  </p>
                  {a.url && (
                    <Link
                      key="url"
                      href={a.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-cobalt hover:text-cobalt/90 transition-colors"
                    >
                      View <span aria-hidden="true">→</span>
                    </Link>
                  )}
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16 border-y border-border/50">
        <div className="mx-auto max-w-5xl px-6">
          <div className="editor-text text-heading font-semibold tracking-tight text-ink mb-6">
            Presentations
          </div>
          <div className="space-y-6">
            {talks.map((talk: typeof talks[number], i) => (
              <Reveal key={talk.title} delay={i * 70}>
                <Card variant="bordered" className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-ink">{talk.title}</h3>
                      <p className="text-sm font-mono text-cobalt">{talk.date}</p>
                    </div>
                    <p className="text-xs font-semibold text-ink-secondary uppercase tracking-widest">
                      Presented
                    </p>
                  </div>
                  <p className="text-sm text-ink-secondary mb-3 max-w-[65ch]">{talk.event}</p>
                  <p className="text-sm text-ink-secondary leading-relaxed max-w-[65ch]">
                    {talk.description}
                  </p>
                </Card>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-sm text-ink-secondary max-w-2xl">
            Talks are presented, never published. No fabricated metrics, awards,
            or employment claims.
          </p>
        </div>
      </section>
    </div>
  );
}
