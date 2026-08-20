import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";


const navLinks = [
  { href: "/solutions", label: "Solutions" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/hire", label: "Hire" },
  { href: "/#why", label: "Why AILO" },
];

interface SiteNavProps {
  onCtaClick?: () => void;
}

export function SiteNav({ onCtaClick }: SiteNavProps) {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();

  // On the homepage, "Why AILO" is a scroll-spy anchor; on other routes,
  // the active link is just whichever route we're on.
  const [hashActive, setHashActive] = useState(false);
  const activeHref = pathname === "/" ? (hashActive ? "/#why" : "") : pathname;

  useEffect(() => {
    let ticking = false;

    const compute = () => {
      ticking = false;
      const y = window.scrollY;
      if (pathname === "/") {
        const el = document.getElementById("why");
        setHashActive(!!el && y + 140 >= el.offsetTop);
      }

      const delta = y - lastY.current;
      if (y < 80) {
        setHidden(false);
      } else if (delta > 4) {
        setHidden(true);
      } else if (delta < -4) {
        setHidden(false);
      }
      lastY.current = y;
    };

    // Reading el.offsetTop forces a synchronous layout recalc, so it must be
    // capped to once per animation frame rather than run on every raw scroll
    // event -- native "scroll" fires far more often than 60fps on touch
    // devices, and doing this work uncapped is a direct cause of scroll jank.
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const handleBrandClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate({ to: "/" });
    }
  };

  return (
    <header
      className={cn(
        "ailo-nav-root fixed inset-x-0 top-0 z-50 px-4 pt-2 transition-transform duration-300 ease-out",
        hidden ? "-translate-y-full" : "translate-y-0",
      )}
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <nav className="ailo-nav mx-auto flex w-full max-w-5xl items-center justify-between rounded-lg px-4 py-1.5 md:px-5 md:py-2">
        {/* Brand */}
        <a href="#top" onClick={handleBrandClick} className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary">
            <div className="h-2 w-2 rounded-full bg-primary-foreground/50" />
          </div>
          <span className="ailo-nav-brand font-mono text-sm font-medium tracking-[0.04em]">AILO</span>
        </a>

        {/* Links */}
        <NavLinks activeHref={activeHref} />


        {/* Controls */}
        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <button
            onClick={onCtaClick}
            className="rounded-md bg-primary px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-primary-foreground transition-opacity hover:opacity-90"
          >
            Book a consultation
          </button>
        </div>


        {/* Mobile */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            aria-label="Toggle menu"
            className="ailo-nav-brand rounded-md p-2"
            onClick={() => setOpen((s) => !s)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="ailo-nav mx-auto mt-2 max-w-6xl rounded-lg p-4 md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="ailo-nav-link rounded-md px-3 py-3 font-mono text-sm"
              >
                {l.label}
              </a>
            ))}
            <button
              onClick={() => {
                setOpen(false);
                onCtaClick?.();
              }}
              className="mt-2 rounded-md bg-primary px-6 py-3 font-mono text-xs uppercase tracking-[0.1em] text-primary-foreground"
            >
              Book a consultation
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

/**
 * Desktop nav links with a sliding glass pill that fluidly tracks the active
 * link, and snaps to whichever link the cursor hovers over.
 */
function NavLinks({ activeHref }: { activeHref: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [pill, setPill] = useState<{ x: number; w: number; visible: boolean }>({
    x: 0,
    w: 0,
    visible: false,
  });
  const [hoverHref, setHoverHref] = useState<string | null>(null);

  const targetHref = hoverHref ?? activeHref;

  useEffect(() => {
    const update = () => {
      const el = linkRefs.current[targetHref];
      const c = containerRef.current;
      if (!el || !c) return;
      const r = el.getBoundingClientRect();
      const cr = c.getBoundingClientRect();
      setPill({ x: r.left - cr.left, w: r.width, visible: true });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [targetHref]);

  return (
    <div
      ref={containerRef}
      className="relative hidden items-center gap-1 md:flex"
      onMouseLeave={() => setHoverHref(null)}
    >
      {/* Sliding underline -- a line, not a filled pill */}
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-0 h-px bg-primary transition-all duration-300 ease-out"
        style={{
          left: pill.x,
          width: pill.w,
          opacity: pill.visible ? 1 : 0,
        }}
      />
      {navLinks.map((l) => (
        <a
          key={l.href}
          ref={(el) => {
            linkRefs.current[l.href] = el;
          }}
          href={l.href}
          onMouseEnter={() => setHoverHref(l.href)}
          className={cn(
            "ailo-nav-link relative z-10 rounded-md px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] transition-colors duration-200",
            activeHref === l.href && "is-active",
          )}
        >
          {l.label}
        </a>
      ))}
    </div>
  );
}

