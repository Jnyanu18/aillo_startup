import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Marquee({
  items,
  duration = 40,
  className = "",
}: {
  items: ReactNode[];
  duration?: number;
  className?: string;
}) {
  const loop = [...items, ...items];
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
      >
        {loop.map((it, i) => (
          <div key={i} className="shrink-0 text-sm uppercase tracking-[0.25em] text-white/40">
            {it}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
