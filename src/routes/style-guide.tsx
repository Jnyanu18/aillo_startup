import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { GradientText } from "@/components/ui/gradient-text";
import { Button } from "@/components/ui/button";
import { FeatureCard } from "@/components/ui/feature-card";
import { StatBlock } from "@/components/ui/stat-block";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/style-guide")({
  head: () => ({
    meta: [
      { title: "Style Guide — AILO" },
      { name: "description", content: "AILO design system reference." },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: StyleGuide,
});

function Swatch({ name, color }: { name: string; color: string }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="h-12 w-12 rounded-md border border-border"
        style={{ background: color }}
      />
      <div>
        <div className="text-sm font-medium">{name}</div>
        <div className="text-xs text-muted-foreground">{color}</div>
      </div>
    </div>
  );
}

function StyleGuide() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main className="pt-24 pb-24">
        <Container className="space-y-20">
          <header>
            <SectionLabel number="00" title="Design System" />
            <h1 className="font-display mt-4 text-4xl font-bold md:text-5xl">
              AILO <GradientText>style guide</GradientText>
            </h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Every token, primitive, and chrome element in isolation.
            </p>
          </header>

          {/* Colors */}
          <section className="space-y-6">
            <SectionLabel number="01" title="Colors" />
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              <Swatch name="Background" color="#0a0e1a" />
              <Swatch name="Surface" color="#11162a" />
              <Swatch name="Foreground" color="#f4f6fb" />
              <Swatch name="Muted foreground" color="#8a94b0" />
              <Swatch name="Gradient start" color="#4f7cff" />
              <Swatch name="Gradient mid" color="#a855f7" />
              <Swatch name="Gradient end" color="#ec4899" />
              <Swatch name="Border" color="rgba(255,255,255,0.08)" />
            </div>
            <div className="bg-gradient-ailo h-3 w-full rounded-full" />
          </section>

          {/* Typography */}
          <section className="space-y-6">
            <SectionLabel number="02" title="Typography" />
            <div className="space-y-4">
              <p className="font-display text-6xl font-bold">Display 6xl</p>
              <p className="font-display text-4xl font-semibold">Display 4xl</p>
              <p className="font-display text-2xl font-semibold">Display 2xl</p>
              <p className="text-base">Body — Inter, paragraph copy at the default size.</p>
              <p className="text-sm text-muted-foreground">Small muted body copy.</p>
              <p>
                Gradient accent: <GradientText>acceleration logics</GradientText>
              </p>
            </div>
          </section>

          {/* Buttons */}
          <section className="space-y-6">
            <SectionLabel number="03" title="Buttons" />
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">Primary CTA</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="primary" size="lg">
                Large primary
              </Button>
              <Button variant="outline" size="sm">
                Small outline
              </Button>
            </div>
          </section>

          {/* Section label */}
          <section className="space-y-6">
            <SectionLabel number="04" title="Section labels" />
            <div className="space-y-3">
              <SectionLabel number="01" title="Who We Are" />
              <br />
              <SectionLabel number="02" title="AI Solutions" />
              <br />
              <SectionLabel number="09" title="Why AILO" />
            </div>
          </section>

          {/* Cards */}
          <section className="space-y-6">
            <SectionLabel number="05" title="Feature cards" />
            <div className="grid gap-4 md:grid-cols-3">
              <FeatureCard
                icon={<Sparkles className="h-5 w-5" />}
                title="Build"
                description="Websites, apps, software & AI systems engineered to last."
              />
              <FeatureCard
                eyebrow="Pillar"
                title="Automate"
                description="Workflows, support & operations handled by AI."
              />
              <FeatureCard title="Grow" description="Content, SEO & paid media that compounds reach." />
            </div>
          </section>

          {/* Stats */}
          <section className="space-y-6">
            <SectionLabel number="06" title="Stat blocks" />
            <div className="grid gap-8 md:grid-cols-3">
              <StatBlock value="9" label="Service Domains" gradient />
              <StatBlock value="50+" label="Capabilities" />
              <StatBlock value="1" label="Partner for all of IT" gradient />
            </div>
          </section>
        </Container>
      </main>
      <SiteFooter />
    </div>
  );
}
