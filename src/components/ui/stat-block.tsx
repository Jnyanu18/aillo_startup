import { cn } from "@/lib/utils";

interface StatBlockProps {
  value: string;
  label: string;
  className?: string;
  gradient?: boolean;
}

export function StatBlock({ value, label, className, gradient = false }: StatBlockProps) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <div
        className={cn(
          "font-display text-4xl font-semibold tracking-tight md:text-5xl",
          gradient && "text-gradient",
        )}
      >
        {value}
      </div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}
