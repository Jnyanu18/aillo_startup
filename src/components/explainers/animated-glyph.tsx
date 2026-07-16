import type { ComponentProps, ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";


export type GlyphAnim = "spin" | "pulse" | "tick" | "bob" | "shimmer" | "scan";
type Anim = GlyphAnim;


/**
 * Wraps a (lucide) icon in a tasteful, slow, looping motion.
 * Kept subtle on purpose: glyphs in service tiles should not steal focus
 * from the hero stack diagram in Section 03.
 */
export function AnimatedGlyph({ animation, children }: { animation: Anim; children: ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <span className="inline-flex">{children}</span>;

  const anims: Record<Anim, ComponentProps<typeof motion.span>["animate"]> = {
    spin: { rotate: [0, 360] },
    pulse: { scale: [1, 1.12, 1], opacity: [1, 0.85, 1] },
    tick: { rotate: [0, 45, 45, 90, 90, 135, 135, 180, 180, 225, 225, 270, 270, 315, 315, 360] },
    bob: { y: [0, -3, 0] },
    shimmer: { opacity: [0.6, 1, 0.6] },
    scan: { x: [-2, 2, -2] },
  };

  const transitions: Record<Anim, ComponentProps<typeof motion.span>["transition"]> = {
    spin: { duration: 18, repeat: Infinity, ease: "linear" },
    pulse: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
    tick: { duration: 8, repeat: Infinity, ease: "linear" },
    bob: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
    shimmer: { duration: 2.6, repeat: Infinity, ease: "easeInOut" },
    scan: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
  };


  return (
    <motion.span
      className="inline-flex"
      animate={anims[animation]}
      transition={transitions[animation]}
    >
      {children}
    </motion.span>
  );
}
