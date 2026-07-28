import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
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
 * once when the element enters the viewport.
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
  const reduce = useReducedMotion();
  if (reduce) {
    return <div className={cn(className)}>{children}</div>;
  }
  const o = OFFSETS[from];
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, x: o.x, y: o.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-40px", amount: 0.1 }}
      transition={{ duration: 0.35, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
