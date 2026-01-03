import Link from 'next/link'

import { ArticleCardGrid } from '../_components/ArticleCardGrid'
import { CategoryGrid } from '../_components/CategoryGrid'
import { SearchBar } from '../_components/SearchBar'
import { TagCloud } from '../_components/TagCloud'
import { CATEGORY_DEFS, getCategoryDef } from '../_lib/content/categories'
import { getEncyclopediaIndex, listArticlesFromIndex } from '../_lib/content'
import { getOptionalEncyclopediaUser } from '../_lib/supabase/optional-user'

export default async function EncyclopediaHubPage(props: {
  searchParams?: Promise<{ q?: string; tag?: string }>
}) {
  const searchParams = await props.searchParams
  const q = searchParams?.q?.trim() ?? ''
  const tag = searchParams?.tag?.trim().replace(/^#/, '').toLowerCase() ?? ''

  const index = await getEncyclopediaIndex()
  const canEdit = Boolean(await getOptionalEncyclopediaUser())

  const hasFilters = Boolean(q || tag)
  const results = listArticlesFromIndex(index, { q, tags: tag ? [tag] : [] })

  const categoryCards = CATEGORY_DEFS.map((c) => ({
    id: c.id,
    label: c.label,
    description: c.description,
    count: index.articles.filter((a) => a.category === c.id).length,
  })).filter((c) => c.count > 0)

  const tagEntries = Array.from(index.tags.entries())
    .filter(([t]) => !['index', 'hub', 'encyclopedia'].includes(t))
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'de'))
    .slice(0, 24)
    .map(([t, count]) => ({ tag: t, count }))

  const featuredSlugs = ['arathor', 'vael-tirin', 'eldric-varn', 'the-argent-wardens', 'starforged-oathring', 'mirror-of-keth']
  const featured = featuredSlugs
    .map((slug) => index.bySlug.get(slug))
    .filter(Boolean)
    .slice(0, 6)
    .map((a) => ({
      slug: a!.slug,
      title: a!.title,
      excerpt: a!.excerpt,
      tags: a!.tags,
      category: getCategoryDef(a!.category).label,
      knowledgeType: a!.knowledgeType,
    }))

  const cards = (hasFilters ? results : results.slice(0, 12)).map((a) => ({
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    tags: a.tags,
    category: getCategoryDef(a.category).label,
    knowledgeType: a.knowledgeType,
  }))

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <header className="max-w-2xl">
        <p className="text-xs uppercase tracking-[0.22em] text-vellum-200/60">Enzyklopädie</p>
        <h1 className="mt-3 font-display text-3xl tracking-[-0.02em] text-vellum-50 sm:text-4xl">
          Ein Buch aus Asche, Salz und Schwur.
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-vellum-200/80 sm:text-base">
          Durchsuche Einträge, filtere nach Tags und folge Wikilinks wie Fäden im Dunkel.
        </p>

        <div className="mt-7">
          <SearchBar />
        </div>

        {canEdit ? (
          <div className="mt-5">
            <Link
              href="/enzyklopaedie/editor/new"
              className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-medium text-vellum-50/90 transition hover:border-sunbronze/40 hover:shadow-glow-bronze focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunbronze/50 focus-visible:ring-offset-2 focus-visible:ring-offset-void-950"
            >
              Neuer Eintrag →
            </Link>
          </div>
        ) : null}

        {tag ? (
          <div className="mt-4 text-xs text-vellum-200/70">
            Filter aktiv: <span className="font-medium text-vellum-50/90">#{tag}</span>{' '}
            <Link
              href={q ? `/enzyklopaedie?q=${encodeURIComponent(q)}` : '/enzyklopaedie'}
              className="ml-2 underline underline-offset-4 decoration-white/20 transition hover:text-vellum-50 hover:decoration-white/40"
            >
              Zurücksetzen
            </Link>
          </div>
        ) : null}
      </header>

      <section className="mt-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-vellum-200/60">Kategorien</p>
            <h2 className="mt-2 font-display text-2xl tracking-[-0.02em] text-vellum-50">Wähle ein Kapitel</h2>
          </div>
          <Link
            href="/enzyklopaedie/article/index"
            className="hidden rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-medium text-vellum-50/90 transition hover:border-sunbronze/40 hover:shadow-glow-bronze sm:inline-flex"
          >
            Inhaltsverzeichnis →
          </Link>
        </div>

        <div className="mt-6">
          <CategoryGrid items={categoryCards} />
        </div>
      </section>

      <section className="mt-12">
        <p className="text-xs uppercase tracking-[0.22em] text-vellum-200/60">Tags</p>
        <h2 className="mt-2 font-display text-2xl tracking-[-0.02em] text-vellum-50">Spuren im Text</h2>
        <p className="mt-3 text-sm leading-relaxed text-vellum-200/75">
          Tippe auf einen Tag, um die Einträge einzugrenzen.
        </p>
        <div className="mt-5">
          <TagCloud basePath="/enzyklopaedie" tags={tagEntries} selectedTag={tag} q={q} />
        </div>
      </section>

      <section className="mt-12">
        <p className="text-xs uppercase tracking-[0.22em] text-vellum-200/60">
          {hasFilters ? `${cards.length} Treffer` : 'Ausgewählt'}
        </p>
        <h2 className="mt-2 font-display text-2xl tracking-[-0.02em] text-vellum-50">
          {hasFilters ? 'Suchergebnisse' : 'Empfohlene Einträge'}
        </h2>

        <div className="mt-6">
          {hasFilters ? (
            cards.length ? (
              <ArticleCardGrid items={cards} />
            ) : (
              <div className="rounded-4xl border border-white/10 bg-void-900/35 p-6 text-sm text-vellum-200/80 backdrop-blur-md">
                Keine Treffer. Versuche einen anderen Begriff oder entferne den Tag-Filter.
              </div>
            )
          ) : (
            <ArticleCardGrid items={featured} />
          )}
        </div>
      </section>
    </main>
  )
}
