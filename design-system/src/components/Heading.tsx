import * as React from "react";
import { cn } from "../lib/cn";

export type HeadingLevel = 1 | 2 | 3;

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** Visual + semantic size. Renders the matching h1/h2/h3 unless `as` overrides the tag. */
  level?: HeadingLevel;
  /** Override the rendered element while keeping a level's styling. */
  as?: "h1" | "h2" | "h3" | "h4";
}

const LEVEL: Record<HeadingLevel, string> = {
  1: "font-serif text-6xl md:text-7xl xl:text-8xl leading-[0.95] tracking-tight",
  2: "font-serif text-4xl md:text-6xl leading-[1.05] tracking-tight",
  3: "font-serif text-2xl md:text-3xl leading-tight",
};

/**
 * Serif display heading in the Patricia voice. Wrap emphasized words in <Emphasis>
 * for the italic-coral treatment.
 *
 * @example
 * <Heading level={1}>Meet <Emphasis>Patricia.</Emphasis></Heading>
 * <Heading level={2} as="h3">A day with Patricia</Heading>
 */
export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ level = 2, as, className, ...props }, ref) => {
    const Tag = (as ?? `h${level}`) as "h1" | "h2" | "h3" | "h4";
    return <Tag ref={ref} className={cn("text-pat-ink", LEVEL[level], className)} {...props} />;
  },
);

Heading.displayName = "Heading";

export interface EmphasisProps extends React.HTMLAttributes<HTMLSpanElement> {}

/**
 * Italic coral emphasis span, used inside <Heading> to spotlight a phrase.
 *
 * @example
 * <Heading level={1}>Meet <Emphasis>Patricia.</Emphasis></Heading>
 */
export const Emphasis = React.forwardRef<HTMLSpanElement, EmphasisProps>(
  ({ className, ...props }, ref) => (
    <span ref={ref} className={cn("italic text-pat-terra-600", className)} {...props} />
  ),
);

Emphasis.displayName = "Emphasis";
