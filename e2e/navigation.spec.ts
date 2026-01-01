import { test, expect } from '@playwright/test'

test.describe('Header Navigation (Anchors)', () => {
  const targets = [
    { name: 'Lore', hash: '#lore' },
    { name: 'Status', hash: '#status' },
    { name: 'Einstieg', hash: '#bento' },
    { name: 'Systeme', hash: '#systeme' },
    { name: 'Stimmen', hash: '#stimmen' },
    { name: 'FAQ', hash: '#faq' },
  ] as const

  for (const t of targets) {
    test(`should jump to ${t.name}`, async ({ page }) => {
      // Desktop header navigation is hidden on mobile viewports.
      const viewport = page.viewportSize()
      test.skip(!!viewport && viewport.width < 768, 'Desktop navigation links are hidden on mobile')

      await page.goto('/')

      const header = page.locator('header')
      const link = header.getByRole('link', { name: t.name, exact: true })
      await expect(link).toBeVisible()

      await link.click()
      await expect(page).toHaveURL(new RegExp(`${t.hash}$`))
      await expect(page.locator(t.hash)).toBeVisible()
    })
  }
})
