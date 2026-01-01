# Erbe von Arda (EVA) — Website

[![Build (CI)](https://github.com/shiftbloom-studio/eva-website/actions/workflows/ci.yml/badge.svg)](https://github.com/shiftbloom-studio/eva-website/actions/workflows/ci.yml)
[![Tests (Playwright on Vercel)](https://github.com/shiftbloom-studio/eva-website/actions/workflows/playwright.yml/badge.svg)](https://github.com/shiftbloom-studio/eva-website/actions/workflows/playwright.yml)
[![Coverage](https://codecov.io/gh/shiftbloom-studio/eva-website/branch/main/graph/badge.svg)](https://codecov.io/gh/shiftbloom-studio/eva-website)

Marketing website for **Erbe von Arda** — cinematic, scroll-driven storytelling with an optional audio layer.

## What’s in here

- **Immersive landing page**: hero, bento/overview, “systems”, testimonials, FAQ.
- **Optional sound & voice layer**: consent-gated audio with subtle SFX on interactions and section voice lines.
- **Accessibility & legal pages**: pages for accessibility statement, privacy policy, and imprint.
- **Quality gates**: unit/component tests (Vitest) + E2E tests (Playwright), both automated via GitHub Actions.

## Tech (high level)

- **Framework**: Next.js (App Router), React, TypeScript
- **UI**: Tailwind CSS + Chakra UI / Saas UI
- **Animation**: Framer Motion + Lenis
- **Testing**: Vitest + Testing Library, Playwright

## Development (short)

- **Requirements**: Node.js `>= 20.9.0`, `npm`
- **Run locally**:

```bash
npm ci
npm run dev
```

Then open `http://localhost:3000`.

If install fails due to peer dependency issues:

```bash
npm ci --legacy-peer-deps
```

## CI / Test status

- **Build & checks**: `.github/workflows/ci.yml` (lint, type-check, unit tests + coverage upload to Codecov, build, E2E incl. mobile)
- **Deployed E2E**: `.github/workflows/playwright.yml` (runs Playwright against Vercel Preview/Production deployments)
