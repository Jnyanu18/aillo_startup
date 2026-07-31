import { createFileRoute } from "@tanstack/react-router";
import { type ReactNode } from "react";
import { Bot, MessageSquare, Headphones, Plug, Workflow, Wand2, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { GradientText } from "@/components/ui/gradient-text";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { PageChrome } from "@/components/page-chrome";
import { FinalCta } from "@/components/final-cta";
import { TiltGrid } from "@/components/motion/tilt-grid";
import {
  AutomationExplainer,
  ChatbotExplainer,
  SupportExplainer,
  IntegrationsExplainer,
  WorkflowExplainer,
  AssistantsExplainer,
} from "@/components/explainers/solution-explainers";

export const Route = createFileRoute("/solutions")({
  head: () => ({
    meta: [
      { title: "AI Solutions — AILO" },
      {
        name: "description",
        content: "AI automation, chatbots, support automation, integrations and internal tools — built into your business.",
      },
    ],
  }),
  component: SolutionsPage,
});

const solutionItems = [
  {
    title: "AI Automation",
    icon: <Bot className="h-5 w-5" />,
    blurb: "Plug AI into your day-to-day operations — it runs in the background.",
    Visual: AutomationExplainer,
  },
  {
    title: "AI Chatbots",
    icon: <MessageSquare className="h-5 w-5" />,
    blurb: "Conversational agents that answer instantly, on every channel.",
    Visual: ChatbotExplainer,
  },
  {
    title: "Support Automation",
    icon: <Headphones className="h-5 w-5" />,
    blurb: "Tickets triaged, drafted and resolved before they reach an inbox.",
    Visual: SupportExplainer,
  },
  {
    title: "AI Integrations",
    icon: <Plug className="h-5 w-5" />,
    blurb: "Connect models to the tools you already use — no rip-and-replace.",
    Visual: IntegrationsExplainer,
  },
  {
    title: "Workflow Automation",
    icon: <Workflow className="h-5 w-5" />,
    blurb: "Multi-step processes orchestrated end-to-end across systems.",
    Visual: WorkflowExplainer,
  },
  {
    title: "AI Tools & Assistants",
    icon: <Wand2 className="h-5 w-5" />,
    blurb: "Internal copilots that compress hours of work into minutes.",
    Visual: AssistantsExplainer,
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

function SolutionsPage() {
  return (
    <PageChrome>
      {(openBooking) => (
        <>
        <section className="scroll-mt-20 pt-28 pb-8 md:pt-36 md:pb-12">
          <Container>
            <Reveal>
              <SectionLabel number="01" title="AI Solutions" />
            </Reveal>
            <Reveal delay={0.02}>
              <h1 className="font-display mt-6 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
                The flagship — <GradientText>AI built into your business.</GradientText>
              </h1>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-5 max-w-2xl text-sm text-muted-foreground md:text-base">
                See it in motion. Each preview hints at how the capability works on a real customer
                workflow — videos rolling out soon.
              </p>
            </Reveal>
            <TiltGrid className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {solutionItems.map((it) => (
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
              <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3 text-sm">
                <span className="text-muted-foreground">+ Need something bespoke?</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    openBooking({
                      serviceInterest: "AI Solutions",
                      message:
                        "I'd like to scope a custom AI build for my business. Here's what I have in mind: ",
                    })
                  }
                >
                  Request a custom AI build
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </Reveal>
          </Container>
        </section>
        <FinalCta onCta={() => openBooking()} heading="build this in?" />
        </>
      )}
    </PageChrome>
  );
}
