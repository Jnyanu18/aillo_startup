import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Common 16:9 container for animated "how it works" visuals.
 * Designed to be swapped 1-for-1 with an MP4 / Lottie later without
 * changing the surrounding card layout.
 *
 * Pauses every CSS animation inside it while off-screen -- these pages
 * stack up to a dozen of these, each with several infinite loops, and
 * having them all animate simultaneously regardless of visibility was
 * both wasted CPU and a large part of why Lighthouse's Speed Index
 * never saw the page "settle" (see .media-slot-paused in styles.css).
 */
export function MediaSlot({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(!!entry?.isIntersecting), {
      rootMargin: "80px",
      threshold: 0,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "relative aspect-video w-full overflow-hidden rounded-lg border border-border bg-background/40",
        !visible && "media-slot-paused",
        className,
      )}
    >
      <div className="absolute inset-0">{children}</div>
    </div>
  );
}
