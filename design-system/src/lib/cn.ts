/**
 * Minimal class-name joiner. Falsy values are dropped; every primitive passes the consumer's
 * className last so their declarations follow the defaults in source order. This does NOT do
 * Tailwind-aware conflict resolution (no tailwind-merge) — for hard overrides the consumer may
 * still need a more specific class. Kept dependency-free so consuming the library adds no runtime packages.
 */
export type ClassValue = string | number | false | null | undefined;

export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}
