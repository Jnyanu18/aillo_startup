import { createFileRoute } from "@tanstack/react-router";
import { type ReactNode } from "react";
import { GraduationCap, Lightbulb, Briefcase, Users, Wand2, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { GradientText } from "@/components/ui/gradient-text";
import { Reveal } from "@/components/reveal";
import { PageChrome } from "@/components/page-chrome";
import { FinalCta } from "@/components/final-cta";
import { TiltGrid } from "@/components/motion/tilt-grid";
import {
  FundamentalsExplainer,
  PromptExplainer,
  LeadersExplainer,
  RolesExplainer,
  ToolsExplainer,
} from "@/components/explainers/training-explainers";

export const Route = createFileRoute("/hire")({
  head: () => ({
    meta: [
      { title: "Hire — AI Trainings — AILO" },
      {
        name: "description",
        content: "Upskill your team with hands-on AI trainings — fundamentals, prompt engineering, leadership and role-based workshops.",
      },
    ],
  }),
  component: HirePage,
});

const items = [
  {
    title: "AI Fundamentals",
    icon: <GraduationCap className="h-5 w-5" />,
    blurb: "How LLMs actually work — without the hype or the math overload.",
    Visual: FundamentalsExplainer,
  },
  {
    title: "Prompt Engineering",
    icon: <Lightbulb className="h-5 w-5" />,
    blurb: "Patterns that turn vague prompts into reliable, repeatable output.",
    Visual: PromptExplainer,
  },
  {
    title: "AI for Leaders",
    icon: <Briefcase className="h-5 w-5" />,
    blurb: "Spot ROI, set guardrails, ask the right questions of your team.",
    Visual: LeadersExplainer,
  },
  {
    title: "Role-Based Workshops",
    icon: <Users className="h-5 w-5" />,
    blurb: "Hands-on sessions for Ops, Sales, Marketing, Eng — pick your stack.",
    Visual: RolesExplainer,
  },
  {
    title: "AI Tools Mastery",
    icon: <Wand2 className="h-5 w-5" />,
    blurb: "Daily-driver tools wired into your real workflows, not toy demos.",
    Visual: ToolsExplainer,
  },
  {
    title: "AI Safety & Governance",
    icon: <ShieldCheck className="h-5 w-5" />,
    blurb: "Policies, guardrails and review loops that keep AI use accountable.",
    Visual: FundamentalsExplainer,
  },
];

function ExplainerCard({
  icon,
  title,
  blurb,
  visual,
}: {
  icon: ReactNode;
  title: string;
  blurb: string;
  visual: ReactNode;
}) {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden glass-card rounded-xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#ff8a4c]/40 hover:bg-surface hover:shadow-[0_18px_40px_-20px_rgba(255,138,76,0.55)]">
      {visual}
      <div className="mt-5 flex items-start gap-3">
        <div className="mt-0.5 text-foreground/80">{icon}</div>
        <div className="min-w-0">
          <h3 className="font-display text-base font-semibold leading-tight text-foreground">
            {title}
          </h3>
          <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{blurb}</p>
        </div>
      </div>
      <p className="mt-3 text-[10px] uppercase tracking-[0.18em] text-muted-foreground/70">
        Animated preview — video coming soon
      </p>
    </div>
  );
}

function HirePage() {
  return (
    <PageChrome>
      {(openBooking) => (
        <>
        <section className="scroll-mt-20 pt-28 pb-8 md:pt-36 md:pb-12">
          <Container>
            <Reveal>
              <SectionLabel number="01" title="AI Trainings" />
            </Reveal>
            <h1 className="font-display mt-6 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
              Upskill your team — <GradientText>without the fluff.</GradientText>
            </h1>
            <Reveal delay={0.05}>
              <p className="mt-5 max-w-2xl text-sm text-muted-foreground md:text-base">
                Short, intense sessions with a working artefact at the end of every module.
              </p>
            </Reveal>
            <TiltGrid className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((it) => (
                <ExplainerCard
                  key={it.title}
                  icon={it.icon}
                  title={it.title}
                  blurb={it.blurb}
                  visual={<it.Visual />}
                />
              ))}
            </TiltGrid>
            <Reveal delay={0.2}>
              <p className="mt-6 text-sm text-muted-foreground">
                + <span className="text-foreground">Custom corporate cohorts.</span>
              </p>
            </Reveal>
          </Container>
        </section>
        <FinalCta onCta={() => openBooking()} heading="upskill your team?" />
        </>
      )}
    </PageChrome>
  );
}
