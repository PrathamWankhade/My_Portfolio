import { experience, skillGroups, achievements, talks, profile } from "@/content/experience";
import { projects } from "@/content/projects";
import { publications, authorPositionLabel } from "@/content/publications";
import { PrintButton } from "@/components/print-button";

export const metadata = {
  title: "CV",
  description:
    "Curriculum vitae for Pratham Wankhade — Information Technology graduate. AI/ML, software engineering, and distributed systems: education, experience, projects, publication, skills, certifications, and presentations.",
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="cv-h2 editor-text text-xs font-bold tracking-widest text-cobalt uppercase mb-2.5 border-b border-border pb-1.5">
      {children}
    </h2>
  );
}

/** Turn a display value like "github.com/PrathamWankhade" into a real URL. */
function asUrl(value: string) {
  return /^[a-z][a-z0-9+.-]*:/i.test(value) ? value : `https://${value}`;
}

/**
 * Links stay clickable on screen and in the saved PDF (Chromium keeps the
 * anchor as a link annotation). The underline is the print affordance — a
 * bare coloured word would not read as a link on paper.
 */
function CvLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`underline decoration-1 underline-offset-2 decoration-ink-secondary/50 hover:text-cobalt hover:decoration-cobalt transition-colors print:decoration-ink-secondary/70 ${className}`}
    >
      {children}
    </a>
  );
}

export default function CvPage() {
  const work = experience.filter((e) => e.type === "work");
  const education = experience.filter((e) => e.type === "education");
  const awards = achievements.filter((a) => a.kind === "award");
  const certifications = achievements.filter((a) => a.kind === "certification");

  // Skills, deduplicated across groups (Languages wins) — no skill listed twice.
  const seen = new Set<string>();
  const skillLines = skillGroups
    .map((g) => ({
      name: g.name,
      skills: g.skills.filter((s) => {
        if (seen.has(s)) return false;
        seen.add(s);
        return true;
      }),
    }))
    .filter((g) => g.skills.length > 0);

  // CV-only order: lead with the strongest applied-ML evidence. The site
  // keeps its own narrative order; this is a presentation choice.
  const cvProjectOrder = [
    "hive",
    "phishguard",
    "faceSnap",
    "outpost",
    "onebit",
  ];
  const rank = (slug: string) => {
    const i = cvProjectOrder.indexOf(slug);
    return i === -1 ? cvProjectOrder.length : i;
  };
  const cvProjects = [...projects].sort((a, b) => rank(a.slug) - rank(b.slug));

  return (
    <div className="flex flex-col flex-1">
      <section className="pt-28 pb-14 sm:pt-32 print:p-0">
        <div className="mx-auto w-full max-w-[calc(210mm+3rem)] px-6 print:max-w-none print:p-0">
          {/* Screen-only action bar */}
          <div className="no-print flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <span className="editor-text text-xs font-semibold tracking-widest text-cobalt uppercase block mb-2">
                Curriculum Vitae
              </span>
              <p className="text-sm text-ink-secondary max-w-md leading-relaxed">
                The full record — education, internships, every project with its
                stack and limits, skills, certifications, and talks. Save or
                print it as a PDF.
              </p>
            </div>
            <PrintButton />
          </div>

          {/* The sheet */}
          <article className="cv-sheet mx-auto w-full max-w-[210mm] rounded-xl border border-border bg-surface px-6 py-8 sm:px-[10mm] sm:py-[12mm] shadow-card">
            {/* Header — centred like a printed A4 CV */}
            <header className="mb-5 print:mb-4 text-center">
              <h1 className="editor-text text-3xl sm:text-4xl print:text-2xl font-semibold tracking-tight text-ink leading-tight">
                {profile.name}
              </h1>
              <p className="cv-role text-coral font-medium mt-1">{profile.role}</p>
              <p className="text-[12px] print:text-[11.5px] text-ink-secondary mt-1">
                {profile.specialties}
              </p>
              <p className="mt-3 text-[13px] print:text-[12.5px] text-ink-secondary leading-relaxed print:leading-snug">
                {profile.location} ·{" "}
                <CvLink href={`mailto:${profile.email}`}>{profile.email}</CvLink>{" "}
                ·{" "}
                <CvLink href={`tel:${profile.phone.replace(/[^\d+]/g, "")}`}>
                  {profile.phone}
                </CvLink>
                <br />
                <CvLink href={asUrl(profile.github)}>{profile.github}</CvLink>{" "}
                ·{" "}
                <CvLink href={asUrl(profile.linkedin)}>{profile.linkedin}</CvLink>{" "}
                · <CvLink href={asUrl(profile.site)}>{profile.site}</CvLink>
              </p>
            </header>

            <div className="cv-body">

            {/* Summary */}
            <section className="mb-5 print:mb-1.5">
              <SectionTitle>Profile</SectionTitle>
              <p className="cv-p text-[13px] print:text-[12.5px] text-ink-secondary leading-relaxed print:leading-snug">
                {profile.bio}
              </p>
            </section>

            {/* Education */}
            <section className="mb-5 print:mb-1.5">
              <SectionTitle>Education</SectionTitle>
              <div className="space-y-3 print:space-y-2">
                {education.map((entry) => (
                  <div key={entry.title + entry.organization} className="cv-item">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                      <h3 className="font-semibold text-ink text-[13px] print:text-[12.5px]">{entry.title}</h3>
                      <span className="font-mono text-[11px] text-muted">{entry.period}</span>
                    </div>
                    <p className="text-[11px] text-cobalt font-medium">
                      {entry.organization}
                      {entry.location ? ` · ${entry.location}` : ""}
                    </p>
                    {entry.detail && (
                      <p className="text-[11px] font-medium text-ink mt-0.5">{entry.detail}</p>
                    )}
                    {entry.description && (
                      <p className="cv-p mt-0.5 text-[13px] print:text-[12.5px] text-ink-secondary leading-relaxed print:leading-snug">
                        {entry.description}
                      </p>
                    )}
                    {entry.highlights.length > 0 && (
                      <ul className="cv-ul mt-1 space-y-0.5">
                        {entry.highlights.map((h, i) => (
                          <li key={i} className="text-[13px] print:text-[12.5px] text-ink-secondary leading-snug">
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Experience */}
            <section className="mb-5 print:mb-1.5">
              <SectionTitle>Experience</SectionTitle>
              <div className="space-y-3 print:space-y-2">
                {work.map((entry) => (
                  <div key={entry.title + entry.organization} className="cv-item">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                      <h3 className="font-semibold text-ink text-[13px] print:text-[12.5px]">{entry.title}</h3>
                      <span className="font-mono text-[11px] text-muted">{entry.period}</span>
                    </div>
                    <p className="text-[11px] text-cobalt font-medium">
                      {entry.organization} · {entry.location}
                    </p>
                    {entry.description && (
                      <p className="cv-p mt-0.5 text-[13px] print:text-[12.5px] text-ink-secondary leading-relaxed print:leading-snug">
                        {entry.description}
                      </p>
                    )}
                    {entry.highlights.length > 0 && (
                      <ul className="cv-ul mt-1 space-y-0.5">
                        {entry.highlights.map((h, i) => (
                          <li key={i} className="text-[13px] print:text-[12.5px] text-ink-secondary leading-snug">
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Projects */}
            <section className="mb-5 print:mb-1.5">
              <SectionTitle>Projects</SectionTitle>
              <div className="space-y-3.5 print:space-y-2">
                {cvProjects.map((project) => (
                  <div key={project.slug} className="cv-item">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                      <h3 className="font-semibold text-ink text-[13px] print:text-[12.5px]">
                        {project.name}
                        <span className="font-mono text-[11px] text-muted font-normal"> — {project.status}</span>
                      </h3>
                      <span className="text-[11px] text-ink-secondary font-mono break-all">
                        {project.repo && (
                          <CvLink href={project.repo}>
                            {project.repo.replace(/^https?:\/\//, "")}
                          </CvLink>
                        )}
                      </span>
                    </div>
                    <p className="text-[11px] text-cobalt font-medium">
                      {project.stack.join(" · ")}
                    </p>
                    <p className="cv-p mt-0.5 text-[13px] print:text-[12.5px] text-ink-secondary leading-relaxed print:leading-snug">
                      {project.tagline}.
                    </p>
                    {project.cvHighlights && (
                      <ul className="cv-ul mt-1 space-y-0.5">
                        {project.cvHighlights.map((h, i) => (
                          <li key={i} className="text-[13px] print:text-[12.5px] text-ink-secondary leading-snug">
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Publication */}
            <section className="mb-5 print:mb-1.5">
              <SectionTitle>Publication</SectionTitle>
              <ul className="cv-ul space-y-1">
                {publications.map((p) => (
                  <li key={p.doi} className="text-[13px] print:text-[12.5px] text-ink-secondary leading-snug">
                    <span className="font-medium text-ink">
                      <CvLink href={p.url}>{p.title}</CvLink>
                    </span>{" "}
                    — Springer, ICAIA 2025, pp. {p.pages}. Co-author (
                    {authorPositionLabel(p.authorPosition, p.authors.length)}
                    ); {p.reportedResult.value} accuracy in optimal conditions.{" "}
                    <CvLink href={p.scholar}>Google Scholar</CvLink>
                  </li>
                ))}
              </ul>
            </section>

            {/* Skills */}
            <section className="mb-5 print:mb-1.5">
              <SectionTitle>Technical skills</SectionTitle>
              <div className="space-y-1">
                {skillLines.map((group) => (
                  <p key={group.name} className="text-[13px] print:text-[12.5px] leading-snug">
                    <span className="font-semibold text-ink">{group.name}: </span>
                    <span className="text-ink-secondary">{group.skills.join(", ")}</span>
                  </p>
                ))}
              </div>
            </section>

            {/* Certifications */}
            <section className="mb-5 print:mb-1.5">
              <SectionTitle>Certifications</SectionTitle>
              <ul className="cv-ul space-y-1">
                {certifications.map((c) => (
                  <li key={c.title} className="text-[13px] print:text-[12.5px] text-ink-secondary leading-snug">
                    <span className="font-medium text-ink">
                      {c.url ? <CvLink href={c.url}>{c.title}</CvLink> : c.title}
                    </span>{" "}
                    — {c.organization}
                  </li>
                ))}
              </ul>
            </section>

            {/* Awards */}
            <section className="mb-5 print:mb-1.5">
              <SectionTitle>Awards & recognition</SectionTitle>
              <ul className="cv-ul space-y-1">
                {awards.map((a) => (
                  <li key={a.title} className="text-[13px] print:text-[12.5px] text-ink-secondary leading-snug">
                    <span className="font-medium text-ink">
                      {a.url ? <CvLink href={a.url}>{a.title}</CvLink> : a.title}
                    </span>{" "}
                    — {a.organization}
                    {a.date ? ` (${a.date})` : ""}. {a.description}
                  </li>
                ))}
              </ul>
            </section>

            {/* Presentations */}
            <section>
              <SectionTitle>Presentations</SectionTitle>
              <ul className="cv-ul space-y-1">
                {talks.map((t) => (
                  <li key={t.title} className="text-[13px] print:text-[12.5px] text-ink-secondary leading-snug">
                    <span className="font-medium text-ink">{t.title}</span> — {t.event} ({t.date}).
                  </li>
                ))}
              </ul>
            </section>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
