import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Common 16:9 container for animated "how it works" visuals.
 * Designed to be swapped 1-for-1 with an MP4 / Lottie later without
 * changing the surrounding card layout.
 */
export function MediaSlot({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative aspect-video w-full overflow-hidden rounded-lg border border-border bg-background/40",
        className,
      )}
    >
      <div className="absolute inset-0">{children}</div>
    </div>
  );
}
