import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { ensureGsap, prefersReducedMotion } from "@/lib/motion/gsap";

export function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (prefersReducedMotion()) return;

    const { gsap, ScrollTrigger } = ensureGsap();
    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);
    const tickerCb = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCb);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
