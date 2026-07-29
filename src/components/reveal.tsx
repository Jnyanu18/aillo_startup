import type { CSSProperties, ReactNode } from "react";
import { useInView } from "@/lib/use-in-view";
import { cn } from "@/lib/utils";

type From = "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";

const OFFSETS: Record<From, { x: number; y: number }> = {
  bottom: { x: 0, y: 18 },
  "top-left": { x: -18, y: 0 },
  "top-right": { x: 18, y: 0 },
  "bottom-left": { x: -18, y: 18 },
  "bottom-right": { x: 18, y: 18 },
  center: { x: 0, y: 0 },
};

/**
 * The site's single scroll-reveal effect: a short fade + slide that plays
 * once when the element enters the viewport. Under prefers-reduced-motion,
 * the global transition-duration override (styles.css) collapses this to
 * an instant snap to the final state.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  from = "bottom",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  from?: From;
}) {
  const { ref, inView } = useInView<HTMLDivElement>({ margin: "-40px", amount: 0.1 });
  const o = OFFSETS[from];
  const style: CSSProperties = {
    opacity: inView ? 1 : 0,
    transform: inView ? "translate(0, 0)" : `translate(${o.x}px, ${o.y}px)`,
    transition: `opacity 0.35s ease-out ${delay}s, transform 0.35s ease-out ${delay}s`,
  };
  return (
    <div ref={ref} className={cn(className)} style={style}>
      {children}
    </div>
  );
}
