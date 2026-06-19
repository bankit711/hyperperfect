#!/usr/bin/env node
/**
 * Emit the ai-assistant app's CSS custom properties from the canonical tokens.
 *
 * The app (FastAPI + Jinja2) cannot import the TS/Tailwind layer, so it consumes the
 * design system as a generated stylesheet of `--coral-* / --teal-* / --charcoal-* / --paper`
 * custom properties. Run this whenever tokens.json changes and copy the output into the
 * app's stylesheet (or write it to a file the app @imports).
 *
 *   node design-system/scripts/emit-app-css.mjs            # print to stdout
 *   node design-system/scripts/emit-app-css.mjs <out.css>  # write to file
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const tokens = JSON.parse(readFileSync(resolve(here, "../src/tokens/tokens.json"), "utf8"));
const { color, font, radius, shadow } = tokens;

const lines = [];
const push = (k, v) => lines.push(`  ${k}: ${v};`);

push("--paper", color.paper.DEFAULT);
push("--paper-2", color.paper["2"]);
lines.push("");
for (const [step, hex] of Object.entries(color.coral)) push(`--coral-${step}`, hex);
lines.push("");
for (const [step, hex] of Object.entries(color.teal)) push(`--teal-${step}`, hex);
lines.push("");
for (const [step, hex] of Object.entries(color.charcoal)) push(`--charcoal-${step}`, hex);
lines.push("");
push("--serif", font.serif.replace(/var\([^)]*\),\s*/, ""));
push("--sans", font.sans.replace(/var\([^)]*\),\s*/, ""));
lines.push("");
for (const [name, v] of Object.entries(radius)) push(`--radius-${name}`, v);
lines.push("");
for (const [name, v] of Object.entries(shadow)) push(`--shadow-${name}`, v);

const css = `/* GENERATED from design-system/tokens/tokens.json by emit-app-css.mjs. Do not edit by hand. */
:root {
${lines.join("\n")}
}
`;

const outArg = process.argv[2];
if (outArg) {
  writeFileSync(resolve(process.cwd(), outArg), css);
  process.stderr.write(`wrote ${outArg}\n`);
} else {
  process.stdout.write(css);
}
