import type { Metadata } from 'next'
import Link from 'next/link'

import { legal } from '#data/legal'

export const metadata: Metadata = {
  title: `Impressum | ${legal.siteName}`,
  description: 'Anbieterkennzeichnung und rechtliche Hinweise.',
  robots: { index: true, follow: true },
}

export default function ImpressumPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 pb-28 pt-28">
      <h1 className="font-display text-3xl tracking-[-0.02em] text-vellum-50 sm:text-4xl">Impressum</h1>
      <p className="mt-3 text-sm text-vellum-200/70">Stand: {legal.lastUpdated}</p>

      <div className="mt-10 space-y-10 text-sm leading-relaxed text-vellum-200/85">
        <section aria-labelledby="impressum-anbieter">
          <h2 id="impressum-anbieter" className="font-display text-xl text-vellum-50">
            Anbieterkennzeichnung
          </h2>
          <p className="mt-3">
            Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG) (vormals § 5 TMG):
          </p>
          <div className="mt-3 rounded-3xl border border-white/10 bg-void-900/30 p-5 backdrop-blur">
            <p className="font-semibold text-vellum-50">{legal.operator.name}</p>
            <p className="mt-1 whitespace-pre-line">{legal.operator.address}</p>
            <p className="mt-3">
              E-Mail: <span className="font-medium text-vellum-50">{legal.operator.email}</span>
            </p>
          </div>
          <p className="mt-3 text-xs text-vellum-200/60">
            Hinweis: Bitte ersetze die Platzhalter oben vor dem Livegang durch deine echten Angaben.
          </p>
        </section>

        <section aria-labelledby="impressum-inhaltlich">
          <h2 id="impressum-inhaltlich" className="font-display text-xl text-vellum-50">
            Verantwortlich für den Inhalt
          </h2>
          <p className="mt-3">
            Verantwortlich i.S.d. § 18 Abs. 2 MStV (sofern einschlägig):
          </p>
          <div className="mt-3 rounded-3xl border border-white/10 bg-void-900/30 p-5 backdrop-blur">
            <p className="font-semibold text-vellum-50">{legal.contentResponsible.name}</p>
            <p className="mt-1 whitespace-pre-line">{legal.contentResponsible.address}</p>
          </div>
        </section>

        <section aria-labelledby="impressum-fanprojekt">
          <h2 id="impressum-fanprojekt" className="font-display text-xl text-vellum-50">
            Fanprojekt / Markenhinweis
          </h2>
          <p className="mt-3">
            {legal.siteName} ist ein inoffizielles, nicht-kommerzielles Fanprojekt und steht in keiner Verbindung zu
            TaleWorlds Entertainment oder anderen Rechteinhabern. Alle genannten Marken, Produktnamen, Logos und
            Kennzeichen sind Eigentum der jeweiligen Rechteinhaber. Die Nennung erfolgt ausschließlich zu
            Identifikations- und Referenzzwecken.
          </p>
        </section>

        <section aria-labelledby="impressum-haftung">
          <h2 id="impressum-haftung" className="font-display text-xl text-vellum-50">
            Haftungsausschluss
          </h2>

          <h3 className="mt-4 font-semibold text-vellum-50">Haftung für Inhalte</h3>
          <p className="mt-2">
            Wir erstellen die Inhalte dieser Website mit größter Sorgfalt. Für die Richtigkeit, Vollständigkeit und
            Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
          </p>

          <h3 className="mt-4 font-semibold text-vellum-50">Haftung für Links</h3>
          <p className="mt-2">
            Diese Website enthält Links zu externen Websites Dritter (z. B. Discord). Auf deren Inhalte haben wir keinen
            Einfluss. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber verantwortlich.
            Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
          </p>

          <h3 className="mt-4 font-semibold text-vellum-50">Urheberrecht</h3>
          <p className="mt-2">
            Inhalte und Werke auf dieser Website unterliegen dem Urheberrecht. Soweit Inhalte nicht von uns erstellt wurden,
            werden die Urheberrechte Dritter beachtet. Solltest du dennoch auf eine Urheberrechtsverletzung aufmerksam werden,
            bitten wir um einen Hinweis — wir werden entsprechende Inhalte nach Prüfung entfernen oder kenntlich machen.
          </p>
        </section>

        <section aria-labelledby="impressum-datenschutz-link">
          <h2 id="impressum-datenschutz-link" className="font-display text-xl text-vellum-50">
            Datenschutz
          </h2>
          <p className="mt-3">
            Informationen zur Verarbeitung personenbezogener Daten findest du in unserer{' '}
            <Link
              href="/datenschutz"
              className="text-vellum-50 underline underline-offset-4 decoration-white/25 hover:decoration-white/40"
            >
              Datenschutzerklärung
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  )
}

