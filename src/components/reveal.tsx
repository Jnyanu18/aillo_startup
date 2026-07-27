import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type From = "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";

const OFFSETS: Record<From, { x: number; y: number; scale?: number }> = {
  bottom: { x: 0, y: 24 },
  "top-left": { x: -28, y: -18 },
  "top-right": { x: 28, y: -18 },
  "bottom-left": { x: -28, y: 22 },
  "bottom-right": { x: 28, y: 22 },
  center: { x: 0, y: 0, scale: 0.96 },
};

/**
 * Scroll-triggered organic entrance using spring physics.
 * Cards glide in from staggered angles with a weighted soft-bounce.
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
      style={{ willChange: "transform, opacity" }}
      initial={{ opacity: 0, x: o.x, y: o.y, scale: o.scale ?? 0.98 }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px", amount: 0.1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 26,
        mass: 0.9,
        delay,
        opacity: { duration: 0.3, delay, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      {children}
    </motion.div>
  );
}
