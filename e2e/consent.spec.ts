import { test, expect } from '@playwright/test'

test.describe('Consent & Settings', () => {
  // Override global storageState seeding so we can validate first-visit behavior.
  test.use({ storageState: { cookies: [], origins: [] } })

  test('privacy banner shows on first visit and "Nur notwendig" persists consent', async ({ page }) => {
    // Prevent the audio gatekeeper from intercepting clicks during privacy-only flows.
    await page.addInitScript(() => {
      window.localStorage.setItem('eva_audio_consent', 'denied')
      window.localStorage.setItem('eva_audio_enabled', '0')
    })
    await page.goto('/')

    const banner = page.getByRole('region', { name: 'Datenschutzhinweis' })
    await expect(banner).toBeVisible()

    await banner.getByRole('button', { name: 'Nur notwendig', exact: true }).click()
    await expect(banner).toBeHidden()

    const stored = await page.evaluate(() => window.localStorage.getItem('eva_privacy_consent'))
    expect(stored).toBeTruthy()

    const parsed = JSON.parse(stored!) as { v: number; analytics: boolean; updatedAt: string }
    expect(parsed.v).toBe(1)
    expect(parsed.analytics).toBe(false)
    expect(typeof parsed.updatedAt).toBe('string')

    // Reload should keep the banner hidden.
    await page.reload()
    await expect(banner).toBeHidden()
  })

  test('privacy settings can be opened from footer and toggled', async ({ page }) => {
    // Prevent the audio gatekeeper from intercepting clicks during privacy-only flows.
    await page.addInitScript(() => {
      window.localStorage.setItem('eva_audio_consent', 'denied')
      window.localStorage.setItem('eva_audio_enabled', '0')
    })
    await page.goto('/')

    // Open via footer trigger (doesn't require banner).
    const footerTrigger = page.getByRole('button', { name: 'Datenschutz-Einstellungen', exact: true })
    await expect(footerTrigger).toBeVisible()
    await footerTrigger.click()

    const dialog = page.getByRole('dialog', { name: 'Datenschutzeinstellungen' })
    await expect(dialog).toBeVisible()

    const analyticsToggle = dialog.getByRole('checkbox', { name: /Statistik/i })
    await expect(analyticsToggle).toBeVisible()

    // Enable analytics → save → should persist.
    await analyticsToggle.check()
    await dialog.getByRole('button', { name: 'Speichern', exact: true }).click()
    await expect(dialog).toBeHidden()

    let stored = await page.evaluate(() => window.localStorage.getItem('eva_privacy_consent'))
    expect(stored).toBeTruthy()
    expect(JSON.parse(stored!)).toMatchObject({ v: 1, analytics: true })

    // Re-open and revoke (should be available when analytics is enabled).
    await footerTrigger.click()
    await expect(dialog).toBeVisible()
    await dialog.getByRole('button', { name: 'Statistik deaktivieren (Widerruf)', exact: true }).click()
    await expect(dialog).toBeHidden()

    stored = await page.evaluate(() => window.localStorage.getItem('eva_privacy_consent'))
    expect(stored).toBeTruthy()
    expect(JSON.parse(stored!)).toMatchObject({ v: 1, analytics: false })
  })

  test('audio gatekeeper auto-prompts on first visit and can be dismissed', async ({ page }) => {
    await page.goto('/')

    const gate = page.getByRole('dialog', { name: 'Atmosphäre aktivieren?' })
    await expect(gate).toBeVisible() // auto-opens after ~900ms when consent is unknown and user hasn't scrolled

    await page.keyboard.press('Escape')
    await expect(gate).toBeHidden()

    // Fresh reload should prompt again since no decision was made.
    await page.reload()
    await expect(gate).toBeVisible()
  })

  test('audio can be denied and persisted via the gatekeeper', async ({ page }) => {
    await page.goto('/')

    const gate = page.getByRole('dialog', { name: 'Atmosphäre aktivieren?' })
    await expect(gate).toBeVisible()

    await gate.getByRole('button', { name: 'Nein danke', exact: true }).click()
    await expect(gate).toBeHidden()

    const consent = await page.evaluate(() => window.localStorage.getItem('eva_audio_consent'))
    expect(consent).toBe('denied')
  })

  test('audio can be enabled via the controls → gate → "Aktivieren" and persists', async ({ page }) => {
    // Seed a deterministic "no-consent" state; the controls should open the gatekeeper.
    await page.addInitScript(() => {
      // IMPORTANT: only seed when missing, so a later "Aktivieren" persists across reloads.
      if (!window.localStorage.getItem('eva_audio_consent')) {
        window.localStorage.setItem('eva_audio_consent', 'denied')
      }
      if (!window.localStorage.getItem('eva_audio_enabled')) {
        window.localStorage.setItem('eva_audio_enabled', '0')
      }
    })
    await page.goto('/')

    // Ensure any auto-prompt is closed before interacting with the controls.
    const gate = page.getByRole('dialog', { name: 'Atmosphäre aktivieren?' })
    if (await gate.isVisible()) {
      await page.keyboard.press('Escape')
      await expect(gate).toBeHidden()
    }

    // Clicking the kill-switch while consent is not granted should open the gate.
    await page.getByRole('button', { name: 'Audio einschalten', exact: true }).click()

    await expect(gate).toBeVisible()
    await gate.getByRole('button', { name: 'Aktivieren', exact: true }).click()
    await expect(gate).toBeHidden()

    await expect(page.getByRole('button', { name: 'Audio ausschalten', exact: true })).toBeVisible()

    const [consent, enabled] = await page.evaluate(() => [
      window.localStorage.getItem('eva_audio_consent'),
      window.localStorage.getItem('eva_audio_enabled'),
    ])
    expect(consent).toBe('granted')
    expect(enabled).toBe('1')

    await page.reload()
    await expect(page.getByRole('button', { name: 'Audio ausschalten', exact: true })).toBeVisible()
  })
})
