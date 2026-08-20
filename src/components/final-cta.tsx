import { ArrowRight, Mail } from "lucide-react";
import { Container } from "@/components/ui/container";
import { GradientText } from "@/components/ui/gradient-text";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";

export function FinalCta({
  onCta,
  heading = "accelerate?",
  copy = "Tell us where you want to go. We'll map the technology to get you there — and stay with you while you grow.",
}: {
  onCta: () => void;
  heading?: string;
  copy?: string;
}) {
  return (
    <section className="relative overflow-hidden border-t border-border py-8 md:py-12">
      {/* a single thin accent line, not a color wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-px w-[70%] max-w-2xl -translate-x-1/2 opacity-20"
        style={{ background: "linear-gradient(90deg, transparent, var(--primary), transparent)" }}
      />
      <Container className="relative text-center">
        <Reveal>
          <h2 className="font-display mx-auto max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
            Ready to <GradientText>{heading}</GradientText>
          </h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground md:text-lg">{copy}</p>
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
