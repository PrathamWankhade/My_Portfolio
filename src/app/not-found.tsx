import Link from "next/link";

export const metadata = {
  title: "Not Found",
};

export default function NotFound() {
  return (
    <div className="flex flex-col flex-1">
      <section className="flex-1 flex items-center justify-center bg-cobalt-soft">
        <div className="px-6 text-center">
          <div className="text-cobalt font-mono text-[8rem] font-bold leading-none">
            404
          </div>
          <h1 className="editor-text text-editorial font-semibold tracking-tight text-ink mt-6 mb-4">
            This page isn&apos;t here
          </h1>
          <p className="text-lg text-ink-secondary mb-10 max-w-md mx-auto">
            The route you followed doesn&apos;t exist. Everything below is still
            lit.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/" className="px-6 py-3 rounded-xl border border-border bg-surface text-ink font-medium hover:bg-cobalt-soft hover:text-cobalt transition-colors">
              Home
            </Link>
            <Link href="/projects" className="px-6 py-3 rounded-xl border border-border bg-surface text-ink font-medium hover:bg-cobalt-soft hover:text-cobalt transition-colors">
              Projects
            </Link>
            <Link href="/about" className="px-6 py-3 rounded-xl border border-border bg-surface text-ink font-medium hover:bg-cobalt-soft hover:text-cobalt transition-colors">
              About
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
