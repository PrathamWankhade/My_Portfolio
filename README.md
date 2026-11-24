# Pratham Wankhade — Portfolio

A personal portfolio and two-page CV built with Next.js 16 (App Router), React
19, TypeScript, and Tailwind CSS 4. Deployed at
<https://prathamwankhades-portfolio.vercel.app>.

The site presents four engineering case studies with their architecture,
trade-offs, and evaluation evidence. It keeps different kinds of evidence
distinct: paper-reported results, repository-reported results, simulated
experiments, and device-level verification are never presented as the same
thing.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Homepage — introduction, featured work, capabilities, contact |
| `/about` | Background and engineering approach |
| `/projects` | Filterable case-study gallery |
| `/projects/[slug]` | Individual case study (architecture, implementation, evidence) |
| `/skills` | Skill groups linked to the projects that demonstrate them |
| `/experience` | Internships, leadership, education, talks |
| `/achievements` | Publication, certifications, awards, presentations |
| `/cv` | Print-ready two-page CV (Save as PDF) |
| `/contact` | Contact form and direct channels |
| `/robots.txt`, `/sitemap.xml` | Crawler metadata |

Permanent redirects preserve old URLs: `/resume` → `/cv` and
`/projects/phishing-detection` → `/projects/phishguard`.

Content lives in `src/content/` (`projects.ts`, `experience.ts`,
`publications.ts`, `about.ts`); shared UI lives in `src/components/`.

## Local development

Requires Node.js 22+ on Windows 11 (or any modern OS).

```powershell
npm ci
Copy-Item .env.example .env.local   # then fill in the values you need
npm run dev
```

Open <http://localhost:3000>. The dev server reflects edits automatically.

Quality checks (the same ones CI runs on push and pull request):

```powershell
npm run lint
npx tsc --noEmit
npm run build
```

To test the production build locally, run `npm run start` after the build.

## Environment variables

Copy `.env.example` to `.env.local` (git ignores `.env*` except the example).
On Vercel, add the same values under **Project → Settings → Environment
Variables**, then redeploy.

| Variable | Required | Purpose |
| --- | --- | --- |
| `SITE_URL` | no | Canonical URL used by `metadataBase`, `robots.txt` and `sitemap.xml`. Defaults to the Vercel URL above. |
| `RESEND_API_KEY` | yes, for the form | API key from <https://resend.com/api-keys>. Without it the endpoint returns 503 and the form offers a direct email link. |
| `CONTACT_TO_EMAIL` | no | Inbox receiving submissions; defaults to `prathamwankhade2004@gmail.com`. |
| `CONTACT_FROM_EMAIL` | no | Sender; defaults to `Portfolio Contact <onboarding@resend.dev>`. Resend allows the test sender only to mail the account owner — verify a domain to send from your own address. |
| `UPSTASH_REDIS_REST_URL` | no | If set with the token below, enables shared rate limiting across serverless instances. |
| `UPSTASH_REDIS_REST_TOKEN` | no | Upstash Redis REST token; unset → per-instance in-memory limiter. |

## Contact form

`/contact` posts JSON to `src/app/api/contact/route.ts`, which validates and
length-limits every field, drops honeypot submissions, rate-limits to 5
messages per 10 minutes, and relays via [Resend](https://resend.com). The
visitor's address is used as `reply_to`, so replying in the inbox answers them
directly. Repeated sends from the shared test sender can be filtered as spam
by the recipient's mail provider; verify a domain in Resend for reliable
delivery.

**Privacy:** the portfolio does not store submissions in its own database. The
message is processed by Resend and the recipient's email provider, which retain
it according to their own policies. The visitor's email is used only as the
reply-to address.

## Deployment

Vercel builds with `npm run build` (framework auto-detected as Next.js). After
each push to `main`:

1. Confirm the deploy succeeds at <https://vercel.com/prathamwankhades-projects/portfolio>.
2. Check `/cv` prints to exactly two A4 pages with clickable links.
3. Submit a test message from `/contact` and confirm delivery.
4. Check `/robots.txt`, `/sitemap.xml`, and social previews.

`.github/workflows/ci.yml` runs lint, TypeScript, and build on every push and
pull request to `main`.
