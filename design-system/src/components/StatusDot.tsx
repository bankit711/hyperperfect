import * as React from "react";
import { cn } from "../lib/cn";

export type StatusDotTone = "terra" | "slate";
export type StatusDotSize = "sm" | "md";

export interface StatusDotProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** `terra` = active/working, `slate` = available/here. */
  tone?: StatusDotTone;
  size?: StatusDotSize;
  /** Soft pulse to signal live activity. */
  pulse?: boolean;
}

const TONE: Record<StatusDotTone, string> = {
  terra: "bg-pat-terra-500",
  slate: "bg-pat-slate",
};

const SIZE: Record<StatusDotSize, string> = {
  sm: "w-2 h-2",
  md: "w-3.5 h-3.5",
};

/**
 * Small status indicator dot, paired with a label or shown standalone.
 *
 * @example
 * <StatusDot tone="slate" /> here
 * <StatusDot tone="terra" pulse /> working
 */
export const StatusDot = React.forwardRef<HTMLSpanElement, StatusDotProps>(
  ({ tone = "slate", size = "sm", pulse = false, className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-block rounded-full",
        TONE[tone],
        SIZE[size],
        pulse && "animate-pulse",
        className,
      )}
      {...props}
    />
  ),
);

StatusDot.displayName = "StatusDot";
