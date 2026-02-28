# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

HyperPerfect is a Next.js marketing website for an Excel add-in that automates revenue analytics workflows. The site is deployed as a static site to GitHub Pages at www.hyperperfect.ai.

The actual Excel add-in codebase lives at `/Users/davidingraham/hyperperfect7` (separate repo).

## Commands

**Development:**
```bash
npm run dev          # Start development server
npm run lint         # Run ESLint
npm run build        # Build static site to /out directory
npm run test-build   # Build and serve locally for testing
```

**Deployment:**
```bash
npm run deploy       # Deploy to GitHub Pages (runs predeploy script first)
```

## Architecture

Next.js static site with Tailwind CSS and TypeScript.

### Pages

- `/` — Landing page (`app/page.tsx`, component in `components/landing-page.tsx`)
- `/help/` — Redirects to `/help/quick-start` (`app/help/page.tsx`)
- `/help/[slug]/` — Dynamic help articles (`app/help/[slug]/page.tsx`)
- `/pricing/` — Pricing page (`app/pricing/page.tsx`)
- `/cohort-demo/` — Cohort demo signup with Brevo form (`app/cohort-demo/page.tsx`)
- `/resources/ai-excel-challenge/` — AI Excel challenge resource page
- `/resources/claude-code-guide/` — Claude Code guide resource page

### API Routes

- `/api/brevo-webhook/` — Brevo email webhook handler
- `/api/cohort-demo/` — Cohort demo API endpoint

### Help System

Help articles are markdown files in `/content/help/` with frontmatter (title, description, order, category). The help library at `lib/help.ts` reads these files, parses frontmatter with `gray-matter`, and groups articles by category. Categories display in this order: Getting Started, Using HyperPerfect, Enterprise, Resources, Legal.

To add a new help article: create a `.md` file in `/content/help/` with frontmatter fields `title`, `description`, `order`, and `category`.

### Key Directories

- `components/` — Shared React components (landing page, signup modal, rotating content)
- `components/ui/` — Reusable UI primitives
- `content/help/` — Markdown help articles (13 articles including changelog)
- `data/` — Static content data files for resource pages
- `assets/marketing_emails/` — Customer email campaigns (HTML + markdown)
- `assets/marketing_content/` — Marketing copy and content
- `assets/logos/` — Logo assets
- `assets/animations/` — Animation assets
- `services/` — Service modules (error handling)
- `styles/` — Global CSS styles
- `public/` — Static assets (images, files, Brevo service worker)
- `project_docs/` — Internal project documentation (not deployed)
- `scripts/` — Build and deploy scripts

### Key Configuration

- `next.config.js` — Static export (`output: 'export'`), trailing slashes for GitHub Pages
- `scripts/deploy.sh` — Build script that copies CNAME, creates `.nojekyll`, copies styles
- `tailwind.config.js` — Tailwind configuration
- Path alias `@/*` maps to root directory

### Third-Party Integrations

- **Google Analytics** — Tag Manager (G-BYW8TCVBDR) loaded in layout
- **Brevo** — Email marketing SDK and service worker for tracking
- **Tally** — Embedded form widgets
- **gh-pages** — NPM package for deploying to GitHub Pages

## Deployment

The site deploys to GitHub Pages with custom domain (www.hyperperfect.ai). The `predeploy` script (`scripts/deploy.sh`) builds the site, copies the CNAME file, creates `.nojekyll`, and copies styles to the output directory. Then `npm run deploy` pushes `/out` to the `gh-pages` branch via the `gh-pages` package.

## Publishing Workflow

When the user says "publish" or "let's publish", follow these steps:
1. Commit any pending changes to the current branch (if needed)
2. Run `npm run deploy` which will:
   - Build the static site with `next build`
   - Copy the CNAME file to the output directory
   - Create .nojekyll file for GitHub Pages
   - Deploy the `/out` directory to the `gh-pages` branch using gh-pages package
3. Stay on the original working branch (do not switch branches)