import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { GradientText } from "@/components/ui/gradient-text";
import { Reveal } from "@/components/reveal";
import { PageChrome } from "@/components/page-chrome";
import { FinalCta } from "@/components/final-cta";
import { TiltGrid } from "@/components/motion/tilt-grid";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listPublishedTestimonials } from "@/lib/testimonials.functions";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Client Work — AILO" },
      {
        name: "description",
        content: "Real outcomes from real partnerships — client success stories from AILO's AI and engineering work.",
      },
    ],
  }),
  component: WorkPage,
});

const fallback = [
  {
    id: "f1",
    stat: "68%",
    description:
      "of support tickets auto-resolved for a regional e-commerce retailer, cut first-response time from hours to seconds.",
    quote: "Our small team finally keeps up with demand — without hiring.",
    attribution: "Ops Lead, D2C Retail",
  },
  {
    id: "f2",
    stat: "3.2×",
    description: "organic traffic in 6 months after site rebuild + technical/local SEO.",
    quote: "We now get qualified enquiries every week from search alone.",
    attribution: "Founder, B2B Services",
  },
  {
    id: "f3",
    stat: "20 hrs/wk",
    description: "saved automating quoting, invoicing, reporting for a logistics SME.",
    quote: "It's like adding a full-time employee that never sleeps.",
    attribution: "Director, Logistics",
  },
];

function WorkPage() {
  const fetcher = useServerFn(listPublishedTestimonials);
  const { data } = useQuery({
    queryKey: ["testimonials", "published"],
    queryFn: () => fetcher(),
    staleTime: 60_000,
  });
  const stories = data && data.length > 0 ? data : fallback;

  return (
    <PageChrome>
      {(openBooking) => (
        <>
        <section id="work" className="scroll-mt-20 pt-28 pb-8 md:pt-36 md:pb-12">
          <Container>
            <Reveal>
              <SectionLabel number="01" title="Client Success Stories" />
            </Reveal>
            <h1 className="font-display mt-6 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
              Real outcomes from <GradientText>real partnerships.</GradientText>
            </h1>
            <TiltGrid className="mt-8 grid gap-5 md:grid-cols-3">
              {stories.map((s, i) => (
                <Reveal key={s.id} delay={i * 0.05}>
                  <div className="flex h-full flex-col glass-card rounded-xl p-8">
                    <div className="text-gradient font-display text-5xl font-bold tracking-tight">
                      {s.stat}
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground">{s.description}</p>
                    <div className="mt-6 border-t border-border pt-5 text-sm">
                      <p className="text-foreground">"{s.quote}"</p>
                      <p className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">
                        — {s.attribution}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </TiltGrid>
            <Reveal delay={0.2}>
              <p className="mt-6 text-xs text-muted-foreground">
                Representative outcomes shown — replace with your own client results.
              </p>
            </Reveal>
          </Container>
        </section>
        <FinalCta onCta={() => openBooking()} heading="see similar results?" />
        </>
      )}
    </PageChrome>
  );
}
