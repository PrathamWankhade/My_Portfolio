import { projects } from "@/content/projects";
import { ProjectsGallery } from "@/components/projects-gallery";

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
          <ProjectsGallery projects={projects} />
        </div>
      </section>
    </div>
  );
}
