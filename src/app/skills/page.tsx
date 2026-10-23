import { skillGroups } from "@/content/experience";
import { Card, CardTitle } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { Reveal } from "@/components/reveal";

export const metadata = {
  title: "Skills",
  description: "Programming languages, frameworks, tools, and engineering capabilities.",
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
            Languages, frameworks, tools, and engineering capabilities I work
            with — grouped by depth of experience.
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
                    <CardTitle className="mb-0">{group.name}</CardTitle>
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
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
