import type { ReactNode } from "react";

export type GlyphAnim = "spin" | "pulse" | "tick" | "bob" | "shimmer" | "scan";

/**
 * Wraps a (lucide) icon in a tasteful, slow, looping motion via CSS keyframes
 * (see .glyph-* in styles.css). Kept subtle on purpose: glyphs in service
 * tiles should not steal focus from the hero stack diagram in Section 03.
 * prefers-reduced-motion is handled by the global transition/animation-
 * duration override in styles.css.
 */
export function AnimatedGlyph({ animation, children }: { animation: GlyphAnim; children: ReactNode }) {
  return <span className={`inline-flex glyph-${animation}`}>{children}</span>;
}
