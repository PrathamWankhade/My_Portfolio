import Link from "next/link";
import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, getProject } from "@/content/projects";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { Reveal } from "@/components/reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return { title: "Project not found" };
  }

  return {
    title: `${project.name} — Case study`,
    description: project.tagline,
  };
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

/**
 * The shell ships instantly; slug-dependent content streams in behind
 * <Suspense> so navigation is never blocked on URL data.
 * See: nextjs.org/docs/messages/instant-shell-url-data
 */
export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <div className="flex flex-col flex-1">
      <Suspense fallback={<CaseStudySkeleton />}>
        <CaseStudy params={params} />
      </Suspense>
    </div>
  );
}

function CaseStudySkeleton() {
  return (
    <>
      <section className="pt-28 pb-14 sm:pt-32" aria-busy="true">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl animate-pulse">
            <div className="mb-6 h-6 w-24 rounded-full bg-surface-raised" />
            <div className="mb-6 h-16 w-3/4 rounded-lg bg-surface-raised" />
            <div className="mb-8 h-6 w-full rounded bg-surface-raised" />
            <div className="h-6 w-48 rounded bg-surface-raised" />
          </div>
        </div>
      </section>
      <div className="sr-only" role="status">
        Loading case study…
      </div>
    </>
  );
}

async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-14 sm:pt-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <span className="rise rise-1 inline-flex items-center gap-1 rounded-full border border-border bg-surface-raised px-3 py-1 font-mono text-xs font-medium text-ink-secondary mb-6">
              {project.status}
            </span>
            <h1 className="rise rise-2 editor-text text-display font-semibold leading-[1.02] tracking-tight text-ink mb-6">
              {project.name}
            </h1>
            <p className="rise rise-3 text-lg text-ink-secondary leading-relaxed mb-8 max-w-xl">
              {project.tagline}
            </p>
            <div className="rise rise-4 flex flex-wrap gap-3">
              {project.repo && (
                <Button asChild variant="outline" size="sm">
                  <Link
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View repository
                  </Link>
                </Button>
              )}
              {project.demo && (
                <Button asChild size="sm">
                  <Link href={project.demo}>Live demo</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 border-y border-border/50">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal className="mb-10">
            <div className="editor-text text-xs font-semibold tracking-widest text-cobalt uppercase mb-4 block">
              Problem
            </div>
            <p className="border-l-[3px] border-coral pl-5 sm:pl-7 text-lg text-ink-secondary leading-relaxed">
              {project.problem}
            </p>
          </Reveal>

          <Reveal className="mb-10" delay={60}>
            <div className="editor-text text-xs font-semibold tracking-widest text-cobalt uppercase mb-4 block">
              Objectives
            </div>
            <ul className="space-y-3">
              {project.objectives.map((obj, i) => (
                <li key={i} className="flex gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border text-cobalt font-mono text-sm">
                    {i + 1}
                  </div>
                  <p className="text-body text-ink-secondary leading-relaxed">{obj}</p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="mb-10" delay={60}>
            <div className="editor-text text-xs font-semibold tracking-widest text-cobalt uppercase mb-4 block">
              Technologies
            </div>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((skill) => (
                <Chip key={skill} variant="outline">{skill}</Chip>
              ))}
            </div>
          </Reveal>

          <Reveal delay={60}>
            <div className="editor-text text-xs font-semibold tracking-widest text-cobalt uppercase mb-4 block">
              Metrics
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(project.metrics ?? []).map((m) => (
                <Card key={m.label} variant="bordered" padded={false} className="p-5">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="editor-text text-lg font-semibold text-ink">{m.value}</span>
                    <span className="text-xs font-mono text-muted">{m.label}</span>
                  </div>
                  <p className="text-xs text-ink-secondary leading-relaxed">{m.condition}</p>
                </Card>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-6 space-y-10">
          <Reveal>
            <div className="editor-text text-xs font-semibold tracking-widest text-cobalt uppercase mb-4 block">
              Architecture
            </div>
            <Card variant="bordered" padded={false} className="p-6 md:p-8">
              <p className="text-body text-ink-secondary leading-relaxed">
                {project.architecture}
              </p>
            </Card>
          </Reveal>

          <Reveal delay={60}>
            <div className="editor-text text-xs font-semibold tracking-widest text-cobalt uppercase mb-4 block">
              Implementation
            </div>
            <Card variant="bordered" padded={false} className="p-6 md:p-8">
              <p className="text-body text-ink-secondary leading-relaxed">
                {project.implementation}
              </p>
            </Card>
          </Reveal>

          <Reveal delay={60}>
            <div className="editor-text text-xs font-semibold tracking-widest text-cobalt uppercase mb-4 block">
              Challenges
            </div>
            <ul className="space-y-3">
              {project.challenges.map((challenge, i) => (
                <li key={i} className="flex gap-3 text-body text-ink-secondary leading-relaxed">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-border text-cobalt font-mono text-[10px]">
                    {i + 1}
                  </span>
                  {challenge}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={60}>
            <div className="editor-text text-xs font-semibold tracking-widest text-cobalt uppercase mb-4 block">
              Outcomes
            </div>
            <ul className="space-y-3">
              {project.outcomes.map((outcome, i) => (
                <li key={i} className="flex gap-3 text-body text-ink-secondary leading-relaxed">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-border text-emerald font-mono text-[10px]">
                    {i + 1}
                  </span>
                  {outcome}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="pt-14 pb-20 sm:pt-16 sm:pb-24 border-t border-border/50">
        <div className="mx-auto max-w-4xl px-6 flex flex-wrap items-center justify-between gap-4">
          <Button asChild variant="outline">
            <Link href="/projects">← Back to projects</Link>
          </Button>
          {project.repo && (
            <Button asChild variant="color" color="cobalt">
              <Link href={project.repo} target="_blank" rel="noopener noreferrer">
                View repository
              </Link>
            </Button>
          )}
        </div>
      </section>
    </>
  );
}
