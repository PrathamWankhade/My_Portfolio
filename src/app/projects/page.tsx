import Link from "next/link";
import { projects, type Project } from "@/content/projects";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { ProjectVisual } from "@/components/project-visual";
import { Reveal } from "@/components/reveal";

export const metadata = {
  title: "Projects",
  description: "A gallery of original projects — OneBit, FaceSnap, AIPFL-IDS, and phishing detection.",
};

export default function ProjectsPage() {
  return (
    <div className="flex flex-col flex-1">
      <section className="pt-28 pb-12 sm:pt-32 sm:pb-14">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <span className="editor-text text-xs font-semibold tracking-widest text-cobalt uppercase mb-4 block">
            Gallery
          </span>
          <h1 className="editor-text text-display font-semibold leading-[1.04] tracking-tight text-ink mb-6">
            Original work
            <br />
            <span className="text-coral italic">each with documented limits</span>
          </h1>
          <p className="text-lg text-ink-secondary leading-relaxed max-w-lg mx-auto">
            Four projects where imagination meets intelligence — Bluetooth mesh
            messaging, face-verified attendance, federated intrusion detection,
            and phishing detection. Every metric carries its conditions; every
            simulation is labeled as one.
          </p>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            {projects.map((project, i) => (
              <Reveal key={project.slug} delay={(i % 2) * 90} className="h-full">
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block h-full"
    >
      <Card variant="bordered" className="hover:-translate-y-4 hover:border-cobalt hover:shadow-card overflow-hidden flex flex-col h-full">
        <div className="relative h-48 shrink-0 overflow-hidden">
          <ProjectVisual project={project} className="h-full w-full transition-transform duration-700 group-hover:scale-105" />
        </div>
        <div className="p-5 flex-1 flex flex-col">
          <CardTitle className="mb-2">{project.name}</CardTitle>
          <CardDescription className="mb-4 flex-1">{project.tagline}</CardDescription>
          <div className="mt-auto flex flex-wrap gap-2">
            {project.stack.slice(0, 5).map((skill) => (
              <Chip key={skill} variant="outline" size="sm">{skill}</Chip>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs font-mono text-muted">
            <span>{project.status}</span>
            <span aria-hidden="true">·</span>
            <span className="text-cobalt group-hover:text-cobalt/90">Case study →</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
