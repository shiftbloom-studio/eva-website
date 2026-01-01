import type { Metadata } from 'next'
import Link from 'next/link'

import { legal } from '#data/legal'

export const metadata: Metadata = {
  title: `Datenschutz | ${legal.siteName}`,
  description: 'Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO.',
  robots: { index: true, follow: true },
}

export default function DatenschutzPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 pb-28 pt-28">
      <h1 className="font-display text-3xl tracking-[-0.02em] text-vellum-50 sm:text-4xl">Datenschutzerklärung</h1>
      <p className="mt-3 text-sm text-vellum-200/70">Stand: {legal.lastUpdated}</p>

      <div className="mt-10 space-y-10 text-sm leading-relaxed text-vellum-200/85">
        <section aria-labelledby="ds-overview">
          <h2 id="ds-overview" className="font-display text-xl text-vellum-50">
            Überblick
          </h2>
          <p className="mt-3">
            Diese Datenschutzerklärung informiert dich darüber, welche personenbezogenen Daten bei der Nutzung dieser Website
            verarbeitet werden und welche Rechte dir nach der Datenschutz-Grundverordnung (DSGVO) zustehen.
          </p>
          <p className="mt-3">
            Kurzfassung: Diese Website hat keine Kontaktformulare und kein Login. Es werden nur technisch notwendige Daten für
            den Betrieb verarbeitet (z. B. Server-Logfiles). Statistik/Performance-Messung (Vercel Analytics &amp; Speed Insights)
            wird nur nach deiner Einwilligung aktiviert.
          </p>
        </section>

        <section aria-labelledby="ds-controller">
          <h2 id="ds-controller" className="font-display text-xl text-vellum-50">
            Verantwortlicher
          </h2>
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

        <section aria-labelledby="ds-legalbasis">
          <h2 id="ds-legalbasis" className="font-display text-xl text-vellum-50">
            Rechtsgrundlagen (Auszug)
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>
              <span className="font-semibold text-vellum-50">Art. 6 Abs. 1 lit. f DSGVO</span>: berechtigtes Interesse an sicherem
              Betrieb, Stabilität, Fehleranalyse und Abwehr von Missbrauch (Server-Logfiles).
            </li>
            <li>
              <span className="font-semibold text-vellum-50">Art. 6 Abs. 1 lit. a DSGVO</span>: Einwilligung für optionale
              Statistik-/Performance-Messung (Vercel Analytics &amp; Speed Insights). Einwilligung ist jederzeit widerrufbar.
            </li>
            <li>
              <span className="font-semibold text-vellum-50">§ 25 TTDSG / TDDDG</span>: soweit für das Speichern/Auslesen von
              Informationen auf deinem Endgerät (z. B. LocalStorage) eine Einwilligung erforderlich ist, holen wir diese über
              die Datenschutzeinstellungen ein bzw. speichern nur technisch Notwendiges.
            </li>
          </ul>
        </section>

        <section aria-labelledby="ds-hosting">
          <h2 id="ds-hosting" className="font-display text-xl text-vellum-50">
            Server-Logfiles / Hosting
          </h2>
          <p className="mt-3">
            Beim Aufruf dieser Website verarbeitet der Hosting-Anbieter technisch notwendige Verbindungsdaten (Server-Logfiles),
            um die Website auszuliefern und zu schützen. Dabei können u. a. verarbeitet werden:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>IP-Adresse (ggf. gekürzt/anonymisiert abhängig vom Anbieter)</li>
            <li>Datum und Uhrzeit des Zugriffs</li>
            <li>aufgerufene Seite/Datei</li>
            <li>Referrer-URL</li>
            <li>Browser/Device-Informationen (User-Agent)</li>
          </ul>
          <p className="mt-3">
            Die Verarbeitung erfolgt zur Sicherstellung des Betriebs, zur Fehleranalyse sowie zur Abwehr von Angriffen.
            Logdaten werden nur so lange gespeichert, wie dies für die genannten Zwecke erforderlich ist, und anschließend gelöscht
            oder anonymisiert (abhängig vom Hosting-Anbieter).
          </p>
        </section>

        <section aria-labelledby="ds-localstorage">
          <h2 id="ds-localstorage" className="font-display text-xl text-vellum-50">
            Cookies / LocalStorage
          </h2>
          <p className="mt-3">
            Diese Website verwendet keine Marketing-Cookies. Für Einstellungen können jedoch Informationen lokal im Browser gespeichert
            werden (LocalStorage). Dazu gehören z. B.:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>
              <span className="font-semibold text-vellum-50">Datenschutzeinstellungen</span> (ob Statistik aktiviert ist)
            </li>
            <li>
              <span className="font-semibold text-vellum-50">Audio</span> (nur wenn du Audio aktivierst): Einwilligung, aktiv/aus,
              Lautstärke, stumm.
            </li>
          </ul>
          <p className="mt-3">
            Du kannst diese Informationen jederzeit über deine Browser-Einstellungen löschen. Statistik kannst du außerdem über{' '}
            <span className="font-medium text-vellum-50">Datenschutz-Einstellungen</span> in der Fußzeile deaktivieren.
          </p>
        </section>

        <section aria-labelledby="ds-analytics">
          <h2 id="ds-analytics" className="font-display text-xl text-vellum-50">
            Statistik &amp; Performance (optional)
          </h2>
          <p className="mt-3">
            Wenn du einwilligst, nutzen wir <span className="font-semibold text-vellum-50">Vercel Analytics</span> und{' '}
            <span className="font-semibold text-vellum-50">Vercel Speed Insights</span>, um aggregierte Nutzungs- und Performance-Daten
            auszuwerten (z. B. welche Seiten aufgerufen werden, Ladezeiten, Geräte-/Browser-Kategorien). Die Einwilligung ist freiwillig
            und kann jederzeit mit Wirkung für die Zukunft widerrufen werden.
          </p>
          <p className="mt-3">
            Anbieter: Vercel Inc. (weitere Informationen: {' '}
            <a
              href={legal.thirdParty.vercelPrivacyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-vellum-50 underline underline-offset-4 decoration-white/25 hover:decoration-white/40"
            >
              Datenschutzhinweise von Vercel
            </a>
            ).
          </p>
          <p className="mt-3">
            Hinweis: Je nach Anbieter-Setup kann eine Verarbeitung auch in Drittländern (z. B. USA) stattfinden. In diesem Fall stützt
            sich die Übermittlung auf geeignete Garantien (z. B. Standardvertragsklauseln) und/oder Angemessenheitsbeschlüsse — siehe die
            Informationen des Anbieters.
          </p>
        </section>

        <section aria-labelledby="ds-discord">
          <h2 id="ds-discord" className="font-display text-xl text-vellum-50">
            Externe Links (Discord)
          </h2>
          <p className="mt-3">
            Diese Website verlinkt auf Discord. Erst wenn du den Link anklickst, werden Daten (z. B. IP-Adresse) an Discord übermittelt.
            Für die Verarbeitung dort ist Discord verantwortlich (siehe{' '}
            <a
              href={legal.thirdParty.discordPrivacyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-vellum-50 underline underline-offset-4 decoration-white/25 hover:decoration-white/40"
            >
              Datenschutzerklärung von Discord
            </a>
            ).
          </p>
          <p className="mt-3">
            Discord kann Daten auch außerhalb der EU/des EWR verarbeiten. Details und Garantien findest du in den Datenschutzhinweisen von
            Discord.
          </p>
        </section>

        <section aria-labelledby="ds-rights">
          <h2 id="ds-rights" className="font-display text-xl text-vellum-50">
            Deine Rechte
          </h2>
          <p className="mt-3">Du hast — je nach gesetzlicher Voraussetzung — folgende Rechte:</p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>Auskunft (Art. 15 DSGVO)</li>
            <li>Berichtigung (Art. 16 DSGVO)</li>
            <li>Löschung (Art. 17 DSGVO)</li>
            <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
            <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
            <li>Widerspruch gegen Verarbeitung auf Basis berechtigter Interessen (Art. 21 DSGVO)</li>
            <li>Widerruf einer Einwilligung (Art. 7 Abs. 3 DSGVO)</li>
          </ul>
          <p className="mt-3">
            Außerdem hast du das Recht, dich bei einer Datenschutz-Aufsichtsbehörde zu beschweren (Art. 77 DSGVO). Zuständig ist in der
            Regel die Aufsichtsbehörde deines Bundeslandes bzw. die für den Verantwortlichen zuständige Behörde.
          </p>
        </section>

        <section aria-labelledby="ds-security">
          <h2 id="ds-security" className="font-display text-xl text-vellum-50">
            Datensicherheit
          </h2>
          <p className="mt-3">
            Wir treffen angemessene technische und organisatorische Maßnahmen, um Daten gegen Verlust, Manipulation und unbefugten Zugriff
            zu schützen. Dazu gehören insbesondere Transportverschlüsselung (HTTPS/TLS) und ein datensparsamer Betrieb (nur erforderliche
            Daten).
          </p>
        </section>

        <section aria-labelledby="ds-links">
          <h2 id="ds-links" className="font-display text-xl text-vellum-50">
            Weitere Informationen
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
              href="/barrierefreiheit"
              className="text-vellum-50 underline underline-offset-4 decoration-white/25 hover:decoration-white/40"
            >
              Barrierefreiheit
            </Link>
          </p>
        </section>
      </div>
    </div>
  )
}

