## Erbe von Arda – Website (EVA)

Marketing / landing page for **Erbe von Arda**, built with **Next.js (App Router)**.

### Tech stack

- **Framework**: Next.js 16, React 19, TypeScript
- **UI**: Tailwind CSS v4, Chakra UI, Saas UI
- **Animation**: Framer Motion
- **Testing**: Vitest + Testing Library (unit/component), Playwright (E2E)
- **Linting**: ESLint flat config (`eslint.config.mjs`)

### Requirements

- **Node.js**: `>= 20.9.0` (see `package.json#engines`)
- **Package manager**: `npm` (this repo ships a `package-lock.json`)

### Quickstart

```bash
npm ci
npm run dev
```

Open the app at `http://localhost:3000`.

If dependency installation fails due to peer dependency mismatches, use:

```bash
npm ci --legacy-peer-deps
```

### Scripts

#### App / tooling

- **dev**: `npm run dev` (uses `--webpack` for SVGR support)
- **build**: `npm run build`
- **start**: `npm run start` (production server; requires `npm run build` first)
- **lint**: `npm run lint`
- **lint:fix**: `npm run lint:fix`
- **type check**: `npx tsc --noEmit`

#### Unit & component tests (Vitest)

- **watch mode**: `npm test` or `npm run test:watch`
- **single run + coverage (CI)**: `npm run test:ci`
- **Vitest UI**: `npm run test:ui`

Coverage output is written to `./coverage/` (HTML + LCOV + JSON); open:

- `coverage/lcov-report/index.html`

#### E2E tests (Playwright)

First-time setup (installs browser binaries):

```bash
npx playwright install
```

Run E2E:

- **headless**: `npm run test:e2e`
- **UI runner**: `npm run test:e2e:ui`
- **headed**: `npm run test:e2e:headed`
- **debug**: `npm run test:e2e:debug`
- **open last report**: `npm run test:e2e:report`

Run everything CI runs locally:

- **unit + coverage + e2e**: `npm run test:all`

Playwright configuration lives in `playwright.config.ts`:

- **Test directory**: `e2e/`
- **Base URL**: `PLAYWRIGHT_TEST_BASE_URL` (defaults to `http://127.0.0.1:3000`)
- **Projects**: `chromium`, `firefox`, `webkit`, `Mobile Chrome`, `Mobile Safari`
- **Local server**: auto-starts Next.js locally (dev server) and reuses an existing server when possible

#### Visual regression tests (opt-in)

The tests in `e2e/visual.spec.ts` are **opt-in** (to avoid failing CI without committed snapshots).
Enable them by setting `E2E_VISUAL=true`.

- **macOS/Linux (bash/zsh)**:

```bash
E2E_VISUAL=true npm run test:e2e
```

- **Windows PowerShell**:

```bash
$env:E2E_VISUAL="true"; npm run test:e2e
```

To (re)generate snapshots:

```bash
E2E_VISUAL=true npm run test:e2e -- --update-snapshots
```

### GitHub Actions (CI)

This repo ships two workflows:

#### `CI` (`.github/workflows/ci.yml`)

Runs on pushes and PRs to `main`, `master`, and `develop`.

- **Lint & Type Check**: `npm run lint` and `npx tsc --noEmit`
- **Unit & Component Tests**: `npm run test:ci` (coverage generated to `coverage/`)
- **Coverage upload (optional)**: uploads `coverage/lcov.info` via Codecov
  - **Secret**: `CODECOV_TOKEN` (optional; CI won’t fail if missing)
- **Build**: `npm run build` (uploads `.next` as an artifact)
- **E2E Tests**: Playwright on `chromium`, `firefox`, `webkit` (uses the built build artifact)
- **E2E Tests (Mobile)**: Playwright on `Mobile Chrome` + `Mobile Safari`

Artifacts produced by CI:

- **Playwright report**: `playwright-report/`
- **Playwright raw output**: `test-results/`

#### `Playwright E2E Tests (Vercel Preview)` (`.github/workflows/playwright.yml`)

Runs on `deployment_status` events and executes Playwright against the deployed URL.
This is intended for **Vercel Preview** and **Production** deployments.

### Project structure (high level)

- **`app/`**: Next.js App Router routes and layouts (marketing pages live under `app/(marketing)/`)
- **`components/`**: UI + section components (hero, FAQ, bento, etc.)
- **`data/`**: content/config data used by sections
- **`hooks/`**: shared hooks (e.g. scroll spy)
- **`lib/`**: shared utilities (incl. audio engine/provider)
- **`__tests__/`**: Vitest unit/component tests
- **`e2e/`**: Playwright E2E tests
- **`public/`**: static assets (images, audio, favicons)

### Path aliases

Configured in `tsconfig.json` and `vitest.config.mts`:

- `#components/*` → `./components/*`
- `#hooks/*` → `./hooks/*`
- `#data/*` → `./data/*`
- `#lib/*` → `./lib/*`

### Notes / references

- **Next.js 16 lint**: `next lint` was removed → lint runs via **ESLint CLI** (`npm run lint`)
- **Bundler**: `dev/build` run with `--webpack` because the project has custom `webpack()` config (SVGR)
- **Additional docs**: `.cursor/references/PROJECT_REFERENCE.md` (concept text, audio asset naming, etc.)
