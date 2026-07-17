import { Container } from "@/components/ui/container";
import { SOCIAL_LINKS, CONTACT_PHONE_DISPLAY, CONTACT_PHONE_INTL } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-transparent backdrop-blur-xl">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-5">
          <div className="md:col-span-2">
            <div className="font-display text-2xl font-bold">
              AILO<span className="text-gradient">.</span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Acceleration logics for modern business. One technology partner for everything you
              need to scale.
            </p>
          </div>

          <div>
            <div className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Contact
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href="mailto:info@accelerationlogics.com"
                  className="hover:text-gradient transition-colors"
                >
                  info@accelerationlogics.com
                </a>
              </li>
              <li>
                <a href={`tel:+${CONTACT_PHONE_INTL}`} className="hover:text-gradient transition-colors">
                  {CONTACT_PHONE_DISPLAY}
                </a>
              </li>
              <li className="text-muted-foreground">www.accelerationlogics.com</li>

            </ul>
          </div>

          <div>
            <div className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Follow
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              {SOCIAL_LINKS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Explore
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="/solutions" className="text-muted-foreground hover:text-foreground">
                  Solutions
                </a>
              </li>
              <li>
                <a href="/services" className="text-muted-foreground hover:text-foreground">
                  Services
                </a>
              </li>
              <li>
                <a href="/work" className="text-muted-foreground hover:text-foreground">
                  Client work
                </a>
              </li>
              <li>
                <a href="/hire" className="text-muted-foreground hover:text-foreground">
                  Hire / Trainings
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <div>© {new Date().getFullYear()} AILO. All rights reserved.</div>
          <div>Built for SMEs. Engineered to last.</div>
        </div>
      </Container>
    </footer>
  );
}
