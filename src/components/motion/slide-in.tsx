import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
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
  const reduce = useReducedMotion();
  if (reduce) {
    return <div className={cn(className)}>{children}</div>;
  }
  const x = from === "left" ? -18 : from === "right" ? 18 : 0;
  const y = from === "bottom" ? 18 : 0;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-40px", amount: 0.1 }}
      transition={{ duration: 0.35, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
