import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface CountUpProps {
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

/**
 * Animated number counter that runs once when it scrolls into view.
 * Respects prefers-reduced-motion.
 */
export function CountUp({ to, duration = 1.6, prefix = "", suffix = "", decimals = 0 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(reduce ? to : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    let raf = 0;
    const start = performance.now();
    const ease = (t: number) => 1 - Math.pow(1 - t, 3); // ease-out cubic
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      setValue(to * ease(t));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setValue(to);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, reduce]);

  return (
    <span ref={ref}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}
