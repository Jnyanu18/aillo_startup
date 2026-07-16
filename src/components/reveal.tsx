import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type From = "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";

const OFFSETS: Record<From, { x: number; y: number; scale?: number }> = {
  bottom: { x: 0, y: 60 },
  "top-left": { x: -70, y: -40 },
  "top-right": { x: 70, y: -40 },
  "bottom-left": { x: -70, y: 50 },
  "bottom-right": { x: 70, y: 50 },
  center: { x: 0, y: 0, scale: 0.92 },
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
      initial={{ opacity: 0, x: o.x, y: o.y, scale: o.scale ?? 0.96 }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px", amount: 0.15 }}
      transition={{
        type: "spring",
        stiffness: 90,
        damping: 15,
        mass: 1,
        delay,
        opacity: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      {children}
    </motion.div>
  );
}
