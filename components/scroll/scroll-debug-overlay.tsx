'use client'

import { useLenis } from 'lenis/react'
import * as React from 'react'

import { cn } from '#lib/cn'

type ActiveSection = { id: string; ratio: number } | null

function readDebugEnabled() {
  try {
    const url = new URL(window.location.href)
    const fromQuery =
      url.searchParams.get('debugScroll') === '1' ||
      url.searchParams.get('debugScroll') === 'true' ||
      url.searchParams.has('debugScroll')

    const fromStorage = window.localStorage.getItem('eva_debug_scroll') === '1'
    return fromQuery || fromStorage
  } catch {
    return false
  }
}

function setDebugEnabled(next: boolean) {
  try {
    window.localStorage.setItem('eva_debug_scroll', next ? '1' : '0')
  } catch {
    // ignore
  }
}

export function ScrollDebugOverlay() {
  const [enabled, setEnabled] = React.useState(false)
  const [scrollY, setScrollY] = React.useState(0)
  const [velocity, setVelocity] = React.useState(0)
  const [progress, setProgress] = React.useState(0)
  const [direction, setDirection] = React.useState<1 | -1 | 0>(0)
  const [isScrolling, setIsScrolling] = React.useState(false)
  const [activeSection, setActiveSection] = React.useState<ActiveSection>(null)

  // Keep a stable value for the Lenis callback without re-registering too often.
  const enabledRef = React.useRef(enabled)
  React.useEffect(() => {
    enabledRef.current = enabled
  }, [enabled])

  useLenis((lenis) => {
    if (!enabledRef.current) return
    setScrollY(Math.round(lenis.scroll ?? 0))
    setVelocity(Math.round((lenis.velocity ?? 0) * 10) / 10)
    setProgress(Math.round((lenis.progress ?? 0) * 1000) / 10)
    setDirection(lenis.direction ?? 0)
    setIsScrolling(Boolean(lenis.isScrolling))
  })

  React.useEffect(() => {
    const initial = readDebugEnabled()
    setEnabled(initial)
  }, [])

  React.useEffect(() => {
    const root = document.documentElement
    if (enabled) {
      root.dataset.evaDebug = '1'
    } else {
      delete root.dataset.evaDebug
    }
    setDebugEnabled(enabled)
  }, [enabled])

  // Keyboard toggle: Ctrl+Shift+D
  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!(e.ctrlKey && e.shiftKey && (e.key === 'D' || e.key === 'd'))) return
      e.preventDefault()
      setEnabled((prev) => !prev)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  // Track the "current chapter" section (for verifying reveal timing).
  React.useEffect(() => {
    if (!enabled) return

    const sections = Array.from(document.querySelectorAll('main section[id]')) as HTMLElement[]
    if (sections.length === 0) return

    const ratios = new Map<string, number>()
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).id
          if (!id) continue
          if (entry.isIntersecting) ratios.set(id, entry.intersectionRatio)
          else ratios.delete(id)
        }

        const candidates = Array.from(ratios.entries())
        if (candidates.length === 0) {
          setActiveSection(null)
          return
        }
        const [bestId, bestRatio] = candidates.reduce<[string, number]>(
          (best, next) => (next[1] > best[1] ? next : best),
          candidates[0],
        )
        setActiveSection({ id: bestId, ratio: Math.round(bestRatio * 100) })
      },
      { threshold: [0, 0.2, 0.35, 0.5, 0.65, 0.8], rootMargin: '-15% 0px -45% 0px' },
    )

    for (const s of sections) io.observe(s)
    return () => io.disconnect()
  }, [enabled])

  if (!enabled) return null

  return (
    <div
      className={cn(
        'fixed bottom-4 left-4 z-[999] max-w-[92vw] rounded-2xl border border-white/10 bg-void-950/75 px-4 py-3',
        'text-[11px] leading-tight text-vellum-200/80 backdrop-blur-md',
      )}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="font-mono">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>
              y <span className="text-vellum-50">{scrollY}</span>
            </span>
            <span>
              v <span className="text-vellum-50">{velocity}</span>
            </span>
            <span>
              p <span className="text-vellum-50">{progress}%</span>
            </span>
            <span>
              dir <span className="text-vellum-50">{direction}</span>
            </span>
            <span>
              scrolling <span className="text-vellum-50">{isScrolling ? 'yes' : 'no'}</span>
            </span>
          </div>
          <div className="mt-1 opacity-80">
            section{' '}
            <span className="text-vellum-50">
              {activeSection ? `${activeSection.id} (${activeSection.ratio}%)` : '—'}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setEnabled(false)}
          className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-vellum-50/90 transition hover:border-white/20 hover:bg-white/[0.06]"
        >
          close
        </button>
      </div>

      <div className="mt-2 text-[10px] opacity-70">
        Toggle: <span className="font-mono">Ctrl</span>+<span className="font-mono">Shift</span>+
        <span className="font-mono">D</span>
      </div>
    </div>
  )
}
