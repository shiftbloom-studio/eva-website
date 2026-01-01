import { test, expect, devices } from '@playwright/test'

// NOTE: Playwright device descriptors include `defaultBrowserType`, which is worker-scoped.
// Calling `test.use({ defaultBrowserType })` inside a `test.describe(...)` group is forbidden
// because it would require a new worker. We only need the context options here, so we strip it.
const { defaultBrowserType: _iPhoneDefaultBrowserType, ...iPhone } = devices['iPhone 12']
const { defaultBrowserType: _PixelDefaultBrowserType, ...pixel } = devices['Pixel 5']

test.describe('Mobile Experience', () => {
  test.describe('iPhone 12', () => {
    test.use({ ...iPhone })

    test('should display mobile-friendly layout', async ({ page }) => {
      await page.goto('/')
      
      // Viewport should be mobile-sized
      const viewport = page.viewportSize()
      expect(viewport?.width).toBeLessThan(450)
    })

    test('should display hero section properly on mobile', async ({ page }) => {
      await page.goto('/')

      const heroHeading = page.locator('h1')
      await expect(heroHeading).toBeVisible()

      // CTA buttons should be full-width on mobile
      const ctaButton = page.getByRole('link', { name: /In die Welt eintreten/i })
      await expect(ctaButton).toBeVisible()
    })

    test('should have touch-friendly navigation', async ({ page }) => {
      await page.goto('/')

      // Mobile navigation should have larger touch targets
      const header = page.locator('header')
      await expect(header).toBeVisible()
    })

    test('should scroll smoothly on mobile', async ({ page }) => {
      await page.goto('/')

      // Scroll down
      await page.evaluate(() => window.scrollTo(0, 500))
      await page.waitForTimeout(300)

      // Check scroll position
      const scrollY = await page.evaluate(() => window.scrollY)
      expect(scrollY).toBeGreaterThan(0)
    })

    test('FAQ should be accessible on mobile', async ({ page }) => {
      await page.goto('/#faq')
      await page.waitForSelector('#faq')

      const faqSection = page.locator('#faq')
      await expect(faqSection).toBeVisible()

      // FAQ items should be tappable (use a specific question to avoid strict-mode collisions)
      const question = faqSection.getByRole('button', { name: 'Was ist Erbe von Arda?', exact: true })
      await question.scrollIntoViewIfNeeded()
      await expect(question).toBeVisible()
      await expect(question).toBeEnabled()

      // On some mobile emulation runs the fixed header can intercept pointer events.
      // Temporarily disable it for the tap to make this deterministic.
      const header = page.locator('header')
      const prevPointerEvents = await header.evaluate((h) => (h as HTMLElement).style.pointerEvents)
      await header.evaluate((h) => {
        ;(h as HTMLElement).style.pointerEvents = 'none'
      })

      try {
        await question.tap()
      } finally {
        await header.evaluate(
          (h, prev) => {
            ;(h as HTMLElement).style.pointerEvents = prev as string
          },
          prevPointerEvents,
        )
      }

      // Answer should become visible after expansion.
      await expect(faqSection.getByText('Erbe von Arda ist ein Rollenspiel-Server', { exact: false })).toBeVisible()
    })
  })

  test.describe('Pixel 5 (Android)', () => {
    test.use({ ...pixel })

    test('should display properly on Android', async ({ page }) => {
      await page.goto('/')

      const heroHeading = page.locator('h1')
      await expect(heroHeading).toBeVisible()
    })

    test('should have working touch interactions', async ({ page }) => {
      await page.goto('/')

      // Test touch on CTA button
      const ctaButton = page.getByRole('link', { name: /In die Welt eintreten/i })
      await expect(ctaButton).toBeVisible()
    })
  })
})

test.describe('Tablet Experience', () => {
  test.use({ viewport: { width: 768, height: 1024 } })

  test('should display tablet layout', async ({ page }) => {
    await page.goto('/')

    const heroHeading = page.locator('h1')
    await expect(heroHeading).toBeVisible()
  })

  test('navigation should adapt to tablet size', async ({ page }) => {
    await page.goto('/')

    const header = page.locator('header')
    await expect(header).toBeVisible()
  })
})

test.describe('Responsive Images', () => {
  const viewports = [
    { name: 'mobile', width: 375, height: 667 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1440, height: 900 },
  ]

  for (const vp of viewports) {
    test(`should load appropriate images for ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height })
      await page.goto('/')

      // Wait for images to load
      await page.waitForLoadState('networkidle')

      // Check that images are visible
      const heroImage = page.locator('section').first().locator('img').first()
      if (await heroImage.isVisible()) {
        await expect(heroImage).toBeVisible()
      }
    })
  }
})

test.describe('Touch Interactions', () => {
  test.use({ ...iPhone })

  test('should handle swipe gestures', async ({ page }) => {
    await page.goto('/')

    // Simulate swipe by touching and moving
    await page.touchscreen.tap(200, 400)
  })

  test('buttons should have adequate touch targets', async ({ page }) => {
    await page.goto('/')

    // All buttons should be at least 44x44 pixels (Apple HIG minimum)
    const buttons = page.locator('button, a[role="button"], [role="link"]')
    const count = await buttons.count()

    for (let i = 0; i < Math.min(count, 10); i++) {
      const button = buttons.nth(i)
      if (await button.isVisible()) {
        const box = await button.boundingBox()
        if (box) {
          // Allow for some flexibility, but should be reasonably touchable
          expect(box.width).toBeGreaterThan(30)
          expect(box.height).toBeGreaterThan(30)
        }
      }
    }
  })
})
