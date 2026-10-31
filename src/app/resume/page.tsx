import { experience, skillGroups, achievements, profile } from "@/content/experience";
import { projects } from "@/content/projects";
import { PrintButton } from "@/components/print-button";

export const metadata = {
  title: "Résumé",
  description:
    "Résumé for Pratham Wankhade — AI/ML & full-stack engineer. Experience, education, skills, and selected work.",
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="resume-h2 editor-text text-xs font-semibold tracking-widest text-cobalt uppercase mb-2 border-b border-border pb-1">
      {children}
    </h2>
  );
}

export default function ResumePage() {
  const work = experience.filter((e) => e.type === "work");
  // Degree-level only on the one-page résumé; HSC/SSC stay on the site's experience page.
  const education = experience.filter((e) => e.type === "education" && (e.detail || e.highlights.length > 0));
  const featured = projects.filter((p) => p.featured);
  const awards = achievements.filter((a) => a.kind === "award");
  const certifications = achievements.filter((a) => a.kind === "certification");

  // Résumé skill lines: five compact groups, deduplicated across the site's
  // skill groups (Languages wins) — no skill is ever listed twice.
  const seen = new Set<string>();
  const pick = (name: string) => {
    const group = skillGroups.find((g) => g.name === name);
    if (!group) return [];
    return group.skills.filter((s) => {
      if (seen.has(s)) return false;
      seen.add(s);
      return true;
    });
  };
  const resumeSkillLines = [
    { label: "Languages", skills: pick("Languages") },
    { label: "AI & computer vision", skills: pick("AI & computer vision") },
    { label: "Web & mobile", skills: [...pick("Frontend"), ...pick("Mobile")] },
    { label: "Backend & data", skills: [...pick("Backend & APIs"), ...pick("Databases")] },
    { label: "Tools", skills: pick("Infrastructure & tools") },
  ].filter((l) => l.skills.length > 0);

  return (
    <div className="flex flex-col flex-1">
      <section className="pt-28 pb-14 sm:pt-32 print:p-0">
        <div className="mx-auto max-w-3xl px-6">
          {/* Screen-only action bar */}
          <div className="no-print flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <span className="editor-text text-xs font-semibold tracking-widest text-cobalt uppercase block mb-2">
                Résumé
              </span>
              <p className="text-sm text-ink-secondary max-w-md leading-relaxed">
                The same verified detail as the site — print or save this page
                as a PDF.
              </p>
            </div>
            <PrintButton />
          </div>

          {/* The sheet */}
          <article className="resume-sheet rounded-xl border border-border bg-surface p-7 sm:p-10 shadow-card">
            {/* Header */}
            <header className="mb-2">
              <h1 className="editor-text text-3xl sm:text-[32px] font-semibold tracking-tight text-ink leading-tight">
                {profile.name}
              </h1>
              <p className="resume-role text-coral font-medium mt-1">
                {profile.role}
              </p>
              <p className="mt-2 text-[12.5px] text-ink-secondary leading-tight">
                {profile.location} · {profile.email} · {profile.phone}
                <br />
                {profile.github} · {profile.linkedin} · {profile.site}
              </p>
            </header>

            {/* Summary */}
            <section className="mb-2">
              <SectionTitle>Summary</SectionTitle>
              <p className="resume-p text-[12.5px] text-ink-secondary leading-tight">
                {profile.bio}
              </p>
            </section>

            {/* Experience */}
            <section className="mb-2">
              <SectionTitle>Experience</SectionTitle>
              <div className="space-y-1">
                {work.map((entry) => (
                  <div key={entry.title + entry.organization} className="resume-item">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                      <h3 className="font-semibold text-ink text-[12.5px]">{entry.title}</h3>
                      <span className="font-mono text-[11px] text-muted">{entry.period}</span>
                    </div>
                    <p className="text-[11px] text-cobalt font-medium">
                      {entry.organization} · {entry.location}
                    </p>
                    <p className="resume-p mt-0.5 text-[12.5px] text-ink-secondary leading-tight">
                      {entry.description}
                    </p>
                    {entry.highlights.length > 0 && (
                      <ul className="resume-ul mt-1 space-y-0.5">
                        {entry.highlights.map((h, i) => (
                          <li key={i} className="text-[12.5px] text-ink-secondary leading-tight">
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Education */}
            <section className="mb-2">
              <SectionTitle>Education</SectionTitle>
              <div className="space-y-1">
                {education.map((entry) => (
                  <div key={entry.title + entry.organization} className="resume-item">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                      <h3 className="font-semibold text-ink text-[12.5px]">{entry.title}</h3>
                      <span className="font-mono text-[11px] text-muted">{entry.period}</span>
                    </div>
                    <p className="text-[11px] text-cobalt font-medium">
                      {entry.organization}
                      {entry.location ? ` · ${entry.location}` : ""}
                    </p>
                    {entry.detail && (
                      <p className="text-[11px] font-medium text-ink mt-0.5">{entry.detail}</p>
                    )}
                    {entry.highlights.length > 0 && (
                      <ul className="resume-ul mt-1 space-y-0.5">
                        {entry.highlights.map((h, i) => (
                          <li key={i} className="text-[12.5px] text-ink-secondary leading-tight">
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
            <section className="mb-2">
              <SectionTitle>Skills</SectionTitle>
              <div className="space-y-1">
                {resumeSkillLines.map((group) => (
                  <p key={group.label} className="text-[12.5px] leading-tight">
                    <span className="font-semibold text-ink">{group.label}: </span>
                    <span className="text-ink-secondary">{group.skills.join(", ")}</span>
                  </p>
                ))}
              </div>
            </section>

            {/* Selected open-source work */}
            <section className="mb-2">
              <SectionTitle>Selected open-source work</SectionTitle>
              <div className="space-y-1">
                {featured.map((project) => (
                  <div key={project.slug} className="resume-item">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                      <h3 className="font-semibold text-ink text-[12.5px]">
                        {project.name}
                        <span className="font-mono text-[11px] text-muted font-normal"> — {project.status}</span>
                      </h3>
                      <span className="text-[11px] text-muted font-mono break-all">
                        {project.repo?.replace(/^https?:\/\//, "")}
                      </span>
                    </div>
                    <p className="resume-p text-[12.5px] text-ink-secondary leading-tight">
                      {project.resumeLine ?? project.tagline}.
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Awards & certifications */}
            <section>
              <SectionTitle>Awards & certifications</SectionTitle>
              <ul className="resume-ul space-y-0.5">
                {awards.map((a) => (
                  <li key={a.title} className="text-[12.5px] text-ink-secondary leading-tight">
                    <span className="font-medium text-ink">{a.title}</span> — {a.organization}
                    {a.date ? ` (${a.date})` : ""}
                  </li>
                ))}
                {certifications.map((c) => (
                  <li key={c.title} className="text-[12.5px] text-ink-secondary leading-tight">
                    <span className="font-medium text-ink">{c.title}</span>
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
