import { createFileRoute } from "@tanstack/react-router";
import { type ReactNode } from "react";
import {
  Compass,
  Settings,
  FileText,
  Database,
  Users,
  ShieldCheck,
  Globe,
  Smartphone,
  Monitor,
  Code2,
  Cloud,
  Server,
  GitBranch,
  Lock,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { GradientText } from "@/components/ui/gradient-text";
import { FeatureCard } from "@/components/ui/feature-card";
import { Reveal } from "@/components/reveal";
import { PageChrome } from "@/components/page-chrome";
import { TiltGrid } from "@/components/motion/tilt-grid";
import { AnimatedGlyph, type GlyphAnim } from "@/components/explainers/animated-glyph";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — AILO" },
      {
        name: "description",
        content: "AI agency services, content & growth, and full build & engineering — the operating layer behind your AI.",
      },
    ],
  }),
  component: ServicesPage,
});

function SectionShell({
  id,
  number,
  label,
  children,
}: {
  id?: string;
  number: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-border py-8 md:py-12 first:border-t-0">
      <Container>
        <Reveal>
          <SectionLabel number={number} title={label} />
        </Reveal>
        <div className="mt-4">{children}</div>
      </Container>
    </section>
  );
}

function AgencyServices() {
  const items: Array<{
    title: string;
    icon: ReactNode;
    anim: GlyphAnim;
    blurb: string;
  }> = [
    {
      title: "AI Strategy & Audits",
      icon: <Compass className="h-5 w-5" />,
      anim: "spin",
      blurb: "Find where AI pays back fastest — before you write a line of code.",
    },
    {
      title: "Managed AI Operations",
      icon: <Settings className="h-5 w-5" />,
      anim: "tick",
      blurb: "We run, monitor and improve your AI stack — quietly, every day.",
    },
    {
      title: "AI Content at Scale",
      icon: <FileText className="h-5 w-5" />,
      anim: "shimmer",
      blurb: "Pipelines that brief, draft, edit and publish on-brand content.",
    },
    {
      title: "Data & Model Setup",
      icon: <Database className="h-5 w-5" />,
      anim: "pulse",
      blurb: "Clean data, the right model, fine-tuning when it earns its cost.",
    },
    {
      title: "Fractional AI Team",
      icon: <Users className="h-5 w-5" />,
      anim: "bob",
      blurb: "Senior AI engineers and PMs embedded as part of your team.",
    },
    {
      title: "Compliance & Governance",
      icon: <ShieldCheck className="h-5 w-5" />,
      anim: "scan",
      blurb: "Guardrails, audit trails and policies that keep AI safe to ship.",
    },
  ];
  return (
    <SectionShell number="01" label="AI Agency Services">
      <Reveal>
        <h1 className="font-display max-w-3xl text-3xl font-bold leading-tight md:text-5xl">
          The operating layer behind <GradientText>your AI.</GradientText>
        </h1>
      </Reveal>
      <Reveal delay={0.05}>
        <p className="mt-5 max-w-2xl text-sm text-muted-foreground md:text-base">
          AI in production sits on a stack: data feeds models, models drive ops, ops obeys
          governance — and your product sits on top.
        </p>
      </Reveal>

      <TiltGrid className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => (
          <Reveal key={it.title} delay={i * 0.04}>
            <div className="group relative flex h-full flex-col glass-card rounded-xl p-6 transition-colors duration-300 hover:bg-surface">
              <div className="text-foreground/80">
                <AnimatedGlyph animation={it.anim}>{it.icon}</AnimatedGlyph>
              </div>
              <h3 className="font-display mt-4 text-lg font-semibold text-foreground">
                {it.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.blurb}</p>
            </div>
          </Reveal>
        ))}
      </TiltGrid>

      <Reveal delay={0.1}>
        <h2 className="font-display mt-16 max-w-3xl text-3xl font-bold leading-tight md:text-4xl">
          Reach that <GradientText>compounds</GradientText> — month over month.
        </h2>
      </Reveal>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Reveal>
          <div className="glass-card rounded-xl p-8">
            <div className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Content & Creative
            </div>
            <ul className="mt-6 space-y-3 text-foreground">
              {[
                "Blog writing",
                "Website content",
                "Video scripts",
                "Social media creatives",
                "Branding content",
              ].map((i) => (
                <li key={i} className="flex items-center gap-3 text-sm">
                  <span className="bg-gradient-ailo h-1.5 w-1.5 rounded-full" />
                  {i}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="glass-card rounded-xl p-8">
            <div className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Digital Marketing & SEO
            </div>
            <ul className="mt-6 space-y-3 text-foreground">
              {[
                "Social media management",
                "Paid ads (Google & Meta)",
                "Technical & on-page SEO",
                "Off-page & local SEO",
                "Keyword research & SEO audits",
              ].map((i) => (
                <li key={i} className="flex items-center gap-3 text-sm">
                  <span className="bg-gradient-ailo h-1.5 w-1.5 rounded-full" />
                  {i}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}

function BuildEngineering() {
  const categories = [
    {
      title: "Web / Website Development",
      icon: <Globe className="h-5 w-5" />,
      items: [
        "Business websites",
        "E-commerce",
        "Web apps",
        "Landing pages",
        "CMS",
        "Maintenance",
        "Performance",
      ],
    },
    {
      title: "Mobile / Mobile App Development",
      icon: <Smartphone className="h-5 w-5" />,
      items: ["Android", "iOS", "Cross-platform", "App UI/UX", "Updates & support"],
    },
    {
      title: "Desktop / Desktop Applications",
      icon: <Monitor className="h-5 w-5" />,
      items: ["Windows apps", "macOS apps", "Enterprise software", "Custom solutions"],
    },
    {
      title: "Software / Software Development",
      icon: <Code2 className="h-5 w-5" />,
      items: [
        "Custom software",
        "SaaS products",
        "API development",
        "Database design",
        "System integrations",
      ],
    },
  ];

  return (
    <SectionShell number="02" label="Build & Engineering">
      <Reveal>
        <h2 className="font-display max-w-3xl text-3xl font-bold leading-tight md:text-5xl">
          From idea to production — <GradientText>shipped properly.</GradientText>
        </h2>
      </Reveal>
      <div className="mt-8 grid items-stretch gap-4 md:grid-cols-2">
        {categories.map((cat, i) => (
          <Reveal key={cat.title} delay={i * 0.05} className="h-full">
            <div className="flex h-full flex-col glass-card rounded-xl p-8">
              <div className="flex items-center gap-3 text-foreground/80">{cat.icon}</div>
              <h3 className="font-display mt-4 text-xl font-semibold">{cat.title}</h3>
              <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-muted-foreground">
                {cat.items.map((it) => (
                  <li key={it} className="flex items-center gap-2">
                    <span className="h-px w-3 bg-border" />
                    {it}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-6 text-[10px] uppercase tracking-[0.18em] text-muted-foreground/70">
                {cat.items.length} capabilities
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <h3 className="font-display mt-16 max-w-3xl text-2xl font-bold leading-tight md:text-3xl">
          Always-on infrastructure, <GradientText>quietly maintained.</GradientText>
        </h3>
      </Reveal>
      <TiltGrid className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Cloud Deployment", icon: <Cloud className="h-5 w-5" /> },
          { title: "Server Management", icon: <Server className="h-5 w-5" /> },
          { title: "CI/CD Setup", icon: <GitBranch className="h-5 w-5" /> },
          { title: "Security & Support", icon: <Lock className="h-5 w-5" /> },
        ].map((it, i) => (
          <Reveal key={it.title} delay={i * 0.04}>
            <FeatureCard icon={it.icon} title={it.title} />
          </Reveal>
        ))}
      </TiltGrid>
    </SectionShell>
  );
}

function ServicesPage() {
  return (
    <PageChrome>
      {() => (
        <div className="pt-20 md:pt-24">
          <AgencyServices />
          <BuildEngineering />
        </div>
      )}
    </PageChrome>
  );
}
