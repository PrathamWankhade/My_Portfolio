"use client";

import { useState } from "react";
import { Send, ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const RECIPIENT = "prathamwankhade2004@gmail.com";

type Status = "idle" | "opening" | "opened";

/**
 * Honest contact form: there is no backend, so submitting composes a
 * pre-filled message and hands it to the visitor's own email app.
 * Nothing is sent silently and nothing is stored here.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const subject = String(data.get("subject") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const body = [
      message,
      "",
      "—",
      `From: ${name} <${email}>`,
    ].join("\n");

    const mailto = `mailto:${RECIPIENT}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    setStatus("opening");
    window.location.href = mailto;
    // The mail client may open in-app or in the background; reflect that
    // honestly rather than claiming a message was delivered.
    window.setTimeout(() => setStatus("opened"), 1200);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-ink mb-2">
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          autoComplete="name"
          className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-ink focus:outline-none focus:ring-2 focus:ring-cobalt transition-all"
          placeholder="Your name"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-ink mb-2">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-ink focus:outline-none focus:ring-2 focus:ring-cobalt transition-all"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-ink mb-2">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          required
          className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-ink focus:outline-none focus:ring-2 focus:ring-cobalt transition-all"
          placeholder="What&apos;s this about?"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-ink mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-ink focus:outline-none focus:ring-2 focus:ring-cobalt transition-all"
          placeholder="Tell me about your project or question..."
        />
      </div>

      <div className="rounded-lg border border-border bg-surface-raised p-4 text-sm text-ink-secondary leading-relaxed">
        This page has no backend. Submitting opens your own email app with the
        message pre-filled to{" "}
        <a
          href={`mailto:${RECIPIENT}`}
          className="font-medium text-cobalt underline underline-offset-2"
        >
          {RECIPIENT}
        </a>{" "}
        — nothing is uploaded or stored here.
      </div>

      <Button
        type="submit"
        disabled={status === "opening"}
        variant="color"
        color="coral"
        className="w-full"
      >
        {status === "opening" ? (
          <>
            Opening your email app…
            <ArrowRight className="ml-2 h-4 w-4 animate-pulse" aria-hidden="true" />
          </>
        ) : (
          <>
            Compose in email
            <Send className="ml-2 h-4 w-4" aria-hidden="true" />
          </>
        )}
      </Button>

      <div aria-live="polite">
        {status === "opened" && (
          <div className="flex gap-3 rounded-lg border border-emerald/30 bg-emerald-soft p-4 text-emerald">
            <Mail className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <div>
              <p className="font-medium text-emerald">
                Your email app should have opened.
              </p>
              <p className="text-sm text-emerald mt-1">
                If nothing opened, write directly to{" "}
                <a
                  href={`mailto:${RECIPIENT}`}
                  className="underline underline-offset-2"
                >
                  {RECIPIENT}
                </a>
                .
              </p>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
