import { useEffect, useRef } from "react";

/**
 * Fixed full-viewport layer with a soft radial glow that follows the cursor.
 * Sits above the ambient backdrop, below content. Pointer-events: none.
 */
export function MouseSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;

    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let cx = tx;
    let cy = ty;

    const tick = () => {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      el.style.setProperty("--sx", `${cx}px`);
      el.style.setProperty("--sy", `${cy}px`);
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        background:
          "radial-gradient(420px circle at var(--sx, 50%) var(--sy, 50%), rgba(255, 170, 130, 0.10), rgba(167, 139, 250, 0.05) 35%, transparent 65%)",
        mixBlendMode: "screen",
      }}
    />
  );
}
