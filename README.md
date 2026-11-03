This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Contact form

`/contact` posts to `src/app/api/contact/route.ts`, which relays the message
through [Resend](https://resend.com). Copy `.env.example` to `.env.local` and
fill in the values:

```bash
cp .env.example .env.local
```

| Variable | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | yes | API key from <https://resend.com/api-keys>. Without it the endpoint returns 503 and the form shows the direct email address instead. |
| `CONTACT_TO_EMAIL` | no | Inbox that receives submissions. Defaults to `prathamwankhade2004@gmail.com`. |
| `CONTACT_FROM_EMAIL` | no | Sender. Defaults to `Portfolio Contact <onboarding@resend.dev>`, which Resend only allows to mail the account owner. Verify a domain in Resend to send from your own address. |

The visitor's address is set as `reply_to`, so replying in Gmail answers them
directly. The route also validates and length-limits every field, drops
honeypot submissions, and rate-limits to 5 messages per 10 minutes per IP.

On Vercel, add the same variables under **Project → Settings → Environment
Variables** and redeploy.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
