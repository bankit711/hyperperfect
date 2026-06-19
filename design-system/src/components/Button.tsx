import * as React from "react";
import { cn } from "../lib/cn";

export type ButtonVariant = "primary" | "secondary" | "solid-ink" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";
export type ButtonShape = "rounded" | "pill";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual emphasis. `primary` is the rust CTA; `solid-ink` is the charcoal app-style action. */
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Corner treatment. `pill` is fully rounded (announcements, chips-as-buttons). */
  shape?: ButtonShape;
}

const VARIANT: Record<ButtonVariant, string> = {
  primary: "bg-pat-terra text-pat-paper hover:bg-pat-terra-600",
  secondary: "bg-transparent text-pat-ink border border-pat-terra-200 hover:bg-pat-terra-100",
  "solid-ink": "bg-pat-ink text-pat-paper hover:bg-pat-terra",
  ghost: "bg-transparent text-pat-ink-700 hover:text-pat-terra hover:bg-pat-terra-100/60",
};

const SIZE: Record<ButtonSize, string> = {
  sm: "text-sm px-4 py-2",
  md: "text-base px-6 py-2.5",
  lg: "text-lg px-8 py-4",
};

const SHAPE: Record<ButtonShape, string> = {
  rounded: "rounded-xl",
  pill: "rounded-full",
};

/**
 * Primary interactive control for the Patricia design system.
 *
 * @example
 * <Button variant="primary" onClick={join}>Join the Waitlist</Button>
 * <Button variant="secondary" size="sm">Learn more</Button>
 * <Button variant="solid-ink" shape="pill">Continue</Button>
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", shape = "rounded", className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pat-terra-200 disabled:opacity-50 disabled:pointer-events-none",
        VARIANT[variant],
        SIZE[size],
        SHAPE[shape],
        className,
      )}
      {...props}
    />
  ),
);

Button.displayName = "Button";
