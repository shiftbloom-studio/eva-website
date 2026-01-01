import { defineConfig, devices } from '@playwright/test'
import { URL } from 'node:url'

const baseURL = process.env.PLAYWRIGHT_TEST_BASE_URL ?? 'http://127.0.0.1:3000'
const isCI = !!process.env.CI
const origin = (() => {
  try {
    return new URL(baseURL).origin
  } catch {
    return baseURL
  }
})()

function isLocalBaseUrl(url: string) {
  try {
    const parsed = new URL(url)
    return parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1'
  } catch {
    return false
  }
}

function getPort(url: string) {
  try {
    const parsed = new URL(url)
    return parsed.port ? Number(parsed.port) : parsed.protocol === 'https:' ? 443 : 80
  } catch {
    return 3000
  }
}

const port = getPort(baseURL)
const shouldStartLocalServer = isLocalBaseUrl(baseURL)

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: isCI,
  timeout: 60_000,
  retries: isCI ? 2 : 0,
  workers: isCI ? 2 : undefined,
  reporter: isCI ? 'github' : 'html',
  outputDir: 'test-results',

  expect: {
    timeout: 15_000,
  },

  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 60_000,
    navigationTimeout: 60_000,

    // Disable the auto-opening audio gatekeeper modal in E2E runs by pre-seeding localStorage.
    // This avoids click/tap interceptions in CI (especially when the page load is slow).
    storageState: {
      cookies: [],
      origins: [
        {
          origin,
          localStorage: [
            { name: 'eva_audio_consent', value: 'denied' },
            { name: 'eva_audio_enabled', value: '0' },
          ],
        },
      ],
    },
  },

  // Only start a local server when running against localhost/127.0.0.1.
  // For Vercel deployment workflows we run against the provided target_url.
  ...(shouldStartLocalServer
    ? {
        webServer: {
          command: isCI ? `npm run start -- -p ${port}` : `npm run dev -- -p ${port}`,
          url: baseURL,
          reuseExistingServer: !isCI,
          timeout: 120_000,
        },
      }
    : {}),

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      testIgnore: /.*mobile\.spec\.ts/,
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
})

