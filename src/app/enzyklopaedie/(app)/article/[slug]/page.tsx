import Link from 'next/link'
import { notFound } from 'next/navigation'

import { KnowledgeBadge } from '../../../_components/KnowledgeBadge'
import { getCategoryDef } from '../../../_lib/content/categories'
import { getEncyclopediaIndex, resolveWikilinkTargetToSlug } from '../../../_lib/content'
import { slugify } from '../../../_lib/content/slug'
import { renderEncyclopediaMdx } from '../../../_lib/mdx/render'

const WIKILINK_RE = /^\s*\[\[([^\]|]+?)(?:\|([^\]]+?))?\]\]\s*$/

function parseWikilink(raw: string): { target: string; label: string } | null {
  const m = raw.match(WIKILINK_RE)
  if (!m) return null
  const target = String(m[1] ?? '').trim()
  if (!target) return null
  const label = String(m[2] ?? target).trim() || target
  return { target, label }
}

export default async function EncyclopediaArticlePage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params

  const index = await getEncyclopediaIndex()
  const article = index.bySlug.get(slugify(slug)) ?? null
  if (!article) notFound()

  const content = await renderEncyclopediaMdx(article.content, { wikilinkMap: index.wikilinkMap })

  const category = getCategoryDef(article.category)

  const related = article.related
    .map((raw) => {
      const parsed = parseWikilink(raw) ?? { target: raw, label: raw }
      const resolvedSlug = resolveWikilinkTargetToSlug(parsed.target, index.wikilinkMap)
      const resolved = index.bySlug.get(resolvedSlug) ?? null
      const href = `/enzyklopaedie/article/${resolvedSlug}`
      const label = resolved?.title ?? parsed.label
      return { href, label, exists: Boolean(resolved) }
    })
    .filter((r) => r.label.trim().length > 0)

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
          <li>
            <Link
              href={`/enzyklopaedie/kategorie/${article.category}`}
              className="underline underline-offset-4 decoration-white/20 transition hover:text-vellum-50 hover:decoration-white/40"
            >
              {category.label}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-vellum-200/80">{article.title}</li>
        </ol>
      </nav>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <header className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-xs uppercase tracking-[0.22em] text-vellum-200/60">{category.label}</p>
              <KnowledgeBadge type={article.knowledgeType} />
            </div>

            <h1 className="mt-3 font-display text-3xl tracking-[-0.02em] text-vellum-50 sm:text-4xl">
              {article.title}
            </h1>

            {article.tags.length ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/enzyklopaedie/kategorie/${article.category}?tag=${encodeURIComponent(tag)}`}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-vellum-200/75 transition hover:border-sunbronze/25 hover:text-vellum-50"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            ) : null}
          </header>

          {/* Mobile related */}
          {related.length ? (
            <details className="mt-8 rounded-4xl border border-white/10 bg-void-900/35 p-6 backdrop-blur-md lg:hidden">
              <summary className="cursor-pointer select-none text-sm font-medium text-vellum-50/90">
                Verwandte Einträge <span className="text-vellum-200/60">({related.length})</span>
              </summary>
              <div className="mt-4 space-y-2">
                {related.map((r) => (
                  <Link
                    key={`${r.href}:${r.label}`}
                    href={r.href}
                    className="block rounded-3xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-vellum-200/80 transition hover:border-sunbronze/25 hover:text-vellum-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunbronze/50 focus-visible:ring-offset-2 focus-visible:ring-offset-void-950"
                  >
                    {r.label}
                  </Link>
                ))}
              </div>
            </details>
          ) : null}

          <article className="mt-10 max-w-3xl">{content}</article>

          <div className="mt-12">
            <Link
              href={`/enzyklopaedie/kategorie/${article.category}`}
              className="inline-flex items-center gap-2 text-xs font-medium text-sunbronze underline underline-offset-4 decoration-sunbronze/30 transition hover:text-vellum-50 hover:decoration-vellum-50/30"
            >
              ← Zurück zu {category.label}
            </Link>
          </div>
        </div>

        <aside className="hidden lg:col-span-4 lg:block">
          <div className="sticky top-24 rounded-4xl border border-white/10 bg-void-900/35 p-6 backdrop-blur-md">
            <p className="text-xs uppercase tracking-[0.22em] text-vellum-200/60">Verwandt</p>
            <h2 className="mt-2 font-display text-xl tracking-[-0.02em] text-vellum-50">Spuren & Verweise</h2>

            {related.length ? (
              <div className="mt-5 space-y-2">
                {related.slice(0, 12).map((r) => (
                  <Link
                    key={`${r.href}:${r.label}`}
                    href={r.href}
                    className="block rounded-3xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-vellum-200/80 transition hover:border-sunbronze/25 hover:text-vellum-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunbronze/50 focus-visible:ring-offset-2 focus-visible:ring-offset-void-950"
                  >
                    {r.label}
                  </Link>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm leading-relaxed text-vellum-200/70">Keine verwandten Einträge.</p>
            )}
          </div>
        </aside>
      </div>
    </main>
  )
}
