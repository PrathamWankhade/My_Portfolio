import Image from "next/image";
import { ProjectIllustration } from "@/components/project-illustration";
import type { Project } from "@/content/projects";

/**
 * Card artwork. When a project has an `image`, use it edge-to-edge; otherwise
 * fall back to the project's architecture diagram, cropped to fill the card.
 * Either way the parent must be `relative` with a fixed height.
 */
export function ProjectCardVisual({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  if (project.image) {
    return (
      <Image
        src={project.image}
        alt=""
        aria-hidden="true"
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className={`object-cover ${className ?? ""}`}
      />
    );
  }
  return (
    <ProjectIllustration project={project} className={className} />
  );
}
