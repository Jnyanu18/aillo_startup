import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Wraps a grid container. On first enter, its direct children fade + slide
 * up once, staggered slightly. Operates on the mounted DOM children directly
 * (no wrapper elements) so it doesn't disturb the container's grid/flex
 * layout, whatever it is.
 */
export function TiltGrid({
  children,
  className,
  stagger = 0.05,
  as: As = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  as?: keyof React.JSX.IntrinsicElements;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = Array.from(el.children) as HTMLElement[];
    if (!items.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    items.forEach((item, i) => {
      item.style.opacity = "0";
      item.style.transform = "translateY(14px)";
      item.style.transition = `opacity 0.35s ease-out ${i * stagger}s, transform 0.35s ease-out ${i * stagger}s`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        items.forEach((item) => {
          item.style.opacity = "1";
          item.style.transform = "translateY(0)";
        });
        observer.disconnect();
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [stagger]);

  const Tag = As as any;
  return (
    <Tag ref={ref} className={cn(className)}>
      {children}
    </Tag>
  );
}
