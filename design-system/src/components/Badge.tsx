import * as React from "react";
import { cn } from "../lib/cn";

export type BadgeTone = "terra" | "slate" | "ink" | "neutral";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Status color. `terra` = action/urgent, `slate` = info/approval, `ink` = strong, `neutral` = muted. */
  tone?: BadgeTone;
}

const TONE: Record<BadgeTone, string> = {
  terra: "bg-pat-terra-100 text-pat-terra-600",
  slate: "bg-pat-slate-100 text-pat-slate",
  ink: "bg-pat-ink text-pat-paper",
  neutral: "bg-pat-paper2 text-pat-ink-500",
};

/**
 * Compact status label for inline state (permission levels, task status, "Auto" / "Approval required").
 *
 * @example
 * <Badge tone="terra">Auto</Badge>
 * <Badge tone="slate">Approval required</Badge>
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ tone = "neutral", className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium uppercase tracking-[0.1em]",
        TONE[tone],
        className,
      )}
      {...props}
    />
  ),
);

Badge.displayName = "Badge";
