# design-sync notes — Patricia Design System

Repo-specific gotchas for future syncs of `@hyperperfect/design-system`.

## Setup facts

- Package shape (no Storybook). Source of truth for tokens is `src/tokens/tokens.json`; the website consumes it via `tailwind-preset.cjs`, the ai-assistant app via `scripts/emit-app-css.mjs`.
- Build: `npm run build` (vite lib build → `dist/index.js`, then `tsc` d.ts, then `build:css` → `dist/styles.css`). Entry for the converter: `./dist/index.js`.
- Styling: components use Tailwind `pat-*` utility classes; `npm run build:css` compiles them (with the shared preset) into `dist/styles.css` with literal color values. That file is `cfg.cssEntry`.
- 8 primitives, all in `src/components/`: Button, Card, Eyebrow, Heading (+Emphasis), Pill, Badge, Avatar, StatusDot. Each has a JSDoc usage example the converter reads.

## Re-sync risks

- `dist/styles.css` is Tailwind-compiled from the classes the components reference. If a primitive starts using a `pat-*` class no other component uses, rebuild `build:css` so the utility is emitted, or it renders unstyled.
- Tokens live in `src/tokens/tokens.json`. Editing hexes there is the intended path; both website and app derive from it. Do not edit `tailwind-preset.cjs` or the app CSS by hand.
- Fonts (DM Serif Display, DM Sans) are loaded by the host app via `next/font` (`--font-dm-serif` / `--font-dm-sans` CSS variables), not shipped by this package. The bundle pulls them from Google Fonts via an `@import` at the top of `src/styles.css` so synced designs render on-brand.
- The full `pat-*` palette (bg/text/border/ring across every step) plus `font-serif`/`font-dm` is **safelisted** in `tailwind.config.cjs` so the shipped `styles.css` carries the whole token vocabulary, not just what the 9 primitives reference. If you add palette steps to `tokens.json`, widen the safelist pattern too.

## Known render warns

- `[FONT_REMOTE]` "DM Serif Display" / "DM Sans" — expected and intended. Fonts load at runtime from Google Fonts via the `styles.css` `@import`. Not a new warn.

## Codex pre-commit review findings (resolved)

- **Radius regression (fixed):** an earlier draft of `tokens.json`/preset added `xl`=16px and `2xl`=24px, which the website's original config never overrode — that would have resized every `rounded-xl` (12→16) and `rounded-2xl` (16→24) on the live site. Removed from tokens + preset; both now fall through to Tailwind defaults. **Do not re-add xl/2xl radius overrides** without accepting a site-wide visual change.
- **Uploaded-bundle skew:** the FIRST sync's bundle was built when `2xl`=24px, so its Card preview cards render at 24px. Source now yields the Tailwind default 16px. A re-sync will bring the bundle's `rounded-2xl` to 16px (matching the website). Expected, not a regression.
- **Font fallback (intentional):** the preset adds `'DM Serif Display'` / `'DM Sans'` named families into the font stacks. Primary `var(--font-*)` is unchanged and first, so website rendering is identical; the named family is required for the synced bundle (no CSS var there). Benign, do not "revert to match original."
- **dist-pointing exports:** `package.json` main/module/types point at gitignored `dist/`. The website consumes only the preset via relative `require` (not the package entry), so nothing imports the dist entry yet. When Phase 3 (website refactor to use primitives) lands, decide source-vs-dist consumption.
- **Phase 5 drift guard:** `emit-app-css.mjs` output must be copied into the ai-assistant app. When wiring it, add a CI check that the committed app token CSS matches fresh emitter output, or the manual copy reintroduces drift.

## Sync status

- First sync completed: project `57eda2c3-bf6f-4217-95d0-376f31e7334c` ("Patricia Design System"), 9 components, all previews authored and graded good, render check clean. Incremental upload path (created empty, uploaded in one close-out pass).
