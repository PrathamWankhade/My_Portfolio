"use client";

import { useState } from "react";
import { Send, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const RECIPIENT = "prathamwankhade2004@gmail.com";

type Status = "idle" | "sending" | "success" | "error";

type FieldErrors = Partial<Record<"name" | "email" | "subject" | "message", string>>;

const FIELDS = ["name", "email", "subject", "message"] as const;

/**
 * Posts to /api/contact, which relays the message through Resend.
 * The visitor's email address is never shown on the page; it is only
 * used as the reply-to on the delivered mail.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [fallback, setFallback] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      subject: String(data.get("subject") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
      website: String(data.get("website") ?? ""),
    };

    // Clear stale feedback, then check locally so the visitor isn't
    // charged a round-trip for an obviously empty field.
    setError(null);
    setFieldErrors({});
    setFallback(false);

    const local: FieldErrors = {};
    for (const key of FIELDS) {
      if (!payload[key]) local[key] = "This field is required.";
    }
    if (Object.keys(local).length > 0) {
      setFieldErrors(local);
      setStatus("error");
      setError("Please fill in the highlighted fields.");
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json().catch(() => null)) as
        | { ok?: boolean; error?: string; fields?: FieldErrors; code?: string }
        | null;

      if (response.ok && result?.ok) {
        setStatus("success");
        form.reset();
        return;
      }

      setFieldErrors(result?.fields ?? {});
      setStatus("error");
      setError(
        result?.error ??
          "The message couldn't be sent right now. Please email me directly."
      );
      // Only offer the mailto fallback when the backend itself failed —
      // validation errors are fixable in the form.
      setFallback(response.status !== 400);
    } catch {
      setStatus("error");
      setError(
        "The message couldn't be sent — the connection failed. Please email me directly."
      );
      setFallback(true);
    }
  };

  const mailtoHref = (() => {
    const subject = "Hello Pratham";
    return `mailto:${RECIPIENT}?subject=${encodeURIComponent(subject)}`;
  })();

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot: hidden from people, tempting to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Field
        id="name"
        label="Name"
        error={fieldErrors.name}
        inputProps={{
          name: "name",
          required: true,
          autoComplete: "name",
          placeholder: "Your name",
          maxLength: 100,
          disabled: status === "sending",
        }}
      />

      <Field
        id="email"
        label="Email"
        error={fieldErrors.email}
        inputProps={{
          name: "email",
          type: "email",
          required: true,
          autoComplete: "email",
          placeholder: "you@example.com",
          maxLength: 254,
          disabled: status === "sending",
        }}
      />

      <Field
        id="subject"
        label="Subject"
        error={fieldErrors.subject}
        inputProps={{
          name: "subject",
          required: true,
          placeholder: "What's this about?",
          maxLength: 200,
          disabled: status === "sending",
        }}
      />

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-ink mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          maxLength={5000}
          disabled={status === "sending"}
          aria-invalid={fieldErrors.message ? true : undefined}
          aria-describedby={fieldErrors.message ? "message-error" : undefined}
          className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-ink focus:outline-none focus:ring-2 focus:ring-cobalt transition-all disabled:opacity-60"
          placeholder="Tell me about your project or question..."
        />
        {fieldErrors.message && (
          <p id="message-error" className="mt-1.5 text-sm text-coral">
            {fieldErrors.message}
          </p>
        )}
      </div>

      <div className="rounded-lg border border-border bg-surface-raised p-4 text-sm text-ink-secondary leading-relaxed">
        Your message goes straight to my inbox. Your email address is only used
        to reply — nothing is stored on this site.
      </div>

      <Button
        type="submit"
        disabled={status === "sending"}
        variant="color"
        color="coral"
        className="w-full"
      >
        {status === "sending" ? (
          <>
            Sending…
            <Loader2 className="ml-2 h-4 w-4 animate-spin" aria-hidden="true" />
          </>
        ) : (
          <>
            Send message
            <Send className="ml-2 h-4 w-4" aria-hidden="true" />
          </>
        )}
      </Button>

      <div aria-live="polite" aria-atomic="true">
        {status === "success" && (
          <div className="flex gap-3 rounded-lg border border-emerald/30 bg-emerald-soft p-4 text-emerald">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <div>
              <p className="font-medium text-emerald">Message sent.</p>
              <p className="text-sm text-emerald mt-1">
                Thanks — I&apos;ll reply to the address you gave.
              </p>
            </div>
          </div>
        )}

        {status === "error" && error && (
          <div className="flex gap-3 rounded-lg border border-coral/30 bg-coral-soft p-4 text-coral">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <div>
              <p className="font-medium text-coral">{error}</p>
              {fallback && (
                <p className="text-sm text-coral mt-1">
                  You can also write to me directly at{" "}
                  <a
                    href={mailtoHref}
                    className="underline underline-offset-2 font-medium"
                  >
                    {RECIPIENT}
                  </a>
                  .
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  inputProps,
}: {
  id: string;
  label: string;
  error?: string;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-ink mb-2">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-ink focus:outline-none focus:ring-2 focus:ring-cobalt transition-all disabled:opacity-60"
        {...inputProps}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-coral">
          {error}
        </p>
      )}
    </div>
  );
}
