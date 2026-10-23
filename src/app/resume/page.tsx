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
    <h2 className="resume-h2 editor-text text-xs font-semibold tracking-widest text-cobalt uppercase mb-3 border-b border-border pb-2">
      {children}
    </h2>
  );
}

export default function ResumePage() {
  const work = experience.filter((e) => e.type === "work");
  const education = experience.filter((e) => e.type === "education");
  const featured = projects.filter((p) => p.featured);

  return (
    <div className="flex flex-col flex-1">
      <section className="pt-28 pb-14 sm:pt-32">
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
            <header className="mb-6">
              <h1 className="editor-text text-3xl sm:text-4xl font-semibold tracking-tight text-ink leading-tight">
                {profile.name}
              </h1>
              <p className="text-coral font-medium mt-1">{profile.role}</p>
              <p className="mt-3 text-sm text-ink-secondary leading-relaxed">
                {profile.location} · {profile.email} · {profile.phone}
                <br />
                github.com/PrathamWankhade · linkedin.com/in/pratham-wankhade
              </p>
            </header>

            {/* Summary */}
            <section className="mb-6">
              <SectionTitle>Summary</SectionTitle>
              <p className="resume-p text-sm text-ink-secondary leading-relaxed">
                {profile.bio}
              </p>
            </section>

            {/* Experience */}
            <section className="mb-6">
              <SectionTitle>Experience</SectionTitle>
              <div className="space-y-4">
                {work.map((entry) => (
                  <div key={entry.title + entry.organization} className="resume-item">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                      <h3 className="font-semibold text-ink text-sm">{entry.title}</h3>
                      <span className="font-mono text-[11px] text-muted">{entry.period}</span>
                    </div>
                    <p className="text-xs text-cobalt font-medium">
                      {entry.organization} · {entry.location}
                    </p>
                    <p className="resume-p mt-1 text-sm text-ink-secondary leading-relaxed">
                      {entry.description}
                    </p>
                    {entry.highlights.length > 0 && (
                      <ul className="mt-1.5 space-y-0.5">
                        {entry.highlights.map((h, i) => (
                          <li key={i} className="text-sm text-ink-secondary leading-snug pl-4 relative">
                            <span className="absolute left-0 top-2 h-1 w-1 rounded-full bg-cobalt" aria-hidden="true" />
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
            <section className="mb-6">
              <SectionTitle>Education</SectionTitle>
              <div className="space-y-4">
                {education.map((entry) => (
                  <div key={entry.title + entry.organization} className="resume-item">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                      <h3 className="font-semibold text-ink text-sm">{entry.title}</h3>
                      <span className="font-mono text-[11px] text-muted">{entry.period}</span>
                    </div>
                    <p className="text-xs text-cobalt font-medium">
                      {entry.organization}
                    </p>
                    <p className="resume-p mt-1 text-sm text-ink-secondary leading-relaxed">
                      {entry.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Skills */}
            <section className="mb-6">
              <SectionTitle>Skills</SectionTitle>
              <div className="space-y-2">
                {skillGroups.map((group) => (
                  <p key={group.name} className="text-sm leading-relaxed">
                    <span className="font-semibold text-ink">{group.name}: </span>
                    <span className="text-ink-secondary">{group.skills.join(", ")}</span>
                  </p>
                ))}
              </div>
            </section>

            {/* Selected work */}
            <section className="mb-6">
              <SectionTitle>Selected work</SectionTitle>
              <div className="space-y-3">
                {featured.map((project) => (
                  <div key={project.slug} className="resume-item">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                      <h3 className="font-semibold text-ink text-sm">{project.name}</h3>
                      <span className="font-mono text-[11px] text-muted">{project.status}</span>
                    </div>
                    <p className="resume-p text-sm text-ink-secondary leading-relaxed">
                      {project.tagline}
                    </p>
                    <p className="text-xs text-muted font-mono mt-0.5 break-all">
                      github.com/PrathamWankhade
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Achievements */}
            <section>
              <SectionTitle>Certifications & recognition</SectionTitle>
              <ul className="space-y-1.5">
                {achievements.map((a) => (
                  <li key={a.title} className="text-sm text-ink-secondary leading-snug">
                    <span className="font-medium text-ink">{a.title}</span> — {a.organization} ({a.date})
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
