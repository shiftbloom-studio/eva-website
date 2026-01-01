import Link from 'next/link'
import { notFound } from 'next/navigation'

import { ArticleCardGrid } from '../../../_components/ArticleCardGrid'
import { SearchBar } from '../../../_components/SearchBar'
import { TagCloud } from '../../../_components/TagCloud'
import { CATEGORY_DEFS, getCategoryDef } from '../../../_lib/content/categories'
import { getEncyclopediaIndex, listArticlesFromIndex } from '../../../_lib/content'
import type { CategoryId } from '../../../_lib/content/types'

const CATEGORY_IDS = new Set(CATEGORY_DEFS.map((c) => c.id))

function isCategoryId(value: string): value is CategoryId {
  return CATEGORY_IDS.has(value as CategoryId)
}

export default async function EncyclopediaCategoryPage(props: {
  params: Promise<{ category: string }>
  searchParams?: Promise<{ q?: string; tag?: string }>
}) {
  const { category: rawCategory } = await props.params
  if (!isCategoryId(rawCategory)) notFound()

  const searchParams = await props.searchParams
  const q = searchParams?.q?.trim() ?? ''
  const tag = searchParams?.tag?.trim().replace(/^#/, '').toLowerCase() ?? ''

  const category = rawCategory as CategoryId
  const def = getCategoryDef(category)

  const index = await getEncyclopediaIndex()
  const allInCategory = index.articles.filter((a) => a.category === category)

  const tagCounts = new Map<string, number>()
  for (const a of allInCategory) {
    for (const t of a.tags) tagCounts.set(t, (tagCounts.get(t) ?? 0) + 1)
  }
  const tags = Array.from(tagCounts.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'de'))
    .slice(0, 24)
    .map(([t, count]) => ({ tag: t, count }))

  const results = listArticlesFromIndex(index, { category, q, tags: tag ? [tag] : [] })
  const cards = results.map((a) => ({
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    tags: a.tags,
    category: def.label,
    knowledgeType: a.knowledgeType,
  }))

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <nav aria-label="Breadcrumb" className="text-xs text-vellum-200/60">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <li>
            <Link
              href="/enzyklopaedie"
              className="underline underline-offset-4 decoration-white/20 transition hover:text-vellum-50 hover:decoration-white/40"
            >
              Enzyklopädie
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-vellum-200/80">{def.label}</li>
        </ol>
      </nav>

      <header className="mt-8 max-w-2xl">
        <p className="text-xs uppercase tracking-[0.22em] text-vellum-200/60">{allInCategory.length} Einträge</p>
        <h1 className="mt-3 font-display text-3xl tracking-[-0.02em] text-vellum-50 sm:text-4xl">{def.label}</h1>
        <p className="mt-4 text-sm leading-relaxed text-vellum-200/80 sm:text-base">{def.description}</p>

        <div className="mt-7">
          <SearchBar placeholder={`Suchen in ${def.label}…`} />
        </div>
      </header>

      <section className="mt-10">
        <p className="text-xs uppercase tracking-[0.22em] text-vellum-200/60">Tags</p>
        <h2 className="mt-2 font-display text-2xl tracking-[-0.02em] text-vellum-50">Filtern</h2>
        <div className="mt-5">
          <TagCloud basePath={`/enzyklopaedie/kategorie/${category}`} tags={tags} selectedTag={tag} q={q} />
        </div>
      </section>

      <section className="mt-12">
        <p className="text-xs uppercase tracking-[0.22em] text-vellum-200/60">
          {q || tag ? `${cards.length} Treffer` : 'Alle'}
        </p>
        <h2 className="mt-2 font-display text-2xl tracking-[-0.02em] text-vellum-50">
          {q || tag ? 'Ergebnisse' : 'Einträge'}
        </h2>

        <div className="mt-6">
          {cards.length ? (
            <ArticleCardGrid items={cards} />
          ) : (
            <div className="rounded-4xl border border-white/10 bg-void-900/35 p-6 text-sm text-vellum-200/80 backdrop-blur-md">
              Keine Treffer. Versuche einen anderen Begriff oder entferne den Tag-Filter.
            </div>
          )}
        </div>

        <div className="mt-12">
          <Link
            href="/enzyklopaedie"
            className="inline-flex items-center gap-2 text-xs font-medium text-sunbronze underline underline-offset-4 decoration-sunbronze/30 transition hover:text-vellum-50 hover:decoration-vellum-50/30"
          >
            ← Zurück zum Hub
          </Link>
        </div>
      </section>
    </main>
  )
}
