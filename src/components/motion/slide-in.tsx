import type { CSSProperties, ReactNode } from "react";
import { useInView } from "@/lib/use-in-view";
import { cn } from "@/lib/utils";

/**
 * Thin alias over the same "slide once on scroll" treatment as Reveal,
 * kept as a separate component only so call sites can say "left"/"right".
 */
export function SlideIn({
  children,
  from = "left",
  delay = 0,
  className,
}: {
  children: ReactNode;
  from?: "left" | "right" | "bottom";
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>({ margin: "-40px", amount: 0.1 });
  const x = from === "left" ? -18 : from === "right" ? 18 : 0;
  const y = from === "bottom" ? 18 : 0;
  const style: CSSProperties = {
    opacity: inView ? 1 : 0,
    transform: inView ? "translate(0, 0)" : `translate(${x}px, ${y}px)`,
    transition: `opacity 0.35s ease-out ${delay}s, transform 0.35s ease-out ${delay}s`,
  };
  return (
    <div ref={ref} className={cn(className)} style={style}>
      {children}
    </div>
  );
}
