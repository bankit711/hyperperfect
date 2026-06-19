import * as React from "react";
import { cn } from "../lib/cn";

export type EyebrowColor = "slate" | "terra";

export interface EyebrowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Accent color for the label text. */
  color?: EyebrowColor;
}

const COLOR: Record<EyebrowColor, string> = {
  slate: "text-pat-slate",
  terra: "text-pat-terra-600",
};

/**
 * Small-caps section label, optionally with a number and a rule. The recurring
 * "01 — The Problem" kicker above section headings.
 *
 * @example
 * <Eyebrow><span>01</span><span className="h-px w-14 bg-pat-slate" /><span>The Problem</span></Eyebrow>
 * <Eyebrow color="terra">Patricia · Personal Assistant</Eyebrow>
 */
export const Eyebrow = React.forwardRef<HTMLDivElement, EyebrowProps>(
  ({ color = "slate", className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center gap-4 text-sm font-medium uppercase tracking-[0.18em]",
        COLOR[color],
        className,
      )}
      {...props}
    />
  ),
);

Eyebrow.displayName = "Eyebrow";
