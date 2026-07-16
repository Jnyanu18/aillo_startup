import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function CursorFollower() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 400, damping: 32, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 400, damping: 32, mass: 0.4 });
  const [hover, setHover] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const onOver = (e: PointerEvent) => {
      const t = e.target as HTMLElement | null;
      setHover(!!t?.closest("a, button, [role='button'], input, textarea, select, [data-cursor='hover']"));
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* Inner dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{ x: sx, y: sy }}
      >
        <motion.div
          animate={{ scale: hover ? 0 : 1 }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
          className="h-2 w-2 rounded-full bg-white"
        />
      </motion.div>
      {/* Ring on hover */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9998] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{ x: sx, y: sy }}
      >
        <motion.div
          animate={{ scale: hover ? 1 : 0.4, opacity: hover ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 26 }}
          className="h-9 w-9 rounded-full border border-white"
        />
      </motion.div>
    </>
  );
}
