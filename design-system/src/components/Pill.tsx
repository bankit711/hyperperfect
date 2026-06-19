import * as React from "react";
import { cn } from "../lib/cn";

export type PillVariant = "solid" | "outline";

export interface PillProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** `solid` is the filled coral chip (announcements); `outline` is the bordered suggestion chip. */
  variant?: PillVariant;
}

const VARIANT: Record<PillVariant, string> = {
  solid: "bg-pat-terra-100 border border-pat-terra-200 text-pat-terra",
  outline: "bg-transparent border border-pat-terra-200 text-pat-ink-700",
};

/**
 * Fully-rounded chip for announcements, tags, and suggestion prompts.
 *
 * @example
 * <Pill variant="solid">Early access</Pill>
 * <Pill variant="outline">What can you do?</Pill>
 */
export const Pill = React.forwardRef<HTMLSpanElement, PillProps>(
  ({ variant = "solid", className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em]",
        VARIANT[variant],
        className,
      )}
      {...props}
    />
  ),
);

Pill.displayName = "Pill";
