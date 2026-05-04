#!/usr/bin/env node
/**
 * Generates public/grace/intro/index.html from public/grace/full/index.html
 * by removing slide 8 (the pricing slide) and its corresponding speaker note.
 *
 * Run via `npm run build:grace` or automatically as part of `prebuild`.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'public/grace/full/index.html');
const DEST = path.join(ROOT, 'public/grace/intro/index.html');

const PRICING_MARKER = '<!-- Slide 8: The Math -->';
const PRICING_NOTE_SUBSTR = 'The math:';

function stripPricingSection(html) {
  const start = html.indexOf(PRICING_MARKER);
  if (start === -1) {
    throw new Error(`Pricing slide marker not found: ${PRICING_MARKER}`);
  }
  // Find the closing </section> for slide 8 (the next </section> after the marker)
  const endTag = '</section>';
  const endIdx = html.indexOf(endTag, start);
  if (endIdx === -1) {
    throw new Error('Could not find closing </section> for pricing slide');
  }
  const sectionEnd = endIdx + endTag.length;
  // Eat the trailing newline + indentation before the next slide so we don't leave a blank gap
  let trimEnd = sectionEnd;
  while (trimEnd < html.length && /[\s]/.test(html[trimEnd])) trimEnd++;
  // Also trim leading whitespace before the marker on its own line
  let trimStart = start;
  while (trimStart > 0 && html[trimStart - 1] !== '\n') trimStart--;
  return html.slice(0, trimStart) + html.slice(trimEnd) + '\n';
}

function stripPricingNote(html) {
  // The speaker notes JSON lives in <script id="speaker-notes">[ ... ]</script>.
  // Each note is a quoted string on its own line, comma-separated.
  const scriptRe = /(<script type="application\/json" id="speaker-notes">\s*)(\[[\s\S]*?\])(\s*<\/script>)/;
  const m = html.match(scriptRe);
  if (!m) throw new Error('speaker-notes script not found');
  const notes = JSON.parse(m[2]);
  const idx = notes.findIndex((n) => n.includes(PRICING_NOTE_SUBSTR));
  if (idx === -1) {
    throw new Error(`Pricing speaker note not found (substring "${PRICING_NOTE_SUBSTR}")`);
  }
  notes.splice(idx, 1);
  // Re-serialize with the same one-note-per-line shape used in the source
  const serialized = '[\n  ' + notes.map((n) => JSON.stringify(n)).join(',\n  ') + '\n]';
  return html.replace(scriptRe, `$1${serialized}$3`);
}

function main() {
  const src = fs.readFileSync(SRC, 'utf8');
  let out = stripPricingNote(src);
  out = stripPricingSection(out);
  // Update the page title so the intro version is distinguishable in browser tabs
  out = out.replace(
    /<title>[^<]*<\/title>/,
    '<title>Grace — Personal Assistant for Small Business</title>'
  );
  fs.mkdirSync(path.dirname(DEST), { recursive: true });
  fs.writeFileSync(DEST, out);
  console.log(`Wrote ${path.relative(ROOT, DEST)} (${out.length} bytes)`);
}

main();
