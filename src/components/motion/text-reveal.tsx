import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";
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
  const reduce = useReducedMotion();
  const Tag = As as any;
  if (reduce) {
    return <Tag className={cn("inline-block", className)}>{children}</Tag>;
  }
  const MotionTag = motion(As as any);
  return (
    <MotionTag
      className={cn("inline-block", className)}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px", amount: 0.2 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {children}
    </MotionTag>
  );
}
