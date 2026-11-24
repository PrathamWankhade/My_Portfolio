import Image from "next/image";
import { ProjectCover } from "@/components/project-cover";
import type { Project } from "@/content/projects";

/**
 * Card artwork. When a project has an `image`, use it edge-to-edge; otherwise
 * show a bold, text-free cover. The parent must be `relative` with a height.
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
  return <ProjectCover project={project} className={className} />;
}
