'use client'

import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { X } from 'lucide-react'
import Link from 'next/link'
import * as React from 'react'
import { RemoveScroll } from 'react-remove-scroll'

import { cn } from '#lib/cn'

const STORAGE_KEY = 'eva_privacy_consent'

type StoredConsent = {
  v: 1
  analytics: boolean
  updatedAt: string
}

function readConsent(): StoredConsent | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<StoredConsent>
    if (parsed.v !== 1) return null
    if (typeof parsed.analytics !== 'boolean') return null
    if (typeof parsed.updatedAt !== 'string') return null
    return parsed as StoredConsent
  } catch {
    return null
  }
}

function writeConsent(analytics: boolean): StoredConsent {
  const next: StoredConsent = {
    v: 1,
    analytics,
    updatedAt: new Date().toISOString(),
  }
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    // ignore
  }
  return next
}

export function PrivacyLayer() {
  const [consent, setConsent] = React.useState<StoredConsent | null>(null)
  const [settingsOpen, setSettingsOpen] = React.useState(false)
  const [draftAnalytics, setDraftAnalytics] = React.useState(false)

  const closeButtonRef = React.useRef<HTMLButtonElement | null>(null)

  React.useEffect(() => {
    const stored = readConsent()
    setConsent(stored)
    setDraftAnalytics(stored?.analytics ?? false)
  }, [])

  React.useEffect(() => {
    const w = window as unknown as { __evaPrivacyOpenRequested?: boolean }
    if (w.__evaPrivacyOpenRequested) {
      w.__evaPrivacyOpenRequested = false
      setSettingsOpen(true)
    }
  }, [])

  React.useEffect(() => {
    const onOpen = () => setSettingsOpen(true)
    window.addEventListener('eva:privacy-open', onOpen as EventListener)
    return () => window.removeEventListener('eva:privacy-open', onOpen as EventListener)
  }, [])

  React.useEffect(() => {
    if (!settingsOpen) return

    setDraftAnalytics(consent?.analytics ?? false)
    closeButtonRef.current?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSettingsOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [settingsOpen, consent])

  const decide = React.useCallback((analytics: boolean) => {
    const next = writeConsent(analytics)
    setConsent(next)
    setSettingsOpen(false)
  }, [])

  const showBanner = consent === null && !settingsOpen

  return (
    <>
      {/* Optional telemetry: only mount after explicit opt-in */}
      {consent?.analytics ? (
        <>
          <Analytics />
          <SpeedInsights />
        </>
      ) : null}

      {/* Banner (first visit) */}
      {showBanner ? (
        <div className="fixed inset-x-0 bottom-24 z-[160] px-4">
          <div
            className={cn(
              'mx-auto max-w-2xl rounded-3xl border border-white/10 bg-void-950/75 p-4 shadow-[0_10px_40px_rgba(0,0,0,0.55)] backdrop-blur-xl',
              'sm:p-5',
            )}
            role="region"
            aria-label="Datenschutzhinweis"
          >
            <p className="text-[11px] uppercase tracking-[0.22em] text-vellum-200/60">Datenschutz</p>
            <p className="mt-3 text-sm leading-relaxed text-vellum-200/85">
              Wir verwenden technisch notwendige Speicher, damit die Seite zuverlässig funktioniert. Optional kannst du
              Statistik (Vercel Analytics &amp; Speed Insights) erlauben, um Nutzung und Performance zu verbessern. Mehr
              Infos in der{' '}
              <Link
                href="/datenschutz"
                className="text-vellum-50 underline underline-offset-4 decoration-white/25 hover:decoration-white/40"
              >
                Datenschutzerklärung
              </Link>
              .
            </p>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
              <button
                type="button"
                onClick={() => decide(false)}
                className={cn(
                  'inline-flex items-center justify-center rounded-full border border-white/10 bg-transparent px-5 py-2.5 text-sm font-medium text-vellum-200/85',
                  'transition hover:border-white/15 hover:bg-white/[0.03] hover:text-vellum-50',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunbronze/50 focus-visible:ring-offset-2 focus-visible:ring-offset-void-950',
                )}
              >
                Nur notwendig
              </button>

              <button
                type="button"
                onClick={() => setSettingsOpen(true)}
                className={cn(
                  'inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-vellum-50/90',
                  'transition hover:border-white/15 hover:bg-white/[0.06] hover:text-vellum-50',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunbronze/50 focus-visible:ring-offset-2 focus-visible:ring-offset-void-950',
                )}
              >
                Einstellungen
              </button>

              <button
                type="button"
                onClick={() => decide(true)}
                className={cn(
                  'inline-flex items-center justify-center rounded-full border border-sunbronze/30 bg-sunbronze/10 px-5 py-2.5 text-sm font-semibold text-sunbronze',
                  'transition hover:border-sunbronze/45 hover:bg-sunbronze/15 hover:text-vellum-50',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunbronze/50 focus-visible:ring-offset-2 focus-visible:ring-offset-void-950',
                )}
              >
                Alle akzeptieren
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* Settings dialog */}
      {settingsOpen ? (
        <RemoveScroll>
          <div className="fixed inset-0 z-[210] flex items-end justify-center px-4 pb-6 sm:items-center sm:pb-0">
            <button
              type="button"
              aria-label="Schließen"
              className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
              onClick={() => setSettingsOpen(false)}
            />

            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="eva-privacy-settings-title"
              aria-describedby="eva-privacy-settings-desc"
              className={cn(
                'relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10',
                'bg-void-950/75 text-vellum-50 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_40px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl',
              )}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_20%_10%,rgba(186,138,45,0.16),transparent_55%),radial-gradient(800px_circle_at_80%_30%,rgba(153,67,36,0.12),transparent_60%)]" />

              <div className="relative p-6 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-vellum-200/65">Auswahl</p>
                    <h2 id="eva-privacy-settings-title" className="mt-2 font-display text-xl tracking-[-0.02em]">
                      Datenschutzeinstellungen
                    </h2>
                  </div>

                  <button
                    ref={closeButtonRef}
                    type="button"
                    className={cn(
                      'inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]',
                      'text-vellum-200/75 transition hover:border-white/15 hover:bg-white/[0.06] hover:text-vellum-50',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunbronze/50 focus-visible:ring-offset-2 focus-visible:ring-offset-void-950',
                    )}
                    onClick={() => setSettingsOpen(false)}
                    aria-label="Schließen"
                  >
                    <X className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                </div>

                <p id="eva-privacy-settings-desc" className="mt-4 text-sm leading-relaxed text-vellum-200/85">
                  Du kannst deine Einwilligung jederzeit mit Wirkung für die Zukunft ändern oder widerrufen.
                </p>

                <div className="mt-5 space-y-3">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                    <p className="text-sm font-semibold text-vellum-50">Technisch notwendig</p>
                    <p className="mt-1 text-xs leading-relaxed text-vellum-200/70">
                      Immer aktiv. Wird für den sicheren Betrieb der Seite benötigt.
                    </p>
                  </div>

                  <label className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                    <input
                      type="checkbox"
                      checked={draftAnalytics}
                      onChange={(e) => setDraftAnalytics(e.target.checked)}
                      className="mt-1 h-4 w-4 accent-sunbronze"
                    />
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-vellum-50">
                        Statistik (Vercel Analytics &amp; Speed Insights)
                      </span>
                      <span className="mt-1 block text-xs leading-relaxed text-vellum-200/70">
                        Optional. Hilft uns, Nutzung und Performance zu verstehen und zu verbessern.
                      </span>
                    </span>
                  </label>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                  <button
                    type="button"
                    onClick={() => setSettingsOpen(false)}
                    className={cn(
                      'inline-flex items-center justify-center rounded-full border border-white/10 bg-transparent px-5 py-2.5 text-sm font-medium text-vellum-200/85',
                      'transition hover:border-white/15 hover:bg-white/[0.03] hover:text-vellum-50',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunbronze/50 focus-visible:ring-offset-2 focus-visible:ring-offset-void-950',
                    )}
                  >
                    Abbrechen
                  </button>

                  <button
                    type="button"
                    onClick={() => decide(draftAnalytics)}
                    className={cn(
                      'inline-flex items-center justify-center rounded-full border border-sunbronze/30 bg-sunbronze/10 px-5 py-2.5 text-sm font-semibold text-sunbronze',
                      'transition hover:border-sunbronze/45 hover:bg-sunbronze/15 hover:text-vellum-50',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunbronze/50 focus-visible:ring-offset-2 focus-visible:ring-offset-void-950',
                    )}
                  >
                    Speichern
                  </button>
                </div>

                {consent?.analytics ? (
                  <button
                    type="button"
                    onClick={() => decide(false)}
                    className={cn(
                      'mt-4 inline-flex text-xs text-vellum-200/70 underline underline-offset-4 decoration-white/20',
                      'transition hover:text-vellum-50 hover:decoration-white/40',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunbronze/50 focus-visible:ring-offset-2 focus-visible:ring-offset-void-950',
                    )}
                  >
                    Statistik deaktivieren (Widerruf)
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </RemoveScroll>
      ) : null}
    </>
  )
}

