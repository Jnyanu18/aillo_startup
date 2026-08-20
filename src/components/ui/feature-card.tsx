import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

interface FeatureCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  icon?: ReactNode;
  eyebrow?: string;
}

/**
 * Dark surface card with hairline border + subtle gradient border on hover.
 * Separate from shadcn `Card` to avoid changing primitive shadcn semantics.
 */
export function FeatureCard({
  title,
  description,
  icon,
  eyebrow,
  className,
  children,
  ...props
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        "group glass-card relative p-6 transition-all duration-300 hover:-translate-y-0.5",
        className,
      )}
      {...props}
    >
      {/* a single accent edge draws in on hover -- line, not a flood */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-50"
        style={{
          padding: "1px",
          background: "linear-gradient(135deg, transparent, var(--primary), transparent)",
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      <div className="relative">
        {eyebrow && (
          <div className="mb-3 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            {eyebrow}
          </div>
        )}
        {icon && <div className="mb-4 text-foreground/80">{icon}</div>}
        <h3 className="font-display text-lg font-semibold text-foreground">{title}</h3>
        {description && (
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
        )}
        {children}
      </div>
    </div>
  );
}
