import { experience, skillGroups, achievements, talks, profile } from "@/content/experience";
import { projects } from "@/content/projects";
import { PrintButton } from "@/components/print-button";

export const metadata = {
  title: "CV",
  description:
    "Curriculum vitae for Pratham Wankhade — Information Technology graduate. AI/ML, software engineering, and distributed systems: education, experience, projects, skills, certifications, and presentations.",
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="cv-h2 editor-text text-xs font-bold tracking-widest text-cobalt uppercase mb-2.5 border-b border-border pb-1.5">
      {children}
    </h2>
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

  return (
    <div className="flex flex-col flex-1">
      <section className="pt-28 pb-14 sm:pt-32 print:p-0">
        <div className="mx-auto max-w-3xl px-6">
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
          <article className="cv-sheet rounded-xl border border-border bg-surface p-7 sm:p-10 shadow-card">
            {/* Header */}
            <header className="mb-5 print:mb-4">
              <h1 className="editor-text text-3xl sm:text-4xl print:text-2xl font-semibold tracking-tight text-ink leading-tight">
                {profile.name}
              </h1>
              <p className="cv-role text-coral font-medium mt-1">{profile.role}</p>
              <p className="text-[12px] print:text-[11.5px] text-ink-secondary mt-0.5">
                {profile.specialties}
              </p>
              <p className="mt-2 text-[13px] print:text-[12.5px] text-ink-secondary leading-relaxed print:leading-snug">
                {profile.location} · {profile.email} · {profile.phone}
                <br />
                {profile.github} · {profile.linkedin} · {profile.site}
              </p>
            </header>

            {/* Summary */}
            <section className="mb-5 print:mb-2.5">
              <SectionTitle>Profile</SectionTitle>
              <p className="cv-p text-[13px] print:text-[12.5px] text-ink-secondary leading-relaxed print:leading-snug">
                {profile.bio}
              </p>
            </section>

            {/* Education */}
            <section className="mb-5 print:mb-2.5">
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
            <section className="mb-5 print:mb-2.5">
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
            <section className="mb-5 print:mb-2.5">
              <SectionTitle>Projects</SectionTitle>
              <div className="space-y-3.5 print:space-y-2.5">
                {projects.map((project) => (
                  <div key={project.slug} className="cv-item">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                      <h3 className="font-semibold text-ink text-[13px] print:text-[12.5px]">
                        {project.name}
                        <span className="font-mono text-[11px] text-muted font-normal"> — {project.status}</span>
                      </h3>
                      <span className="text-[11px] text-ink-secondary font-mono break-all">
                        {project.repo?.replace(/^https?:\/\//, "")}
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

            {/* Skills */}
            <section className="mb-5 print:mb-2.5">
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
            <section className="mb-5 print:mb-2.5">
              <SectionTitle>Certifications</SectionTitle>
              <ul className="cv-ul space-y-1">
                {certifications.map((c) => (
                  <li key={c.title} className="text-[13px] print:text-[12.5px] text-ink-secondary leading-snug">
                    <span className="font-medium text-ink">{c.title}</span> — {c.organization}
                    {c.description ? `. ${c.description}` : ""}
                  </li>
                ))}
              </ul>
            </section>

            {/* Awards */}
            <section className="mb-5 print:mb-2.5">
              <SectionTitle>Awards & recognition</SectionTitle>
              <ul className="cv-ul space-y-1">
                {awards.map((a) => (
                  <li key={a.title} className="text-[13px] print:text-[12.5px] text-ink-secondary leading-snug">
                    <span className="font-medium text-ink">{a.title}</span> — {a.organization}
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
                    Presented, not published.
                  </li>
                ))}
              </ul>
            </section>
          </article>
        </div>
      </section>
    </div>
  );
}
