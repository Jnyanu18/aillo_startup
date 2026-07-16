import { useEffect, useRef } from "react";
import { ensureGsap, prefersReducedMotion } from "@/lib/motion/gsap";
import { cn } from "@/lib/utils";

/**
 * Odometer-style number that rolls digits up once when it enters view.
 * Accepts any string (e.g. "01", "08.5"). Non-digit chars render static.
 */
export function OdometerNumber({
  value,
  className,
  digitClassName,
}: {
  value: string;
  className?: string;
  digitClassName?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;
    const { gsap, ScrollTrigger } = ensureGsap();
    const digits = el.querySelectorAll<HTMLElement>("[data-odometer-digit]");
    if (!digits.length) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 95%",
        once: true,
        onEnter: () => {
          gsap.from(digits, {
            yPercent: -110,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.06,
          });
        },
      });
    }, el);

    return () => ctx.revert();
  }, [value]);

  return (
    <span ref={ref} className={cn("inline-flex items-baseline", className)}>
      {value.split("").map((ch, i) => {
        const isDigit = /\d/.test(ch);
        if (!isDigit) {
          return (
            <span key={i} className="inline-block">
              {ch}
            </span>
          );
        }
        return (
          <span
            key={i}
            className="inline-block overflow-hidden align-baseline"
            style={{ height: "1em", lineHeight: 1 }}
          >
            <span
              data-odometer-digit
              className={cn("inline-block", digitClassName)}
              style={{ willChange: "transform" }}
            >
              {ch}
            </span>
          </span>
        );
      })}
    </span>
  );
}
