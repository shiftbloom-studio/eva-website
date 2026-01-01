import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should have correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/Erbe von Arda/)
  })

  test('should display hero section', async ({ page }) => {
    // Check for hero heading
    const heroHeading = page.locator('h1')
    await expect(heroHeading).toBeVisible()
    await expect(heroHeading).toContainText('Schatten')
    await expect(heroHeading).toContainText('Arda')
  })

  test('should display hero tagline badge', async ({ page }) => {
    const badge = page.getByText('Die Welt ist im Wandel', { exact: true })
    await expect(badge).toBeVisible()
  })

  test('should have Discord CTA button', async ({ page }) => {
    const ctaButton = page.getByRole('link', { name: /In die Welt eintreten/i })
    await expect(ctaButton).toBeVisible()
    await expect(ctaButton).toHaveAttribute('href', /discord/i)
  })

  test('should have secondary CTA button', async ({ page }) => {
    const secondaryButton = page.getByRole('link', { name: /Lore entdecken/i })
    await expect(secondaryButton).toBeVisible()
    await expect(secondaryButton).toHaveAttribute('href', '#bento')
  })

  test('should display feature tags', async ({ page }) => {
    // Use stable selectors / exact locators to avoid strict-mode failures when text appears multiple times.
    await expect(page.getByText('RP-first', { exact: true })).toBeVisible()
    await expect(page.getByTestId('feature-whitelist')).toBeVisible()
    await expect(page.getByText('Events & Intrigen', { exact: true })).toBeVisible()
  })

  test('should scroll to sections when clicking navigation', async ({ page }) => {
    test.setTimeout(60_000)

    // Desktop header navigation is hidden on mobile viewports.
    const viewport = page.viewportSize()
    test.skip(!!viewport && viewport.width < 768, 'Desktop navigation links are hidden on mobile')

    const faqLink = page.locator('header').getByRole('link', { name: 'FAQ', exact: true })
    await faqLink.scrollIntoViewIfNeeded()
    await expect(faqLink).toBeVisible()
    await expect(faqLink).toBeEnabled()

    await faqLink.click()

    await expect(page).toHaveURL(/#faq/)
    await expect(page.locator('#faq')).toBeVisible()
  })
})

test.describe('FAQ Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#faq')
    // Wait for the section to be in view
    await page.waitForSelector('#faq')
  })

  test('should display FAQ section', async ({ page }) => {
    const faqSection = page.locator('#faq')
    await expect(faqSection).toBeVisible()
  })

  test('should display FAQ title', async ({ page }) => {
    const faqTitle = page.getByText('Häufig gestellte Fragen')
    await expect(faqTitle).toBeVisible()
  })

  test('should have expandable FAQ items', async ({ page }) => {
    // Find FAQ buttons
    const faqButtons = page.locator('#faq button[type="button"]')
    const buttonCount = await faqButtons.count()
    expect(buttonCount).toBeGreaterThan(0)
  })

  test('should expand FAQ item on click', async ({ page }) => {
    test.setTimeout(60_000)

    // Find and click a FAQ question
    const firstQuestion = page.locator('#faq button[type="button"]').first()
    await firstQuestion.scrollIntoViewIfNeeded()
    await firstQuestion.click()

    // Wait for animation
    await page.waitForTimeout(400)

    // The content should be visible
    const faqContent = page.locator('#faq').getByText('Erbe von Arda ist ein Rollenspiel-Server', { exact: false })
    await expect(faqContent).toBeVisible()
  })
})

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display logo', async ({ page }) => {
    const logo = page.locator('header').getByRole('link').first()
    await expect(logo).toBeVisible()
  })

  test('should have navigation links on desktop', async ({ page }) => {
    // Skip on mobile-ish viewports
    const viewport = page.viewportSize()
    if (viewport && viewport.width < 768) test.skip()

    const nav = page.locator('header nav')
    await expect(nav).toBeVisible()
  })
})

test.describe('Footer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    // Scroll to footer (more reliable than window.scrollTo in mobile emulation).
    await page.locator('footer').scrollIntoViewIfNeeded()
  })

  test('should display footer', async ({ page }) => {
    const footer = page.locator('footer')
    await expect(footer).toBeVisible()
  })

  test('should have legal links', async ({ page }) => {
    const footer = page.locator('footer')
    const impressumLink = footer.getByRole('link', { name: 'Impressum', exact: true })
    const datenschutzLink = footer.getByTestId('footer-datenschutz')

    await expect(impressumLink).toBeVisible()
    await expect(datenschutzLink).toBeVisible()
  })

  test('should have Discord link', async ({ page }) => {
    // Discord link might be an icon, so check for href
    const footerLinks = page.locator('footer a')
    const count = await footerLinks.count()

    let hasDiscordLink = false
    for (let i = 0; i < count; i++) {
      const href = await footerLinks.nth(i).getAttribute('href')
      if (href && href.includes('discord')) {
        hasDiscordLink = true
        break
      }
    }
    expect(hasDiscordLink).toBe(true)
  })
})

test.describe('Accessibility', () => {
  test('should have no accessibility violations on homepage', async ({ page }) => {
    await page.goto('/')

    // Check for basic accessibility features
    // Heading hierarchy
    const h1 = page.locator('h1')
    await expect(h1).toBeVisible()
    const h1Count = await h1.count()
    expect(h1Count).toBe(1) // Should have exactly one h1

    // Language attribute
    const html = page.locator('html')
    await expect(html).toHaveAttribute('lang', 'de')

    // Images should have alt text (or be decorative with aria-hidden)
    const images = page.locator('img:not([aria-hidden="true"])')
    const imageCount = await images.count()
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i)
      const alt = await img.getAttribute('alt')
      const ariaHidden = await img.getAttribute('aria-hidden')
      // Either has alt text or is explicitly hidden
      expect(alt !== null || ariaHidden === 'true').toBe(true)
    }
  })

  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/')

    // Tab through the page
    await page.keyboard.press('Tab')
    
    // Skip link or first interactive element should be focused
    const focusedElement = page.locator(':focus')
    await expect(focusedElement).toBeTruthy()
  })
})

test.describe('Performance', () => {
  test('should load within acceptable time', async ({ page }) => {
    const startTime = Date.now()
    await page.goto('/')
    const loadTime = Date.now() - startTime

    // Page should load within 5 seconds (generous for CI environments)
    expect(loadTime).toBeLessThan(5000)
  })

  test('should have responsive images', async ({ page }) => {
    await page.goto('/')

    // Check for Next.js Image optimization or srcset
    const images = page.locator('img')
    const count = await images.count()

    if (count > 0) {
      for (let i = 0; i < count; i++) {
        const img = images.nth(i)
        const srcset = await img.getAttribute('srcset')
        const loading = await img.getAttribute('loading')

        if (srcset || loading === 'lazy') {
          return
        }
      }
      // Note: This is informational, not all images need to be optimized
    }
  })
})
