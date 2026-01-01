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
    const ctaButton = page.getByRole('link', { name: /Q3\s*2026/i })
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

    const header = page.locator('header')
    // Keep this deterministic: on WebKit multiple sequential anchor-clicks can be flaky.
    const link = header.getByRole('link', { name: 'FAQ', exact: true })
    await link.scrollIntoViewIfNeeded()
    await expect(link).toBeVisible()
    await expect(link).toBeEnabled()

    await link.click()
    await expect(page).toHaveURL(/#faq$/)
    await expect(page.locator('#faq')).toBeVisible()
  })

  test('should render Systems section and allow expanding a system card with details', async ({ page }) => {
    const section = page.locator('#systeme')
    await section.scrollIntoViewIfNeeded()
    await expect(section).toBeVisible()

    const cards = section.locator('button[type="button"]')
    await expect(cards).toHaveCount(4)

    const krieg = section.getByRole('button', { name: /Krieg ist Taktik/i })
    await krieg.click()
    await expect(section.getByText(/Schlachten haben Phasen/i)).toBeVisible()
  })

  test('should render Stimmen section with testimonial cards', async ({ page }) => {
    const section = page.locator('#stimmen')
    await section.scrollIntoViewIfNeeded()
    await expect(section).toBeVisible()

    const testimonials = section.locator('article')
    await expect(testimonials).toHaveCount(3)
    // Avoid strict-mode collisions (all quotes contain “…)
    await expect(testimonials.first().locator('p').first()).toContainText('“')
  })

  test('should not auto-open the audio gatekeeper modal in the default E2E storage state', async ({ page }) => {
    // We pre-seed eva_audio_consent=denied in playwright.config.ts to avoid interceptions in CI.
    await expect(page.getByRole('dialog', { name: 'Atmosphäre aktivieren?' })).toHaveCount(0)
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
    await expect
      .poll(async () => {
        return page.evaluate(() => {
          const el = document.activeElement as HTMLElement | null
          if (!el) return null
          return el.tagName
        })
      })
      .not.toBe('BODY')
  })
})
