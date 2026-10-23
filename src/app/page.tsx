import Link from "next/link";
import { ArrowRight, ScanFace, ShieldCheck, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { ProjectIllustration } from "@/components/project-illustration";
import { Reveal } from "@/components/reveal";
import { getFeaturedProjects, type Project } from "@/content/projects";

export const metadata = {
  title: "Home",
  description:
    "Pratham Wankhade — Software engineer and technology-focused builder. AI, computer vision, security, and offline-first systems.",
};

export default function HomePage() {
  const featured = getFeaturedProjects();
  return (
    <div className="flex flex-col flex-1">
      <Hero />
      <FeaturedWork projects={featured} />
      <AboutSnippet />
      <SkillsPreview />
      <ContactCTA />
    </div>
  );
}

const domains = [
  {
    icon: WifiOff,
    title: "Offline-first systems",
    sub: "OneBit · BLE mesh messaging",
    color: "#1d4ed8",
    soft: "#eff6ff",
    href: "/projects/onebit",
  },
  {
    icon: ScanFace,
    title: "Computer vision",
    sub: "FaceSnap · face verification",
    color: "#ef4444",
    soft: "#fdecea",
    href: "/projects/faceSnap",
  },
  {
    icon: ShieldCheck,
    title: "Security & privacy",
    sub: "AIPFL-IDS · Phishing detection",
    color: "#10b981",
    soft: "#dcfce7",
    href: "/projects",
  },
];

function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36">
      {/* Colorful gradient hero background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-cobalt-soft via-cream to-lavender-soft" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1.06fr_0.94fr] gap-12 lg:gap-16 items-center">
          {/* Left: statement + primary actions */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-cobalt/30 bg-cobalt-soft px-3 py-1 text-cobalt font-mono text-xs font-medium mb-6 rise rise-1">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cobalt opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cobalt"></span>
              </span>
              Now building
            </div>
            <h1 className="editor-text text-[clamp(3.25rem,7vw+0.5rem,4.75rem)] font-semibold leading-[1.04] tracking-tight text-ink mb-6 rise rise-2">
              Software that works
              <br />
              <span className="text-coral italic">when the network doesn&apos;t.</span>
            </h1>
            <p className="text-lg text-ink-secondary leading-relaxed mb-9 max-w-xl rise rise-3">
              I&apos;m Pratham Wankhade, an AI/ML and full-stack engineer based in
              Amravati, Maharashtra, India. I build mesh messaging, face-verified
              attendance, federated intrusion detection, and phishing detection —
              each documented with architecture, trade-offs, and honest limits.
            </p>
            <div className="flex flex-wrap items-center gap-4 rise rise-4">
              <Button asChild size="lg" variant="color" color="cobalt">
                <Link href="/projects">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  Explore the work
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/resume">Résumé</Link>
              </Button>
            </div>
          </div>

          {/* Right: a visual index of the three domains the work spans */}
          <div className="rise rise-3">
            <div className="rounded-2xl border border-border bg-surface/90 backdrop-blur-sm shadow-card p-5 sm:p-6">
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
                  What I build
                </span>
                <span className="flex items-center gap-1.5 font-mono text-[11px] text-emerald">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald" aria-hidden="true" />
                  4 case studies
                </span>
              </div>
              <ul className="space-y-3">
                {domains.map((d) => (
                  <li key={d.title}>
                    <Link
                      href={d.href}
                      className="group flex items-center gap-4 rounded-xl border border-border/70 bg-cream/70 px-4 py-3.5 transition-colors hover:border-cobalt/40 hover:bg-cobalt-soft/40"
                    >
                      <span
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                        style={{ backgroundColor: d.soft, color: d.color }}
                        aria-hidden="true"
                      >
                        <d.icon className="h-5 w-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-medium text-ink text-sm leading-snug">
                          {d.title}
                        </span>
                        <span className="block font-mono text-[11px] text-muted truncate">
                          {d.sub}
                        </span>
                      </span>
                      <ArrowRight
                        className="h-4 w-4 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-cobalt"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedWork({ projects }: { projects: Project[] }) {
  return (
    <section className="py-16 sm:py-20 border-y border-border/50 bg-surface">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="flex items-center justify-between mb-8">
          <div className="editor-text text-heading font-semibold tracking-tight text-ink">
            Featured work
          </div>
          <Link href="/projects" className="inline-flex items-center gap-1 text-sm font-medium text-cobalt hover:text-cobalt/90 transition-colors">
            View all projects <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Reveal>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 90} className="h-full">
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block h-full"
    >
      <Card variant="raised" className="hover:-translate-y-4 hover:border-cobalt hover:shadow-card overflow-hidden h-full flex flex-col">
        <div className="relative h-48 overflow-hidden">
          <ProjectIllustration project={project} className="h-full w-full transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        <div className="p-6 flex-1">
          <CardTitle className="mb-2">{project.name}</CardTitle>
          <CardDescription>{project.tagline}</CardDescription>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.slice(0, 4).map((skill) => (
              <Chip key={skill} variant="outline">{skill}</Chip>
            ))}
            {project.stack.length > 4 && (
              <Chip variant="outline" className="text-muted">
                +{project.stack.length - 4}
              </Chip>
            )}
          </div>
        </div>
        <CardFooter className="bg-transparent border-t-0 pt-0 pb-0">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-muted">Case study</span>
            <ArrowRight className="h-3.5 w-3.5 text-ink-secondary group-hover:text-cobalt transition-colors" aria-hidden="true" />
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}

function AboutSnippet() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <Reveal className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-cobalt via-coral to-tangerine rounded-xl blur opacity-30" />
            <div className="relative rounded-xl border border-border bg-surface p-8 md:p-10 shadow-card">
              <h2 className="editor-text text-editorial font-semibold tracking-tight text-ink mb-4">
                The quiet chapter
                <br />
                <span className="text-coral italic">after the opening credits</span>
              </h2>
              <p className="text-body text-ink-secondary leading-relaxed">
                I&apos;m Pratham Wankhade — AI/ML and full-stack engineer,
                builder, and occasional writer. I document systems with the same
                care I use to build them: architecture, trade-offs, and honest
                limits.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120} className="space-y-6">
            <h3 className="editor-text text-heading font-semibold tracking-tight text-ink">
              What I build
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cobalt-soft text-cobalt shrink-0">
                  <ScanFace className="h-4 w-4" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="font-medium text-ink">AI &amp; computer vision</h4>
                  <p className="text-sm text-ink-secondary">
                    Face detection, recognition, and the ethics of automated
                    identification.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-coral-soft text-coral shrink-0">
                  <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="font-medium text-ink">Security &amp; privacy</h4>
                  <p className="text-sm text-ink-secondary">
                    Federated learning, encryption, threat modeling.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-soft text-emerald shrink-0">
                  <WifiOff className="h-4 w-4" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="font-medium text-ink">Offline-first systems</h4>
                  <p className="text-sm text-ink-secondary">
                    Apps that work without a network and sync on reconnect.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function SkillsPreview() {
  const allSkills = [
    "Python", "TypeScript", "Dart", "Flutter", "React",
    "Next.js", "FastAPI", "TensorFlow", "PyTorch", "Docker",
  ];
  return (
    <section className="py-16 sm:py-20 bg-cobalt-soft border-y border-cobalt/20">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="flex items-center justify-between mb-8">
          <div className="editor-text text-heading font-semibold tracking-tight text-ink">
            Technical capabilities
          </div>
          <Link href="/skills" className="inline-flex items-center gap-1 text-sm font-medium text-cobalt hover:text-cobalt/90 transition-colors">
            View all skills <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Reveal>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {allSkills.map((skill, i) => (
            <Reveal key={skill} delay={i * 45}>
              <Chip variant="color" color="cobalt" size="md" className="w-full justify-center">
                {skill}
              </Chip>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactCTA() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <Reveal className="rounded-2xl border border-border bg-gradient-to-b from-coral-soft via-tangerine-soft to-lavender-soft p-10 md:p-14 shadow-card">
          <h2 className="editor-text text-editorial font-semibold tracking-tight text-ink mb-4">
            Working on something?
          </h2>
          <p className="text-body text-ink-secondary leading-relaxed mb-8 max-w-lg mx-auto">
            Recruiting, collaboration, or a question about any of the projects —
            write directly. I reply thoughtfully when the question is specific.
          </p>
          <Button asChild size="lg" variant="color" color="coral">
            <Link href="/contact">Get in touch</Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
