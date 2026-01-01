import type { Metadata } from 'next'
import Link from 'next/link'

import { legal } from '#data/legal'

export const metadata: Metadata = {
  title: `Barrierefreiheit | ${legal.siteName}`,
  description: 'Informationen zur Barrierefreiheit dieser Website.',
  robots: { index: true, follow: true },
}

export default function BarrierefreiheitPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 pb-28 pt-28">
      <h1 className="font-display text-3xl tracking-[-0.02em] text-vellum-50 sm:text-4xl">Barrierefreiheit</h1>
      <p className="mt-3 text-sm text-vellum-200/70">Stand: {legal.lastUpdated}</p>

      <div className="mt-10 space-y-10 text-sm leading-relaxed text-vellum-200/85">
        <section aria-labelledby="bf-goal">
          <h2 id="bf-goal" className="font-display text-xl text-vellum-50">
            Unser Ziel
          </h2>
          <p className="mt-3">
            Wir möchten, dass diese Website für möglichst viele Menschen nutzbar ist — unabhängig von Gerät, Eingabemethode oder
            Einschränkungen. Wir orientieren uns an den Web Content Accessibility Guidelines (WCAG) und verbessern die Seite laufend.
          </p>
        </section>

        <section aria-labelledby="bf-features">
          <h2 id="bf-features" className="font-display text-xl text-vellum-50">
            Was wir bereits umsetzen (Auswahl)
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>Seitenstruktur mit Überschriften und Landmarken</li>
            <li>Tastatur-Navigation inkl. „Zum Inhalt springen“-Link</li>
            <li>Sichtbare Fokus-Stile (focus-visible)</li>
            <li>Respektiert „Bewegung reduzieren“ (reduced motion) in Animationen</li>
            <li>Optionales Audio nur nach aktiver Einwilligung (kein Autoplay)</li>
          </ul>
        </section>

        <section aria-labelledby="bf-limitations">
          <h2 id="bf-limitations" className="font-display text-xl text-vellum-50">
            Bekannte Einschränkungen
          </h2>
          <p className="mt-3">
            Je nach Gerät, Browser und assistiver Technologie kann es in Einzelfällen dennoch zu Bedienproblemen kommen (z. B. bei sehr
            komplexen Animationen oder Drittanbieter-Links). Wenn dir etwas auffällt, freuen wir uns über Feedback.
          </p>
        </section>

        <section aria-labelledby="bf-contact">
          <h2 id="bf-contact" className="font-display text-xl text-vellum-50">
            Feedback &amp; Kontakt
          </h2>
          <p className="mt-3">
            Wenn du Barrieren meldest (z. B. fehlende Beschriftungen, Kontrastprobleme, Tastatur-Blocker), gib bitte an, welche Seite du
            meinst und welches Gerät/Browser du nutzt.
          </p>
          <p className="mt-3">
            Kontakt: <span className="font-medium text-vellum-50">{legal.operator.email}</span>
          </p>
        </section>

        <section aria-labelledby="bf-links">
          <h2 id="bf-links" className="font-display text-xl text-vellum-50">
            Rechtliches
          </h2>
          <p className="mt-3">
            -{' '}
            <Link
              href="/impressum"
              className="text-vellum-50 underline underline-offset-4 decoration-white/25 hover:decoration-white/40"
            >
              Impressum
            </Link>
            <br />
            -{' '}
            <Link
              href="/datenschutz"
              className="text-vellum-50 underline underline-offset-4 decoration-white/25 hover:decoration-white/40"
            >
              Datenschutz
            </Link>
          </p>
        </section>
      </div>
    </div>
  )
}

