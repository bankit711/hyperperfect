/**
 * Tailwind preset for the Patricia / Grace design system.
 *
 * Derived entirely from tokens/tokens.json (the single source of truth). Consume it
 * from a Tailwind config via `presets: [require('./design-system/tailwind-preset.cjs')]`.
 * It contributes the `pat-*` color namespace, the serif/sans families, radii, and shadows.
 * It deliberately does NOT define the HyperPerfect-Excel (`brand`/`surface`/`hp-*`) palette,
 * which is a separate product identity and stays in the consuming config.
 */
const tokens = require("./src/tokens/tokens.json");

const { color, font, radius, shadow } = tokens;

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        serif: font.serif.split(",").map((s) => s.trim()),
        dm: font.sans.split(",").map((s) => s.trim()),
      },
      colors: {
        // Patricia personal-assistant palette. Same hexes the ai-assistant app ships
        // as --coral-* / --teal-* / --charcoal-*; named pat-terra / pat-slate / pat-ink here.
        pat: {
          paper: color.paper.DEFAULT,
          paper2: color.paper["2"],
          terra: {
            DEFAULT: color.coral["700"],
            600: color.coral["600"],
            500: color.coral["500"],
            200: color.coral["200"],
            100: color.coral["100"],
          },
          slate: {
            DEFAULT: color.teal["500"],
            700: color.teal["700"],
            400: color.teal["400"],
            100: color.teal["100"],
          },
          ink: {
            DEFAULT: color.charcoal["900"],
            700: color.charcoal["700"],
            500: color.charcoal["500"],
            300: color.charcoal["300"],
          },
        },
      },
      // Only the radii the website already overrode (sm/DEFAULT/md/lg/full). xl/2xl are left
      // to Tailwind's defaults on purpose — overriding them would silently resize every
      // rounded-xl / rounded-2xl on the existing site.
      borderRadius: {
        sm: radius.sm,
        DEFAULT: radius.md,
        md: radius.md,
        lg: radius.lg,
        full: radius.full,
      },
      boxShadow: {
        card: shadow.card,
        "card-hover": shadow["card-hover"],
        input: shadow.input,
        hero: shadow.hero,
        warm: shadow.warm,
        "warm-lg": shadow["warm-lg"],
        popover: shadow.popover,
      },
    },
  },
};
