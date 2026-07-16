import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Container({ className, children, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-7xl px-6 md:px-10 xl:max-w-[1440px] xl:px-16 2xl:max-w-[1600px] 2xl:px-20",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
