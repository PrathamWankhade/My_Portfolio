import { experience, talks } from "@/content/experience";
import { colorPill, colorSolidBg, type ColorName } from "@/lib/color-classes";
import { Reveal } from "@/components/reveal";

export const metadata = {
  title: "Experience & Education",
  description: "Editorial timeline of work experience and education.",
};

export default function ExperiencePage() {
  const work = experience.filter((e) => e.type === "work");
  const edu = experience.filter((e) => e.type === "education");

  return (
    <div className="flex flex-col flex-1">
      <section className="pt-28 pb-14 sm:pt-32">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <span className="editor-text text-xs font-semibold tracking-widest text-cobalt uppercase mb-4 block">
            Timeline
          </span>
          <h1 className="editor-text text-display font-semibold leading-[1.04] tracking-tight text-ink mb-6">
            Experience &amp; education
          </h1>
          <p className="text-lg text-ink-secondary leading-relaxed max-w-lg mx-auto">
            A chronological record of where I&apos;ve built and what I&apos;ve
            studied — verifiable details only.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-16 border-y border-border/50">
        <div className="mx-auto max-w-5xl px-6">
          <TimelineSection title="Experience" color="cobalt" entries={work} />
          <TimelineSection title="Education" color="tangerine" entries={edu} />
        </div>
      </section>

      {talks.length > 0 && (
        <section className="py-14 sm:py-16">
          <div className="mx-auto max-w-5xl px-6">
            <TimelineSection title="Presentations" color="lavender" entries={talks} />
          </div>
        </section>
      )}
    </div>
  );
}

type TimelineEntry = {
  title: string;
  period?: string;
  organization?: string;
  location?: string;
  detail?: string;
  description: string;
  highlights?: string[];
};


interface TimelineSectionProps {
  title: string;
  color: ColorName;
  entries: TimelineEntry[];
}

function TimelineSection({ title, color, entries }: TimelineSectionProps) {
  return (
    <section className="mb-10 last:mb-0">
      <h2 className="editor-text text-heading font-semibold tracking-tight text-ink mb-6 flex items-center gap-3">
        <span className={`h-1.5 w-6 rounded-full ${colorSolidBg[color]}`} aria-hidden="true" />
        {title}
      </h2>
      <div className="relative pl-8 sm:pl-12 border-l-2 border-border/30">
        {entries.map((entry, i) => (
          <Reveal key={i} delay={i * 60} className="mb-6 last:mb-0 relative">
            <span
              className={`absolute left-[-40px] sm:left-[-56px] top-5 h-3.5 w-3.5 rounded-full border-2 border-background z-10 ${colorSolidBg[color]}`}
              aria-hidden="true"
            />
            <div className={`${colorPill[color]} border rounded-lg p-4 sm:p-5`}>
              {entry.period && (
                <span className="block font-mono text-[11px] font-medium uppercase tracking-widest text-ink-secondary mb-1.5">
                  {entry.period}
                </span>
              )}
              <h3 className="font-semibold text-ink mb-1">{entry.title}</h3>
              {(entry.organization || entry.location) && (
                <p className="text-sm text-ink-secondary max-w-[65ch]">
                  {entry.organization}
                  {entry.organization && entry.location ? " · " : ""}
                  {entry.location}
                </p>
              )}
              {entry.detail && (
                <p className="text-xs font-medium text-ink mt-0.5">{entry.detail}</p>
              )}
              <p className="mt-2.5 text-sm text-ink-secondary leading-relaxed max-w-[65ch]">
                {entry.description}
              </p>
              {entry.highlights && entry.highlights.length > 0 && (
                <ul className="mt-3 space-y-1 pl-4 border-l-2 border-black/10">
                  {entry.highlights.map((h: string, j: number) => (
                    <li key={j} className="text-sm text-ink-secondary">
                      • {h}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

