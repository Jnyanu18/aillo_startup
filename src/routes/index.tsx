import { createFileRoute } from "@tanstack/react-router";
import { type ReactNode } from "react";
import { ArrowRight, Sparkles, Wrench, Workflow, ShieldCheck, Mail, Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { GradientText } from "@/components/ui/gradient-text";
import { Button } from "@/components/ui/button";
import { FeatureCard } from "@/components/ui/feature-card";
import { Reveal } from "@/components/reveal";
import { PageChrome } from "@/components/page-chrome";
import { AnimatedGlyph } from "@/components/explainers/animated-glyph";
import { CountUp } from "@/components/explainers/count-up";
import { TiltGrid } from "@/components/motion/tilt-grid";
import { HeroIntro } from "@/components/motion/hero-intro";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AILO — Acceleration logics for modern business" },
      {
        name: "description",
        content:
          "AILO partners with small & medium businesses to build, automate and grow with AI. From content and code to cloud and customer support — one technology team for everything you need to scale.",
      },
      { property: "og:title", content: "AILO — Acceleration logics for modern business" },
      {
        property: "og:description",
        content:
          "One technology partner for AI, software, content and cloud — sized for SMEs, built like an enterprise team.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <PageChrome>
      {(openBooking) => (
        <>
          <Hero onCta={() => openBooking()} />
          <HowWeWork />
          <WhoWeAre />
          <DashboardSection />
          <WhyAilo />
          <FinalCta onCta={() => openBooking()} />
        </>
      )}
    </PageChrome>
  );
}

/* -------------------------------------------------------------------------- */

function Hero({ onCta }: { onCta: () => void }) {
  return (
    <section className="relative overflow-hidden pt-24 pb-4 md:pt-32 md:pb-8">
      {/* Indigo beam */}
      <div
        aria-hidden
        className="beam-light pointer-events-none absolute -top-40 right-[-18%] h-[760px] w-[920px]"
      />
      {/* Aurora blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-44 top-44 h-[420px] w-[420px] rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(255,138,76,0.20) 0%, transparent 72%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-8 top-[58%] h-[360px] w-[360px] rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(255,176,136,0.18) 0%, transparent 72%)" }}
      />

      <Container className="relative">
        <HeroIntro>
          <SectionLabel number="00" title="AI & Technology Partner" />
        </HeroIntro>

        <HeroIntro delay={0.1}>
          <h1 className="font-display mt-4 max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.04em] sm:text-6xl md:text-7xl xl:text-[96px]">
            <span className="block">Acceleration logics</span>
            <span className="block">
              for <span className="inline-block italic font-light leading-[1.15] text-foreground/90">modern business.</span>
            </span>
          </h1>
        </HeroIntro>

        <HeroIntro delay={0.25}>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            AILO partners with small &amp; medium businesses to build, automate and grow with AI.
            One technology team for everything you need to scale.
          </p>
        </HeroIntro>
        <HeroIntro delay={0.4}>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <Button variant="primary" size="lg" onClick={onCta}>
              Book a free consultation
              <ArrowRight className="h-4 w-4" />
            </Button>
            <a
              href="/work"
              className="text-sm font-medium text-white/70 underline-offset-4 transition hover:text-white hover:underline"
            >
              See our work →
            </a>
          </div>
        </HeroIntro>

        {/* Latest case study + +23% stat row */}
        <HeroIntro delay={0.55}>
          <div className="mt-10 grid gap-4 md:grid-cols-[1.4fr_1fr]">
            <div className="glass-card glow-indigo flex items-center gap-5 p-6">
              <div className="min-w-0">
                <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/50">
                  Latest case study
                </div>
                <div className="font-display mt-1 text-lg leading-snug text-white md:text-xl">
                  Support Pilot — Multichannel
                  <br className="hidden md:inline" /> AI Customer Assistant
                </div>
              </div>
            </div>
            <div className="glass-card glow-violet relative flex flex-col items-center justify-center p-6">
              <div className="font-display text-indigo-glow text-5xl font-semibold tracking-tight md:text-6xl">
                +<CountUp to={23} />%
              </div>
              <div className="mt-2 text-xs uppercase tracking-[0.2em] text-white/60">
                Team productivity growth
              </div>
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-8 bottom-3 h-[2px] overflow-hidden rounded-full bg-white/5"
              >
                <div className="h-full w-full bg-gradient-to-r from-transparent via-pink-400 to-transparent" />
              </div>
            </div>
          </div>
        </HeroIntro>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* How We Work — animated 2D step blocks, no 3D                                */

const PROCESS_STEPS: Array<{
  n: string;
  title: string;
  desc: string;
  bullets: string[];
}> = [
  {
    n: "01",
    title: "Discover",
    desc: "Analyze operations to uncover the most impactful AI opportunities.",
    bullets: ["Identify growth and efficiency gaps fast", "Data-driven insights instead of guesswork"],
  },
  {
    n: "02",
    title: "Design",
    desc: "Map the automation architecture and define AI solution flows.",
    bullets: [
      "Tailored system aligned with business goals",
      "Reduced launch risks and technical friction",
      "Built-in flexibility for future scaling",
    ],
  },
  {
    n: "03",
    title: "Build",
    desc: "Deploy AI tools, connect APIs, and train custom models.",
    bullets: ["End-to-end engineering", "Integrated with your existing stack"],
  },
  {
    n: "04",
    title: "Operate",
    desc: "Monitor, improve and scale — quietly, every day.",
    bullets: ["Always-on observability", "Continuous model and workflow tuning"],
  },
];

function HowWeWork() {
  return (
    <section
      id="process"
      className="relative scroll-mt-20 overflow-hidden border-t border-white/5 py-8 md:py-12"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-96 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(79,70,229,0.16) 0%, transparent 60%)",
        }}
      />
      <Container className="relative">
        <Reveal>
          <SectionLabel number="01" title="Our process" />
        </Reveal>
        <h2 className="font-display mt-6 max-w-3xl text-4xl font-semibold leading-[1.02] tracking-[-0.035em] md:text-5xl">
          How we work
        </h2>
        <Reveal delay={0.1}>
          <p className="mt-4 max-w-xl text-base text-muted-foreground md:text-lg">
            A clear, adaptable framework for implementing AI — because every company's workflows,
            data, and goals are different.
          </p>
        </Reveal>

        <div className="relative mt-10">
          {/* Horizontal connector line behind the cards (desktop) */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-10 hidden h-px bg-gradient-to-r from-transparent via-pink-400/40 to-transparent md:block"
          />
          <div className="grid gap-4 md:grid-cols-4">
            {PROCESS_STEPS.map((step, i) => (
              <Reveal key={step.n} delay={i * 0.08}>
                <div className="relative flex h-full flex-col glass-card rounded-xl p-6">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-pink-400">
                      {step.n}
                    </span>
                    <span className="h-px flex-1 bg-border" />
                  </div>
                  <h3 className="font-display text-indigo-glow mt-4 text-2xl font-semibold tracking-[-0.02em]">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">{step.desc}</p>
                  <ul className="mt-4 space-y-2">
                    {step.bullets.slice(0, 2).map((b) => (
                      <li key={b} className="flex items-start gap-2 text-xs text-white/70">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-pink-400" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

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
    <section id={id} className="scroll-mt-20 border-t border-border py-8 md:py-12">
      <Container>
        <Reveal>
          <SectionLabel number={number} title={label} />
        </Reveal>
        <div className="mt-4">{children}</div>
      </Container>
    </section>
  );
}

/* 02 — Who We Are ----------------------------------------------------------- */

function WhoWeAre() {
  const pillars = [
    {
      title: "Build",
      description: "Websites, apps, software & AI systems engineered to last.",
      icon: <Wrench className="h-5 w-5" />,
    },
    {
      title: "Automate",
      description: "Workflows, support & operations handled by AI.",
      icon: <Workflow className="h-5 w-5" />,
    },
    {
      title: "Grow",
      description: "Content, SEO & paid media that compounds reach.",
      icon: <Sparkles className="h-5 w-5" />,
    },
    {
      title: "Support",
      description: "Cloud, security & maintenance kept always-on.",
      icon: <ShieldCheck className="h-5 w-5" />,
    },
  ];

  return (
    <SectionShell number="02" label="Who We Are">
      <div className="grid gap-10 md:grid-cols-2 md:gap-16">
        <Reveal>
          <h2 className="font-display text-3xl font-bold leading-tight md:text-5xl">
            An enterprise-grade tech team,{" "}
            <GradientText>sized for SMEs.</GradientText>
          </h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="text-muted-foreground md:text-lg md:leading-relaxed">
            Most small and growing businesses don't need ten vendors — they need one capable
            partner. AILO brings AI engineers, developers, designers and marketers under a single
            roof, so strategy, build and growth stay connected.
          </p>
        </Reveal>
      </div>

      <TiltGrid className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.05}>
            <FeatureCard icon={p.icon} title={p.title} description={p.description} />
          </Reveal>
        ))}
      </TiltGrid>
    </SectionShell>
  );
}

/* 03 — Dashboard / Impact at a glance --------------------------------------- */

const IMPACT_METRICS = {
  clientsServed: 40,
  successRate: 95,
  hoursSavedAnnual: 1200,
  costSavedAnnual: 48,
  beforeAfter: [
    { label: "Operating cost / mo", before: 100, after: 58 },
    { label: "Time-to-resolution", before: 100, after: 22 },
    { label: "Manual hours / wk", before: 100, after: 35 },
  ],
};

function DashboardSection() {
  return (
    <SectionShell id="dashboard" number="03" label="Impact Dashboard">
      <Reveal>
        <h2 className="font-display max-w-3xl text-3xl font-bold leading-tight md:text-5xl">
          The dashboard behind <GradientText>the partnerships.</GradientText>
        </h2>
      </Reveal>
      <Reveal delay={0.05}>
        <p className="mt-4 max-w-2xl text-sm text-muted-foreground md:text-base">
          A snapshot of the outcomes AILO has delivered so far — clients served, deployment
          success, and the cost & hours we've taken off their plate.
        </p>
      </Reveal>

      <TiltGrid className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Reveal>
          <ImpactTile
            label="Clients served"
            value={<><CountUp to={IMPACT_METRICS.clientsServed} />+</>}
            sub="across e-commerce, B2B & ops"
            gradient
          />
        </Reveal>
        <Reveal delay={0.05}>
          <ImpactTile
            label="Successful deployments"
            value={<><CountUp to={IMPACT_METRICS.successRate} />%</>}
            sub="shipped on time, on scope"
          />
        </Reveal>
        <Reveal delay={0.1}>
          <ImpactTile
            label="Hours saved / client / yr"
            value={<><CountUp to={IMPACT_METRICS.hoursSavedAnnual} /></>}
            sub="manual work removed by AI"
            gradient
          />
        </Reveal>
        <Reveal delay={0.15}>
          <ImpactTile
            label="Avg. cost saved / yr"
            value={<>$<CountUp to={IMPACT_METRICS.costSavedAnnual} />K</>}
            sub="operational spend reduction"
          />
        </Reveal>
      </TiltGrid>

      <Reveal delay={0.2}>
        <div className="mt-10 glass-card rounded-xl p-6 md:p-8">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <div className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Before vs. after AILO — illustrative client
            </div>
            <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-sm bg-foreground/30" /> Before
              </span>
              <span className="flex items-center gap-1.5">
                <span className="bg-gradient-ailo h-2 w-2 rounded-sm" /> After
              </span>
            </div>
          </div>
          <div className="mt-6 space-y-5">
            {IMPACT_METRICS.beforeAfter.map((row) => (
              <BeforeAfterRow key={row.label} {...row} />
            ))}
          </div>
        </div>
      </Reveal>
    </SectionShell>
  );
}

function ImpactTile({
  label,
  value,
  sub,
  gradient = false,
}: {
  label: string;
  value: ReactNode;
  sub: string;
  gradient?: boolean;
}) {
  return (
    <div className="flex h-full flex-col glass-card rounded-xl p-6">
      <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </div>
      <div
        className={`font-display mt-4 text-4xl font-bold tracking-tight md:text-5xl ${
          gradient ? "text-gradient" : "text-foreground"
        }`}
      >
        {value}
      </div>
      <div className="mt-2 text-xs text-muted-foreground">{sub}</div>
    </div>
  );
}

function BeforeAfterRow({
  label,
  before,
  after,
}: {
  label: string;
  before: number;
  after: number;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between text-xs">
        <span className="text-foreground">{label}</span>
        <span className="text-muted-foreground">
          <span className="text-foreground">−{before - after}%</span> improvement
        </span>
      </div>
      <div className="mt-2 space-y-1.5">
        <div className="relative h-2 overflow-hidden rounded-full bg-foreground/10">
          <div className="absolute inset-y-0 left-0 bg-foreground/30" style={{ width: `${before}%` }} />
        </div>
        <div className="relative h-2 overflow-hidden rounded-full bg-foreground/10">
          <div
            className="bg-gradient-ailo absolute inset-y-0 left-0 rounded-full"
            style={{ width: `${after}%` }}
          />
        </div>
      </div>
    </div>
  );
}

/* 04 — Why AILO -------------------------------------------------------------- */

function WhyAilo() {
  const pillars = [
    { n: "01", title: "AI-first by default" },
    { n: "02", title: "Built for SME budgets" },
    { n: "03", title: "One accountable team" },
    { n: "04", title: "Support that stays" },
  ];
  return (
    <SectionShell id="why" number="04" label="Why AILO">
      <Reveal>
        <h2 className="font-display max-w-3xl text-3xl font-bold leading-tight md:text-5xl">
          Four reasons clients <GradientText>stay with us.</GradientText>
        </h2>
      </Reveal>
      <TiltGrid className="mt-8 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((p, i) => (
          <Reveal key={p.n} delay={i * 0.05}>
            <div className="flex h-full flex-col justify-between bg-surface p-8">
              <div className="text-gradient font-display text-3xl font-bold">{p.n}</div>
              <div className="font-display mt-12 text-xl font-semibold text-foreground">
                {p.title}
              </div>
            </div>
          </Reveal>
        ))}
      </TiltGrid>
    </SectionShell>
  );
}

/* Final CTA ---------------------------------------------------------------- */

function FinalCta({ onCta }: { onCta: () => void }) {
  return (
    <section className="relative overflow-hidden border-t border-border py-8 md:py-12">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[1000px] -translate-x-1/2 -translate-y-1/2 opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(79,70,229,0.5) 0%, rgba(167,139,250,0.25) 40%, transparent 75%)",
        }}
      />
      <Container className="relative text-center">
        <Reveal>
          <h2 className="font-display mx-auto max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
            Ready to <GradientText>accelerate?</GradientText>
          </h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground md:text-lg">
            Tell us where you want to go. We'll map the technology to get you there — and stay with
            you while you grow.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button variant="primary" size="lg" onClick={onCta}>
              Book a free consultation
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="/work">See our work</a>
            </Button>
            <Button variant="outline" size="lg" onClick={onCta}>
              Client Success
            </Button>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
            <a
              className="inline-flex items-center gap-2 hover:text-foreground"
              href="mailto:info@accelerationlogics.com"
            >
              <Mail className="h-4 w-4" /> info@accelerationlogics.com
            </a>
            <span>www.accelerationlogics.com</span>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
