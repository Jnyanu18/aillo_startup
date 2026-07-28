import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Above-the-fold hero content renders statically -- the site's one
 * animation is the scroll-triggered slide (see Reveal), not a mount effect.
 */
export function HeroIntro({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return <div className={cn(className)}>{children}</div>;
}
