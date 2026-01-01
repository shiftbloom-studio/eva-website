'use client'

import * as React from 'react'
import { Clock } from 'lucide-react'
import Image from 'next/image'

import { useCake } from '#components/birthday-cake'
import faq from '#data/faq'
import { legal } from '#data/legal'
import { systems } from '#data/systems'
import { testimonials } from '#data/testimonials-arda'
import { cn } from '#lib/cn'
import { marketingImages } from '#lib/marketing-images'

const MarketingHomeEnhanced = React.lazy(async () => {
  const mod = await import('./marketing-home-enhanced')
  return { default: mod.MarketingHomeEnhanced }
})

function FeatureTag(props: { children: React.ReactNode; testId?: string }) {
  return (
    <span
      data-testid={props.testId}
      className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-vellum-200/70"
    >
      {props.children}
    </span>
  )
}

function MarketingHomeBase() {
  const [openSystemId, setOpenSystemId] = React.useState<(typeof systems)[number]['id'] | null>('wirtschaft')
  const [openFaq, setOpenFaq] = React.useState<string | null>(faq.items[0]?.question ?? null)

  return (
    <>
      {/* HERO (base) */}
      <section className="relative isolate min-h-[92svh] overflow-hidden">
        {/* Base hero image (loads early even before rich layer chunks arrive) */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#2d2e3a_0%,#07060a_100%)]" />
          <div className="absolute inset-0">
            <Image
              src={marketingImages.heroWide}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 2560px"
              priority
              placeholder="blur"
              quality={86}
              className="object-cover object-[70%_0%] opacity-85 grayscale-[8%] sepia-[12%] sm:object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-void-950/15 via-void-950/30 to-void-950 sm:from-void-950/10 sm:via-void-950/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-void-950/50 via-transparent to-void-950/50" />
          </div>
        </div>
        {/* Readability overlay: darkens bottom-left, fades to fully transparent top-right */}
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-tr from-void-950/55 via-void-950/18 to-transparent"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto flex min-h-[92svh] max-w-7xl flex-col justify-center px-5 pb-16 pt-20 sm:px-6 sm:pb-24 sm:pt-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-sunbronze/30 bg-sunbronze/10 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-sunbronze backdrop-blur-md">
              Die Welt ist im Wandel
            </div>

            <h1 className="mt-8 font-display text-display-md tracking-[-0.02em] text-vellum-50 lg:text-display-lg">
              Schatten
              <br />
              über Arda
            </h1>

            <p className="mt-8 max-w-2xl text-balance text-lg leading-relaxed text-vellum-200/90 font-serif tracking-wide sm:text-xl">
              Wo alte Banner im Wind zerfallen, wachsen neue Legenden. Schmiede dein Schicksal in den Feuern des Krieges
              oder im Flüstern der Höfe.
              <span className="text-sunbronze/90"> Dein Wort ist das einzige Gesetz, das zählt.</span>
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:mt-12 sm:flex-row sm:items-center">
              <a
                href={legal.discordUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Noch nicht veröffentlicht – geplant für Q3 2026"
                className={cn(
                  'inline-flex w-full items-center justify-between rounded-full border border-sunbronze/30 bg-sunbronze/10 px-5 py-2.5 text-sm font-medium text-sunbronze backdrop-blur transition',
                  'hover:border-sunbronze/50 hover:bg-sunbronze/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunbronze/50 focus-visible:ring-offset-2 focus-visible:ring-offset-void-950',
                  'sm:w-auto sm:justify-center sm:px-6 sm:py-3',
                )}
              >
                <span className="flex flex-col items-start leading-tight">
                  <span className="text-sm font-semibold uppercase tracking-[0.18em] max-[360px]:normal-case max-[360px]:text-[0.85rem] max-[360px]:tracking-[0.06em] sm:hidden">
                    Q3 2026 <span className="opacity-70">– Release geplant</span>
                  </span>
                  <span className="hidden flex-col items-start leading-tight sm:flex">
                    <span className="text-xs font-bold uppercase tracking-[0.22em]">Q3 2026</span>
                    <span className="mt-0.5 text-[0.7rem] uppercase tracking-[0.22em] opacity-75">Release geplant</span>
                  </span>
                </span>
                <Clock className="h-4 w-4 opacity-80" strokeWidth={1.5} />
              </a>

              <a
                href="#bento"
                className="inline-flex w-full items-center justify-center rounded-full border border-white/10 bg-transparent px-5 py-2.5 text-sm font-medium text-vellum-50/90 transition hover:border-white/20 hover:bg-white/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunbronze/50 focus-visible:ring-offset-2 focus-visible:ring-offset-void-950 sm:w-auto sm:px-6 sm:py-3"
              >
                Lore entdecken
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-3 text-xs text-vellum-200/65">
              <FeatureTag>RP-first</FeatureTag>
              <FeatureTag testId="feature-whitelist">Whitelist</FeatureTag>
              <FeatureTag>Events &amp; Intrigen</FeatureTag>
              <FeatureTag>Atmosphärisch • Premium</FeatureTag>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center" aria-hidden="true">
          <div className="rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-vellum-200/70 backdrop-blur">
            Scroll
          </div>
        </div>
      </section>

      {/* BENTO (base) */}
      <section id="bento" className="relative mx-auto max-w-7xl scroll-mt-28 px-6 pb-28 pt-10">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl tracking-[-0.02em] text-vellum-50 sm:text-4xl">Der Pfad in die Legende</h2>
          <p className="mt-4 text-sm leading-relaxed text-vellum-200/80 sm:text-base font-serif">
            Hinter den Mauern warten Intrigen, Handel und das Klirren von Stahl. Wähle deinen Einstieg in eine Welt, die
            niemals vergisst.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
          <article
            id="status"
            className="rounded-4xl border border-white/10 bg-void-900/30 p-6 backdrop-blur-md md:col-span-7"
          >
            <p className="text-xs uppercase tracking-[0.18em] text-vellum-200/60">Server Status</p>
            <h3 className="mt-2 font-display text-xl tracking-[-0.02em] text-vellum-50">Die Schmiede des Schicksals</h3>
            <p className="mt-3 text-sm leading-relaxed text-vellum-200/80">
              Die Welt erwacht. Wir schmieden die Gesetze, härten den Stahl und bereiten den Boden für die ersten großen
              Häuser.
            </p>
            <p className="mt-4 text-xs text-vellum-200/60">Whitelist offen • RP-Eröffnung geplant: Q3 2026</p>
          </article>

          <article id="lore" className="rounded-4xl border border-white/10 bg-void-900/30 p-6 backdrop-blur-md md:col-span-5">
            <p className="text-xs uppercase tracking-[0.18em] text-vellum-200/60">Lore &amp; Geschichte</p>
            <h3 className="mt-2 font-display text-xl tracking-[-0.02em] text-vellum-50">Chroniken der Alten Welt</h3>
            <p className="mt-3 text-sm leading-relaxed text-vellum-200/80">
              Von den Nebeln des Nordens bis zu den goldenen Feldern des Südens – jede Region atmet Geschichte.
            </p>
          </article>

          <a
            href={legal.discordUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'block rounded-4xl border border-white/10 bg-void-900/30 p-6 backdrop-blur-md md:col-span-12',
              'transition hover:border-sunbronze/30 hover:bg-void-900/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunbronze/50 focus-visible:ring-offset-2 focus-visible:ring-offset-void-950',
            )}
          >
            <p className="text-xs uppercase tracking-[0.18em] text-vellum-200/60">Gemeinschaft</p>
            <h3 className="mt-2 font-display text-xl tracking-[-0.02em] text-vellum-50">Die Halle der Gefährten</h3>
            <p className="mt-3 text-sm leading-relaxed text-vellum-200/80">
              Tritt dem Rat bei. News, Roadmap, Regeln, Bewerbung (Whitelist) und Support – alles im Discord.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-sunbronze">
              Discord beitreten <span aria-hidden="true">→</span>
            </div>
          </a>
        </div>
      </section>

      {/* SYSTEMS (base; JS-light, no motion) */}
      <section id="systeme" className="relative mx-auto max-w-7xl scroll-mt-28 px-6 pb-28 pt-6">
        <div className="max-w-3xl">
          <p className="text-[11px] uppercase tracking-[0.22em] text-vellum-200/60">Systeme</p>
          <h2 className="mt-3 font-display text-3xl tracking-[-0.02em] text-vellum-50 sm:text-4xl">
            Gebaut für Legenden, nicht für Listen.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-vellum-200/80 sm:text-base font-serif">
            Drei Säulen treiben die Welt: Wirtschaft, Diplomatie, Krieg. Doch darunter liegt das eigentliche Fundament:
            Rollenspiel.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
          {systems.map((item) => {
            const isOpen = openSystemId === item.id
            const detail = item.detail ?? item.description
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setOpenSystemId((prev) => (prev === item.id ? null : item.id))}
                className={cn(
                  'group relative isolate flex h-full w-full flex-col overflow-hidden rounded-4xl border border-white/10 bg-void-900/35 p-6 text-left backdrop-blur-md',
                  'transition hover:border-sunbronze/30 hover:bg-void-900/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunbronze/50 focus-visible:ring-offset-2 focus-visible:ring-offset-void-950',
                  item.id === 'wirtschaft' ? 'md:col-span-7' : 'md:col-span-5',
                )}
                aria-expanded={isOpen}
              >
                <p className="text-xs uppercase tracking-[0.22em] text-vellum-200/60">{item.eyebrow}</p>
                <h3 className="mt-2 font-display text-xl tracking-[-0.02em] text-vellum-50">{item.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-vellum-200/80">{item.description}</p>

                {isOpen ? (
                  <div className="mt-4 border-t border-white/10 pt-4 text-sm leading-relaxed text-vellum-200/75">
                    {detail}
                  </div>
                ) : null}

                <div className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-sunbronze">
                  {isOpen ? 'Weniger' : 'Mehr'} <span aria-hidden="true">→</span>
                </div>
              </button>
            )
          })}
        </div>
      </section>

      {/* TESTIMONIALS (base) */}
      <section id="stimmen" className="relative mx-auto max-w-7xl scroll-mt-28 px-6 pb-28 pt-6">
        <div className="max-w-3xl">
          <p className="text-[11px] uppercase tracking-[0.22em] text-vellum-200/60">Stimmen</p>
          <h2 className="mt-3 font-display text-3xl tracking-[-0.02em] text-vellum-50 sm:text-4xl">
            Auszüge aus Leben, Blut und Bannern.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-vellum-200/80 sm:text-base font-serif">
            Keine Rezensionen. Keine Sterne. Nur Fragmente aus Tagebüchern, Briefen und Lagerfeuern – erzählt von denen,
            die Arda bereits geprägt hat.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {testimonials.map((t) => (
            <article
              key={t.id}
              className={cn(
                'relative overflow-hidden rounded-4xl border border-white/10 bg-void-900/35 p-6 backdrop-blur-md',
                'transition hover:border-white/15 hover:bg-void-900/45',
              )}
            >
              <p className="text-[11px] uppercase tracking-[0.22em] text-vellum-200/60">{t.from}</p>
              <h3 className="mt-3 font-display text-xl tracking-[-0.02em] text-vellum-50">{t.name}</h3>
              <p className="mt-1 text-xs text-vellum-200/60">{t.role}</p>

              <div className="mt-4 space-y-3 text-sm leading-relaxed text-vellum-200/85 font-serif">
                {t.story.map((p, idx) => (
                  <p key={`${t.id}-${idx}`}>{p}</p>
                ))}
              </div>
              <div className="mt-6 border-t border-white/10 pt-4">
                <p className="text-[11px] uppercase tracking-[0.22em] text-vellum-200/60">Unterzeichnet</p>
                <p className="mt-2 font-display text-sm tracking-[-0.01em] text-vellum-50">{t.name}</p>
                <p className="mt-1 text-xs text-vellum-200/60">{t.role}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* FAQ (base; JS-light, no motion) */}
      <section id="faq" className="relative mx-auto max-w-7xl scroll-mt-28 px-6 pb-28 pt-6">
        <div className="max-w-3xl">
          <p className="text-[11px] uppercase tracking-[0.22em] text-vellum-200/60">FAQ</p>
          <h2 className="mt-3 font-display text-3xl tracking-[-0.02em] text-vellum-50 sm:text-4xl">{faq.title}</h2>
          <p className="mt-4 text-sm leading-relaxed text-vellum-200/80 sm:text-base font-serif">
            Kurz, klar – und wenn du mehr willst: Discord.
          </p>
        </div>

        <div className="mt-10 divide-y divide-white/10 overflow-hidden rounded-4xl border border-white/10 bg-void-900/30 backdrop-blur-md">
          {faq.items.map((item) => {
            const isOpen = openFaq === item.question
            return (
              <div key={item.question} className="group">
                <button
                  type="button"
                  onClick={() => setOpenFaq((prev) => (prev === item.question ? null : item.question))}
                  className={cn(
                    'flex w-full items-center justify-between gap-4 px-6 py-5 text-left',
                    'transition hover:bg-white/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunbronze/50 focus-visible:ring-offset-2 focus-visible:ring-offset-void-950',
                  )}
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-base tracking-[-0.01em] text-vellum-50">{item.question}</span>
                  <span className={cn('h-5 w-5 flex-none text-vellum-200/60 transition', isOpen ? 'rotate-180 text-sunbronze' : '')}>
                    ▾
                  </span>
                </button>
                {isOpen ? <div className="px-6 pb-6 text-sm leading-relaxed text-vellum-200/80">{item.answer}</div> : null}
              </div>
            )
          })}
        </div>
      </section>

      {/* CTA (base) */}
      <section id="cta" className="relative mx-auto max-w-7xl scroll-mt-28 px-6 pb-28 pt-6">
        <div className="relative overflow-hidden rounded-4xl border border-sunbronze/25 bg-gradient-to-b from-sunbronze/10 via-white/[0.02] to-transparent p-8 backdrop-blur-md sm:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_20%_10%,rgba(186,138,45,0.22),transparent_55%),radial-gradient(800px_circle_at_80%_30%,rgba(153,67,36,0.18),transparent_60%)]" />
          <div className="relative">
            <p className="text-xs uppercase tracking-[0.22em] text-vellum-200/70">Whitelist &amp; Einstieg</p>
            <h2 className="mt-6 max-w-2xl font-display text-3xl tracking-[-0.02em] text-vellum-50 sm:text-4xl">
              Nimm deinen Platz am Feuer ein.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-vellum-200/80 sm:text-base">
              Komm in den Discord, lies dich ein – und sichere dir einen Platz auf der Whitelist. Eröffnung geplant: Q3
              2026.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href={legal.discordUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-vellum-50 backdrop-blur transition hover:border-sunbronze/40 hover:shadow-glow-bronze focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunbronze/50 focus-visible:ring-offset-2 focus-visible:ring-offset-void-950 sm:w-auto sm:px-6 sm:py-3"
              >
                Discord beitreten <span aria-hidden="true">→</span>
              </a>
              <a
                href="#faq"
                className="inline-flex w-full items-center justify-center rounded-full border border-white/10 bg-transparent px-5 py-2.5 text-sm font-medium text-vellum-50/90 transition hover:border-white/20 hover:bg-white/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunbronze/50 focus-visible:ring-offset-2 focus-visible:ring-offset-void-950 sm:w-auto sm:px-6 sm:py-3"
              >
                Erst die Regeln lesen
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export function MarketingHomeCake() {
  const { profile } = useCake()

  const wantsEnhanced = profile.tier === 'rich' || profile.tier === 'ultra'

  if (!wantsEnhanced) return <MarketingHomeBase />

  return (
    <React.Suspense fallback={<MarketingHomeBase />}>
      <MarketingHomeEnhanced />
    </React.Suspense>
  )
}
