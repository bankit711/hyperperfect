# Patricia / Grace design system

A warm, editorial design language: serif display headings with coral italic emphasis, DM Sans body, and a paper-and-rust palette. Build screens from the real components below; for your own layout glue, use the `pat-*` Tailwind utilities so it matches the system.

## Setup

- **No provider or theme wrapper.** Every component is self-styled. Load the bundle's `styles.css` once (it `@import`s the brand fonts and all component styling) and render any component directly.
- **Fonts ship with the CSS:** DM Serif Display (headings) and DM Sans (body) load via `styles.css`. Do not substitute them; the look depends on them.

## Components (`window.PatriciaDS`)

`Button`, `Card`, `Heading` + `Emphasis`, `Eyebrow`, `Pill`, `Badge`, `Avatar`, `StatusDot`. Each component's `.d.ts` is the API contract and its `.prompt.md` shows usage. Key APIs:

- `Heading` `level={1|2|3}` (serif display). Wrap spotlighted words in `Emphasis` for the italic-coral treatment: `<Heading level={1}>Meet <Emphasis>Patricia.</Emphasis></Heading>`.
- `Button` `variant`: `primary` (rust CTA), `secondary` (coral outline), `solid-ink` (charcoal), `ghost`; `size` `sm|md|lg`; `shape` `rounded|pill`.
- `Card` `variant`: `paper` (warm tan), `white` (elevated), `ink` (dark); `padding` `sm|md|lg`.
- `Badge` `tone`: `terra|slate|ink|neutral`. `Pill` `variant`: `solid|outline`. `StatusDot` `tone` `terra|slate`, `pulse`. `Eyebrow` `color` `slate|terra`. `Avatar` `size` `sm|md|lg|xl`, `ring`.

## Styling idiom — Tailwind utilities, the `pat-*` palette

Style your own layout with these classes (the components use them internally; all resolve in `styles.css`):

- **Background:** `bg-pat-paper` `bg-pat-paper2` `bg-pat-terra` `bg-pat-terra-600` `bg-pat-terra-500` `bg-pat-terra-200` `bg-pat-terra-100` `bg-pat-slate` `bg-pat-slate-700` `bg-pat-slate-400` `bg-pat-slate-100` `bg-pat-ink` `bg-pat-ink-700` `bg-pat-ink-500` `bg-pat-ink-300`
- **Text:** the same names with `text-` — body `text-pat-ink`, secondary `text-pat-ink-700`, muted `text-pat-ink-500`, accent `text-pat-terra-600`, info `text-pat-slate`
- **Border:** `border-pat-terra-200` (default), `border-pat-terra-100` (subtle)
- **Type:** `font-serif` (DM Serif Display) for display, `font-dm` (DM Sans) for body/UI. Coral italic emphasis = `italic text-pat-terra-600`.
- **Kickers / small-caps labels:** `uppercase tracking-[0.18em] text-pat-slate` (or `text-pat-terra-600`)
- **Radius:** `rounded-xl` (buttons), `rounded-2xl` (cards), `rounded-full` (pills, dots, avatars)

Palette anchors: paper `#FCF7F0`, coral/terra `#A84A2F`, teal/slate `#5B91A8`, charcoal/ink `#2A1A14`. Numeric steps run dark (700/900) to light (100).

## Where the truth lives

The bundle's `styles.css` (and its `@import` closure) is the full stylesheet — read it before styling. Each component's `.d.ts` is its API; its `.prompt.md` is its usage reference.

## Idiomatic example

```tsx
<section className="bg-pat-paper px-6 py-24">
  <Eyebrow color="terra">Patricia · Personal Assistant</Eyebrow>
  <Heading level={1}>Meet <Emphasis>Patricia.</Emphasis></Heading>
  <p className="font-dm text-pat-ink-700 mt-6 max-w-xl">
    Your inbox, calendar, and follow-ups handled around the clock.
  </p>
  <div className="flex gap-3 mt-8">
    <Button variant="primary">Join the Waitlist</Button>
    <Button variant="secondary">Learn more</Button>
  </div>
</section>
```
