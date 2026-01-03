import Link from 'next/link'

import { SearchBar } from '../../_components/SearchBar'
import { getCategoryDef } from '../../_lib/content/categories'
import { getEncyclopediaIndex, listArticlesFromIndex } from '../../_lib/content'
import { requireEncyclopediaUser } from '../../_lib/supabase/require-user'

export default async function EncyclopediaEditorIndexPage(props: {
  searchParams?: Promise<{ q?: string }>
}) {
  await requireEncyclopediaUser('/enzyklopaedie/editor')

  const searchParams = await props.searchParams
  const q = searchParams?.q?.trim() ?? ''

  const index = await getEncyclopediaIndex()
  const results = listArticlesFromIndex(index, { q })

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <header className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.22em] text-vellum-200/60">Editor</p>
          <h1 className="mt-3 font-display text-3xl tracking-[-0.02em] text-vellum-50 sm:text-4xl">
            Einträge verwalten
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-vellum-200/80 sm:text-base">
            Suche, öffne und bearbeite Artikel. Änderungen werden in Supabase gespeichert.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href="/enzyklopaedie/editor/new"
            className="inline-flex items-center justify-center rounded-full border border-sunbronze/30 bg-sunbronze/10 px-5 py-2.5 text-sm font-medium text-sunbronze transition hover:border-sunbronze/50 hover:bg-sunbronze/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunbronze/50 focus-visible:ring-offset-2 focus-visible:ring-offset-void-950"
          >
            Neuer Eintrag →
          </Link>
        </div>
      </header>

      <div className="mt-8">
        <SearchBar placeholder="Im Editor suchen…" autoFocus={false} />
      </div>

      <section className="mt-10">
        <p className="text-xs uppercase tracking-[0.22em] text-vellum-200/60">
          {q ? `${results.length} Treffer` : `${results.length} Einträge`}
        </p>

        <div className="mt-4 space-y-3">
          {results.map((a) => {
            const category = getCategoryDef(a.category)
            const sourceLabel = a.source === 'local' ? 'Local' : 'Supabase'
            const sourceClass =
              a.source === 'local'
                ? 'border-sunbronze/25 bg-sunbronze/10 text-sunbronze'
                : 'border-moss-300/20 bg-moss-900/20 text-moss-200'

            return (
              <Link
                key={a.slug}
                href={`/enzyklopaedie/editor/${a.slug}`}
                className="group block rounded-4xl border border-white/10 bg-void-900/35 p-5 backdrop-blur-md transition hover:border-sunbronze/30 hover:bg-void-900/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunbronze/50 focus-visible:ring-offset-2 focus-visible:ring-offset-void-950"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-[0.22em] text-vellum-200/60">{category.label}</p>
                    <h3 className="mt-2 truncate font-display text-xl tracking-[-0.02em] text-vellum-50">
                      {a.title}
                    </h3>
                    <p className="mt-2 truncate text-[11px] text-vellum-200/50">
                      <span className="font-mono">/{a.slug}</span>
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium ${sourceClass}`}>
                      {sourceLabel}
                    </span>
                  </div>
                </div>

                {a.tags.length ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {a.tags.slice(0, 8).map((tag) => (
                      <span
                        key={`${a.slug}:${tag}`}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-vellum-200/75"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                ) : null}

                <div className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-sunbronze">
                  Bearbeiten <span aria-hidden="true">→</span>
                </div>
              </Link>
            )
          })}

          {!results.length ? (
            <div className="rounded-4xl border border-white/10 bg-void-900/35 p-6 text-sm text-vellum-200/80 backdrop-blur-md">
              Keine Treffer. Versuche einen anderen Begriff.
            </div>
          ) : null}
        </div>
      </section>
    </main>
  )
}
