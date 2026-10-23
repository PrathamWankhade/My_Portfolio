"use client";

import { Mail, Github, Phone } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ContactForm } from "@/components/contact-form";
import { LinkedInIcon } from "@/components/icons/linkedin";
import { Reveal } from "@/components/reveal";
import {
  colorGroupBorder,
  colorHoverText,
  colorText,
  type AnyColorName,
} from "@/lib/color-classes";

type Channel = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href: string;
  color: AnyColorName;
  external: boolean;
};

const contactChannels: Channel[] = [
  {
    icon: Mail,
    label: "Email",
    value: "prathamwankhade2004@gmail.com",
    href: "mailto:prathamwankhade2004@gmail.com",
    color: "cobalt",
    external: false,
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 77578 48083",
    href: "tel:+917757848083",
    color: "emerald",
    external: false,
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/PrathamWankhade",
    href: "https://github.com/PrathamWankhade",
    color: "ink",
    external: true,
  },
  {
    icon: LinkedInIcon,
    label: "LinkedIn",
    value: "linkedin.com/in/pratham-wankhade",
    href: "https://linkedin.com/in/pratham-wankhade",
    color: "cobalt",
    external: true,
  },
];

export default function ContactPageClient() {
  return (
    <div className="flex flex-col flex-1">
      <section className="pt-28 pb-14 sm:pt-32">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <span className="rise rise-1 editor-text text-xs font-semibold tracking-widest text-cobalt uppercase mb-4 block">
            Get in touch
          </span>
          <h1 className="rise rise-2 editor-text text-display font-semibold leading-[1.04] tracking-tight text-ink mb-6">
            Contact
          </h1>
          <p className="rise rise-3 text-lg text-ink-secondary leading-relaxed max-w-lg mx-auto">
            Recruiting, collaboration, or a question about any of the projects —
            write directly. No hidden backend: the form composes an email in
            your own mail app, and these channels reach me as well.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-16 border-t border-border/50">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-14 items-start">
            <Reveal>
              <div>
                <div className="editor-text text-heading font-semibold tracking-tight text-ink mb-6">
                  Write a message
                </div>
                <ContactForm />
              </div>
            </Reveal>

            <aside aria-labelledby="direct-channels">
              <Reveal delay={100}>
                <div
                  id="direct-channels"
                  className="editor-text text-heading font-semibold tracking-tight text-ink mb-6"
                >
                  Or write directly
                </div>
                <div className="flex flex-col gap-4">
                  {contactChannels.map((channel) => {
                    const Icon = channel.icon;
                    return (
                      <Card
                        key={channel.label}
                        variant="bordered"
                        className={`group p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-card ${colorText[channel.color]} ${colorGroupBorder[channel.color]}`}
                      >
                        <div
                          className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface transition-colors ${colorGroupBorder[channel.color]}`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <h4 className="font-semibold text-ink mb-1">
                          {channel.label}
                        </h4>
                        <a
                          href={channel.href}
                          className={`text-sm text-ink-secondary transition-colors ${colorHoverText[channel.color]}`}
                          target={channel.external ? "_blank" : undefined}
                          rel={channel.external ? "noopener noreferrer" : undefined}
                        >
                          {channel.value}
                        </a>
                      </Card>
                    );
                  })}
                </div>

                <p className="mt-8 text-sm text-ink-secondary leading-relaxed max-w-md">
                  Based in Amravati, Maharashtra, India — open to remote
                  collaboration and thoughtful questions about any project.
                </p>
              </Reveal>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
