import { cn } from "@/lib/utils";
import { OdometerNumber } from "@/components/motion/odometer-number";

interface SectionLabelProps {
  number: string;
  title: string;
  className?: string;
}

export function SectionLabel({ number, title, className }: SectionLabelProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground",
        className,
      )}
    >
      <OdometerNumber value={number} className="text-gradient font-display text-sm" />
      <span className="h-px w-8 bg-border" />
      <span>{title}</span>
    </div>
  );
}
