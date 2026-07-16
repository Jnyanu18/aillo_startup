import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, type ReactNode } from "react";

export function Magnetic({
  children,
  strength = 0.25,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    x.set(dx * strength);
    y.set(dy * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };
  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
