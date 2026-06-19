import * as React from "react";
import { cn } from "../lib/cn";

export type CardVariant = "paper" | "white" | "ink";
export type CardPadding = "sm" | "md" | "lg";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Surface treatment. `paper` is the warm tan panel; `white` is the elevated hero card; `ink` is the dark inverted panel. */
  variant?: CardVariant;
  padding?: CardPadding;
}

const VARIANT: Record<CardVariant, string> = {
  paper: "bg-pat-paper2/60 border border-pat-terra-100 text-pat-ink",
  white: "bg-white border border-pat-terra-200 text-pat-ink shadow-warm-lg",
  ink: "bg-pat-ink text-pat-paper",
};

const PADDING: Record<CardPadding, string> = {
  sm: "p-5",
  md: "p-7",
  lg: "p-10",
};

/**
 * Rounded surface container for grouped content (feature panels, hire cards, permission lists).
 *
 * @example
 * <Card variant="white" padding="md">…</Card>
 * <Card variant="paper">…</Card>
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant = "paper", padding = "md", className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("rounded-2xl", VARIANT[variant], PADDING[padding], className)}
      {...props}
    />
  ),
);

Card.displayName = "Card";
