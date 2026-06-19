/**
 * Tailwind config for the design system's OWN css build (dist/styles.css). Scans the
 * primitives and applies the shared preset so the compiled utilities match what the
 * website renders. Consumers use ./tailwind-preset.cjs, not this file.
 */
module.exports = {
  presets: [require("./tailwind-preset.cjs")],
  content: ["./src/**/*.{ts,tsx}"],
  // The synced bundle is a design system: the design agent composes layouts with the full
  // pat-* palette, not just the utilities the 9 primitives happen to reference. Safelist the
  // whole token vocabulary so every documented class resolves in the shipped styles.css.
  safelist: [
    {
      pattern:
        /(bg|text|border|ring)-pat-(paper|paper2|terra|slate|ink)(-(100|200|300|400|500|600|700))?/,
    },
    "font-serif",
    "font-dm",
  ],
};
