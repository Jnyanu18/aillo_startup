import type { CSSProperties, ReactNode, ElementType } from "react";
import { useInView } from "@/lib/use-in-view";
import { cn } from "@/lib/utils";

/**
 * Same "slide once on scroll" treatment as Reveal, for inline text runs.
 */
export function TextReveal({
  children,
  as: As = "span",
  className,
}: {
  children: ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLElement>({ margin: "-40px 0px -40px 0px", amount: 0.2 });
  const Tag = As as ElementType;
  const style: CSSProperties = {
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(12px)",
    transition: "opacity 0.35s ease-out, transform 0.35s ease-out",
  };
  return (
    <Tag ref={ref} className={cn("inline-block", className)} style={style}>
      {children}
    </Tag>
  );
}
