/**
 * Typed accessor for the canonical design tokens.
 *
 * Re-exports tokens/tokens.json with types so component code and consumers get
 * autocomplete and compile-time safety. The JSON remains the single source of truth;
 * this file never redefines values.
 */
import tokensJson from "./tokens/tokens.json";

export interface DesignTokens {
  color: {
    paper: { DEFAULT: string; "2": string };
    coral: { "700": string; "600": string; "500": string; "200": string; "100": string };
    teal: { "700": string; "500": string; "400": string; "100": string };
    charcoal: { "900": string; "700": string; "500": string; "300": string };
  };
  font: { serif: string; sans: string };
  radius: { sm: string; md: string; lg: string; full: string };
  shadow: Record<string, string>;
}

export const tokens = tokensJson as unknown as DesignTokens;
