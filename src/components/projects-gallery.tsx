"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { type Project } from "@/content/projects";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { ProjectIllustration } from "@/components/project-illustration";

/** Stable, editorial ordering for the category filters. */
const TAG_ORDER = ["Offline & mobile", "Computer vision", "AI/ML", "Cybersecurity"];

export function ProjectsGallery({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<string>("All");

  const filters = useMemo(() => {
    const present = new Set(projects.flatMap((p) => p.tags));
    const ordered = TAG_ORDER.filter((t) => present.has(t));
    const extras = [...present].filter((t) => !TAG_ORDER.includes(t));
    return ["All", ...ordered, ...extras];
  }, [projects]);

  const visible =
    active === "All" ? projects : projects.filter((p) => p.tags.includes(active));

  return (
    <div>
      <div
        role="group"
        aria-label="Filter projects by category"
        className="flex flex-wrap gap-2 mb-8"
      >
        {filters.map((filter) => {
          const isActive = filter === active;
          const count =
            filter === "All"
              ? projects.length
              : projects.filter((p) => p.tags.includes(filter)).length;
          return (
            <button
              key={filter}
              type="button"
              onClick={() => setActive(filter)}
              aria-pressed={isActive}
              className={[
                "inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors min-h-[40px]",
                isActive
                  ? "border-cobalt bg-cobalt text-white"
                  : "border-border bg-surface text-ink-secondary hover:text-ink hover:border-cobalt/40",
              ].join(" ")}
            >
              {filter}
              <span
                className={[
                  "font-mono text-[11px]",
                  isActive ? "text-white/70" : "text-muted",
                ].join(" ")}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        {visible.length} of {projects.length} projects shown
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
        {visible.map((project, i) => (
          <div key={project.slug} className="h-full" style={{ animation: `fade-up 0.4s ease ${i * 60}ms both` }}>
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
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
          <ProjectIllustration project={project} className="h-full w-full transition-transform duration-700 group-hover:scale-105" />
        </div>
        <div className="p-5 flex-1 flex flex-col">
          <div className="flex items-start justify-between gap-3 mb-2">
            <CardTitle className="mb-0">{project.name}</CardTitle>
            <Chip variant="outline" size="sm" className="shrink-0">
              {project.status}
            </Chip>
          </div>
          <CardDescription className="mb-4 flex-1">{project.tagline}</CardDescription>
          <div className="mt-auto flex flex-wrap gap-2">
            {project.stack.slice(0, 5).map((skill) => (
              <Chip key={skill} variant="outline" size="sm">{skill}</Chip>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs font-mono text-muted">
            <span>{project.tags.join(" · ")}</span>
            <span aria-hidden="true">·</span>
            <span className="text-cobalt group-hover:text-cobalt/90">Case study →</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
