# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

HyperPerfect is a Next.js marketing website for an Excel add-in that automates revenue analytics workflows. The site is deployed as a static site to GitHub Pages at www.hyperperfect.ai.

The actual Excel add-in (not in this repository) is a comprehensive tool for cleaning, analyzing, and transforming large datasets directly in Excel, with features including:
- Data ingestion and validation
- Dynamic Excel formula generation
- Revenue analysis and reporting
- Support for datasets with 500,000+ rows

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

Manual deployment alternative:
```bash
git subtree push --prefix out origin gh-pages
```

## Architecture

This is a simple Next.js marketing site with:
- **Static export configuration** - outputs to `/out` directory
- **Tailwind CSS** for styling
- **TypeScript** with strict mode
- **Custom components** in `/components` directory
- **Landing page** as the main entry point (`app/page.tsx`)

Key configuration:
- `next.config.js` - Static export with trailing slashes for GitHub Pages
- `scripts/deploy.sh` - Handles CNAME copying and .nojekyll file creation
- Path alias `@/*` maps to root directory

## Deployment Notes

The site deploys to GitHub Pages with a custom domain. The deployment process:
1. Builds the static site
2. Copies `CNAME` file to output directory
3. Creates `.nojekyll` file to bypass Jekyll processing
4. Uses `gh-pages` package to push the `/out` directory

External documentation is hosted on Obsidian Publish and linked from the site.