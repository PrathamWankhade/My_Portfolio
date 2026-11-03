import { NextResponse } from "next/server";

const RECIPIENT = process.env.CONTACT_TO_EMAIL || "prathamwankhade2004@gmail.com";
const SENDER =
  process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";
const API_KEY = process.env.RESEND_API_KEY;

const LIMITS = { name: 100, email: 254, subject: 200, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Per-instance rate limit. Serverless instances are ephemeral, so this is a
 * speed bump rather than a guarantee — the honeypot and Resend's own limits
 * handle the rest.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, { count: number; resetAt: number }>();

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return (
    forwarded?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || entry.resetAt < now) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

function escapeHtml(value: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };
  return value.replace(/[&<>"']/g, (char) => map[char] ?? char);
}

function json(body: Record<string, unknown>, status: number) {
  return NextResponse.json(body, { status });
}

export async function POST(request: Request) {
  if (isRateLimited(clientIp(request))) {
    return json(
      { error: "Too many messages from this connection. Please try again later." },
      429
    );
  }

  let payload: unknown;
  try {
    const raw = await request.text();
    if (raw.length > 20_000) {
      return json({ error: "That message is too long to send." }, 413);
    }
    payload = JSON.parse(raw);
  } catch {
    return json({ error: "Could not read that request." }, 400);
  }

  const body = (payload ?? {}) as Record<string, unknown>;
  const field = (key: keyof typeof LIMITS) =>
    typeof body[key] === "string" ? (body[key] as string).trim() : "";

  // Honeypot: real visitors never fill this hidden field. Pretend success.
  if (typeof body.website === "string" && body.website.trim().length > 0) {
    return json({ ok: true }, 200);
  }

  const name = field("name");
  const email = field("email");
  const subject = field("subject");
  const message = field("message");

  const errors: Record<string, string> = {};
  if (!name) errors.name = "Please add your name.";
  else if (name.length > LIMITS.name) errors.name = "That name is too long.";
  if (!email) errors.email = "Please add an email address.";
  else if (!EMAIL_RE.test(email) || email.length > LIMITS.email)
    errors.email = "That email address doesn't look right.";
  if (!subject) errors.subject = "Please add a subject.";
  else if (subject.length > LIMITS.subject)
    errors.subject = "That subject is too long.";
  if (!message) errors.message = "Please write a message.";
  else if (message.length > LIMITS.message)
    errors.message = `Keep the message under ${LIMITS.message.toLocaleString()} characters.`;

  if (Object.keys(errors).length > 0) {
    return json({ error: "Please check the highlighted fields.", fields: errors }, 400);
  }

  if (!API_KEY) {
    return json(
      {
        error:
          "The contact form isn't connected yet. Please email me directly — the address is below.",
        code: "not_configured",
      },
      503
    );
  }

  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Subject: ${subject}`,
    "",
    message,
    "",
    "—",
    "Sent from the contact form at portfolio.prathamwankhade.dev",
  ].join("\n");

  const html = `
    <div style="font-family:system-ui,-apple-system,'Segoe UI',sans-serif;line-height:1.6;color:#111">
      <h2 style="margin:0 0 16px;font-size:18px">New portfolio message</h2>
      <p style="margin:0 0 4px"><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p style="margin:0 0 4px"><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p style="margin:0 0 16px"><strong>Subject:</strong> ${escapeHtml(subject)}</p>
      <hr style="border:none;border-top:1px solid #ddd;margin:16px 0" />
      <p style="margin:0;white-space:pre-wrap">${escapeHtml(message)}</p>
      <hr style="border:none;border-top:1px solid #ddd;margin:16px 0" />
      <p style="margin:0;color:#666;font-size:12px">
        Sent from the contact form at portfolio.prathamwankhade.dev
      </p>
    </div>
  `;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: SENDER,
        to: [RECIPIENT],
        reply_to: email,
        subject: `[Portfolio] ${subject}`,
        text,
        html,
      }),
    });

    if (!response.ok) {
      console.error(
        "contact: Resend rejected the message",
        response.status,
        await response.text()
      );
      return json(
        { error: "The message couldn't be sent right now. Please email me directly." },
        502
      );
    }
  } catch (error) {
    console.error("contact: Resend request failed", error);
    return json(
      { error: "The message couldn't be sent right now. Please email me directly." },
      502
    );
  }

  return json({ ok: true }, 200);
}
