import { cn } from "@/lib/cn";
import { colorHex, type ColorName } from "@/lib/color-classes";

type ProjectVisualProject = {
  slug: string;
  name: string;
  color: ColorName;
};

function initialsOf(name: string) {
  return name
    .split(/[\s-]+/)
    .map((word) => word.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/**
 * Art-directed project plate — layered tint, hatch, dot grid and a serif
 * monogram. Original CSS composition (no stock photography), so every card
 * stays honest and loads instantly.
 */
export function ProjectVisual({
  project,
  className,
}: {
  project: ProjectVisualProject;
  className?: string;
}) {
  const hex = colorHex[project.color];

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      aria-hidden="true"
    >
      {/* Base tint */}
      <div className="absolute inset-0 bg-surface-raised" />

      {/* Accent wash */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(120% 120% at 12% 0%, ${hex} 0%, transparent 60%)`,
          opacity: 0.9,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, transparent 35%, rgba(124, 58, 237, 0.35) 100%)",
        }}
      />

      {/* Diagonal hatch */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(135deg, rgba(255,255,255,0.14) 0px, rgba(255,255,255,0.14) 1px, transparent 1px, transparent 9px)`,
        }}
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
          backgroundPosition: "6px 6px",
        }}
      />

      {/* Signal bars — a small nod to the project's telemetry */}
      <div className="absolute bottom-5 left-5 flex items-end gap-1.5">
        {[18, 30, 14, 42, 26].map((height, i) => (
          <span
            key={i}
            className="w-1.5 rounded-full bg-white/70"
            style={{ height: `${height}px` }}
          />
        ))}
      </div>

      {/* Monogram */}
      <span className="editor-text absolute bottom-2 right-4 select-none text-[5.5rem] font-semibold leading-none text-white/30 sm:text-[7rem]">
        {initialsOf(project.name)}
      </span>

      {/* Hairline frame */}
      <div className="absolute inset-0 ring-1 ring-inset ring-white/25" />
    </div>
  );
}
