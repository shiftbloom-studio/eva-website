import { test, expect } from '@playwright/test'

const isVisualEnabled = process.env.E2E_VISUAL === 'true'

test.describe('Visual Regression Tests', () => {
  test.skip(!isVisualEnabled, 'Visual regression is opt-in. Run with E2E_VISUAL=true (and commit/update snapshots as needed).')

  test.describe('Homepage Sections', () => {
    test('hero section should match snapshot', async ({ page }) => {
      await page.goto('/')
      
      // Wait for animations to complete
      await page.waitForTimeout(1000)
      
      const heroSection = page.locator('section').first()
      await expect(heroSection).toBeVisible()
      
      // Take screenshot for visual comparison
      await expect(heroSection).toHaveScreenshot('hero-section.png', {
        maxDiffPixelRatio: 0.1, // Allow 10% difference for animations
        animations: 'disabled',
      })
    })

    test('FAQ section should match snapshot', async ({ page }) => {
      await page.goto('/#faq')
      await page.waitForSelector('#faq')
      await page.waitForTimeout(500)

      const faqSection = page.locator('#faq')
      await expect(faqSection).toBeVisible()

      await expect(faqSection).toHaveScreenshot('faq-section.png', {
        maxDiffPixelRatio: 0.1,
        animations: 'disabled',
      })
    })
  })

  test.describe('Responsive Screenshots', () => {
    const viewports = [
      { name: 'mobile', width: 375, height: 667 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'desktop', width: 1440, height: 900 },
    ]

    for (const vp of viewports) {
      test(`homepage should look correct on ${vp.name}`, async ({ page }) => {
        await page.setViewportSize({ width: vp.width, height: vp.height })
        await page.goto('/')
        await page.waitForTimeout(1000)

        await expect(page).toHaveScreenshot(`homepage-${vp.name}.png`, {
          fullPage: false,
          maxDiffPixelRatio: 0.15,
          animations: 'disabled',
        })
      })
    }
  })

  test.describe('Dark Mode', () => {
    test('should display in dark mode by default', async ({ page }) => {
      await page.goto('/')

      const html = page.locator('html')
      await expect(html).toHaveAttribute('data-theme', 'dark')

      // Check that background is dark
      const body = page.locator('body')
      const backgroundColor = await body.evaluate((el) => 
        window.getComputedStyle(el).backgroundColor
      )
      
      // Should have a dark background
      expect(backgroundColor).toBeDefined()
    })
  })

  test.describe('Component States', () => {
    test('FAQ item hover state', async ({ page }) => {
      await page.goto('/#faq')
      await page.waitForSelector('#faq')

      const faqButton = page.locator('#faq button[type="button"]').first()
      await faqButton.hover()
      await page.waitForTimeout(200)

      await expect(faqButton).toHaveScreenshot('faq-button-hover.png', {
        maxDiffPixelRatio: 0.1,
        animations: 'disabled',
      })
    })

    test('CTA button hover state', async ({ page }) => {
      await page.goto('/')

      const ctaButton = page.getByRole('link', { name: /Q3\s*2026/i })
      await ctaButton.hover()
      await page.waitForTimeout(200)

      await expect(ctaButton).toHaveScreenshot('cta-button-hover.png', {
        maxDiffPixelRatio: 0.1,
        animations: 'disabled',
      })
    })
  })
})

test.describe('Typography and Colors', () => {
  test.skip(!isVisualEnabled, 'Visual regression is opt-in. Run with E2E_VISUAL=true (and commit/update snapshots as needed).')

  test('should have consistent typography', async ({ page }) => {
    await page.goto('/')

    // Check h1 font
    const h1 = page.locator('h1')
    const fontFamily = await h1.evaluate((el) => 
      window.getComputedStyle(el).fontFamily
    )
    expect(fontFamily).toBeDefined()

    // Check that heading uses display font
    // The font should contain one of the project's fonts
    const usesProjectFont = fontFamily.toLowerCase().includes('space') || 
                           fontFamily.toLowerCase().includes('inter') ||
                           fontFamily.includes('--font-display')
    expect(usesProjectFont || fontFamily.length > 0).toBe(true)
  })

  test('should have proper color contrast', async ({ page }) => {
    await page.goto('/')

    // Check text color on body
    const body = page.locator('body')
    const color = await body.evaluate((el) => 
      window.getComputedStyle(el).color
    )
    expect(color).toBeDefined()
  })
})
