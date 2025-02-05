import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={twMerge(
        // Base layout
        "flex min-h-screen w-full",
        // Content wrapper
        "flex-1 relative",
        // Transitions
        "transition-all duration-200",
        // Custom classes
        className,
      )}
    >
      {children}
    </div>
  );
}
