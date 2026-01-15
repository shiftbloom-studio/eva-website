'use client'


import { Section, SectionHeader } from '#components/ui/section'
import { testimonials } from '#data/testimonials-arda'
import { cn } from '#lib/cn'

export function TestimonialsSection() {
  return (
    <Section id="stimmen" className="pb-28 pt-6">
      <SectionHeader
        eyebrow="Stimmen"
        title="Auszüge aus Leben, Blut und Bannern."
        subtitle="Keine Rezensionen. Keine Sterne. Nur Fragmente aus Tagebüchern, Briefen und Lagerfeuern – erzählt von denen, die Arda bereits geprägt hat."
      />

      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
        {testimonials.map((t) => (
          <article
            key={t.id}
            className={cn(
              'relative overflow-hidden rounded-4xl border border-white/10 bg-void-900/35 p-6 backdrop-blur-md',
              'transition hover:border-white/15 hover:bg-void-900/45',
            )}
          >
            {(() => {
              const [first, ...rest] = t.story
              return (
                <>
                  <div className="text-[11px] uppercase tracking-[0.22em] text-vellum-200/60">{t.from}</div>

                  {/* Keep the quote as the first <p> inside the card to make E2E assertions deterministic. */}
                  <p className="mt-4 text-sm leading-relaxed text-vellum-200/85 font-serif">{`“${first}”`}</p>

                  <h3 className="mt-4 font-display text-xl tracking-[-0.02em] text-vellum-50">{t.name}</h3>
                  <p className="mt-1 text-xs text-vellum-200/60">{t.role}</p>

                  {rest.length ? (
                    <div className="mt-4 space-y-3 text-sm leading-relaxed text-vellum-200/85 font-serif">
                      {rest.map((p, idx) => (
                        <p key={`${t.id}-${idx + 1}`}>{p}</p>
                      ))}
                    </div>
                  ) : null}

                  <div className="mt-6 border-t border-white/10 pt-4">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-vellum-200/60">Unterzeichnet</p>
                    <p className="mt-2 font-display text-sm tracking-[-0.01em] text-vellum-50">{t.name}</p>
                    <p className="mt-1 text-xs text-vellum-200/60">{t.role}</p>
                  </div>
                </>
              )
            })()}
          </article>
        ))}
      </div>
    </Section>
  )
}
