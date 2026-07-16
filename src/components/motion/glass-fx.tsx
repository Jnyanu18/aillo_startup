import { useEffect } from "react";

/**
 * Global effect: attaches subtle 3D tilt + per-card spotlight to every
 * `.glass-card` element on the page. Idempotent — safe to mount once at root.
 *
 * - Updates CSS vars `--mx`, `--my` (0-100%) for in-card light tracking.
 * - Applies a gentle rotateX/rotateY based on cursor position.
 */
export function GlassFx() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const MAX = 6; // deg

    const onMove = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const card = target.closest<HTMLElement>(".glass-card");
      if (!card) return;
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      const rx = (0.5 - py) * 2 * MAX;
      const ry = (px - 0.5) * 2 * MAX;
      card.style.setProperty("--mx", `${px * 100}%`);
      card.style.setProperty("--my", `${py * 100}%`);
      card.style.setProperty("--rx", `${rx}deg`);
      card.style.setProperty("--ry", `${ry}deg`);
      card.dataset.tilt = "1";
    };

    const onLeave = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      const card = target?.closest<HTMLElement>(".glass-card");
      if (!card) return;
      card.style.setProperty("--rx", `0deg`);
      card.style.setProperty("--ry", `0deg`);
      card.dataset.tilt = "0";
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerout", onLeave, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerout", onLeave);
    };
  }, []);

  return null;
}
