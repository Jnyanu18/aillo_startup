import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Number that fades + slides up once when it enters view.
 */
export function OdometerNumber({
  value,
  className,
  digitClassName,
}: {
  value: string;
  className?: string;
  digitClassName?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    el.style.opacity = "0";
    el.style.transform = "translateY(10px)";
    el.style.transition = "opacity 0.35s ease-out, transform 0.35s ease-out";

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
        observer.disconnect();
      },
      { threshold: 0.1, rootMargin: "0px 0px -20px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className={cn("inline-flex items-baseline", className)}>
      {value}
    </span>
  );
}
