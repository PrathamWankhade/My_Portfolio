import Link from "next/link";
import { skillGroups } from "@/content/experience";
import { getProject } from "@/content/projects";
import { Card, CardTitle } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { Reveal } from "@/components/reveal";

export const metadata = {
  title: "Skills",
  description: "Programming languages, frameworks, tools, and engineering capabilities — linked to the projects where each was used.",
};

const levelColors: Record<"working" | "proficient" | "expert", "cobalt" | "coral" | "emerald"> = {
  working: "cobalt",
  proficient: "coral",
  expert: "emerald",
};

const levelLabels: Record<string, string> = {
  working: "Working knowledge",
  proficient: "Proficient",
  expert: "Expert",
};

export default function SkillsPage() {
  return (
    <div className="flex flex-col flex-1">
      <section className="pt-28 pb-14 sm:pt-32">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <span className="editor-text text-xs font-semibold tracking-widest text-cobalt uppercase mb-4 block">
            Capabilities
          </span>
          <h1 className="editor-text text-display font-semibold leading-[1.04] tracking-tight text-ink mb-6">
            Technical skills
          </h1>
          <p className="text-lg text-ink-secondary leading-relaxed max-w-lg mx-auto">
            Grouped by practical use — and each group links to the projects
            where those skills were actually applied, so the depth is
            verifiable.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-16 border-t border-border/50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {skillGroups.map((group, i) => (
              <Reveal key={group.name} delay={(i % 2) * 90} className="h-full">
                <Card
                  variant="bordered"
                  className="hover-card p-6 md:p-8 h-full"
                >
                  <div className="flex items-center justify-between mb-5">
                    <CardTitle as="h2" className="mb-0">{group.name}</CardTitle>
                    <Chip
                      variant="color"
                      color={levelColors[group.level as keyof typeof levelColors]}
                      size="sm"
                    >
                      {levelLabels[group.level]}
                    </Chip>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {group.skills.map((skill) => (
                      <Chip key={skill} variant="default">
                        {skill}
                      </Chip>
                    ))}
                  </div>

                  {/* Evidence: where these skills were applied */}
                  {group.usedIn && group.usedIn.length > 0 && (
                    <div className="mt-5 pt-4 border-t border-border/60">
                      <span className="text-[11px] font-mono uppercase tracking-widest text-muted block mb-2.5">
                        Used in
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {group.usedIn.map((slug) => {
                          const project = getProject(slug);
                          if (!project) return null;
                          return (
                            <Link
                              key={slug}
                              href={`/projects/${slug}`}
                              className="group inline-flex items-center gap-1 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-ink-secondary transition-colors hover:border-cobalt hover:text-cobalt min-h-[32px]"
                            >
                              {project.name}
                              <span
                                className="text-muted transition-transform group-hover:translate-x-0.5"
                                aria-hidden="true"
                              >
                                →
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
