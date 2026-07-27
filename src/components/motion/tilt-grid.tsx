import { useEffect, useRef, type ReactNode } from "react";
import { ensureGsap, prefersReducedMotion } from "@/lib/motion/gsap";
import { cn } from "@/lib/utils";

/**
 * Wraps a grid container. On first enter, its direct children settle in with
 * a subtle 3D tilt + lift, staggered. No fade-up-on-every-section feel.
 */
export function TiltGrid({
  children,
  className,
  stagger = 0.035,
  as: As = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  as?: keyof React.JSX.IntrinsicElements;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;
    const { gsap, ScrollTrigger } = ensureGsap();
    const items = Array.from(el.children) as HTMLElement[];
    if (!items.length) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 90%",
        once: true,
        onEnter: () => {
          gsap.fromTo(
            items,
            { opacity: 0, y: 14, rotateX: -6 },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              transformPerspective: 1000,
              transformOrigin: "50% 100%",
              duration: 0.45,
              ease: "power3.out",
              stagger,
              clearProps: "opacity,transform",
            },
          );
        },
      });
    }, el);

    return () => ctx.revert();
  }, [stagger]);

  const Tag = As as any;
  return (
    <Tag ref={ref} className={cn(className)} style={{ perspective: 1200 }}>
      {children}
    </Tag>
  );
}
