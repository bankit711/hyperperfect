import * as React from "react";
import { cn } from "../lib/cn";

export type AvatarSize = "sm" | "md" | "lg" | "xl";

export interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  size?: AvatarSize;
  /** Coral ring around the avatar (the Patricia headshot treatment). */
  ring?: boolean;
}

const SIZE: Record<AvatarSize, string> = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-20 h-20",
  xl: "w-32 h-32",
};

/**
 * Circular headshot. Images are cropped to the top so faces stay framed.
 *
 * @example
 * <Avatar src="/patricia/patricia-400.png" alt="Patricia" size="md" ring />
 */
export const Avatar = React.forwardRef<HTMLImageElement, AvatarProps>(
  ({ size = "md", ring = true, className, alt = "", ...props }, ref) => (
    <img
      ref={ref}
      alt={alt}
      className={cn(
        "rounded-full object-cover object-top bg-pat-paper",
        ring && "ring-1 ring-pat-terra-200",
        SIZE[size],
        className,
      )}
      {...props}
    />
  ),
);

Avatar.displayName = "Avatar";
