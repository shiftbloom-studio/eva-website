'use client'

import { AlertTriangle, BookOpen, Eye, Info, Save } from 'lucide-react'
import Link from 'next/link'
import * as React from 'react'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import { cn } from '#lib/cn'

import { saveEncyclopediaArticle } from '../_actions/articles'
import { CATEGORY_DEFS } from '../_lib/content/categories'
import { slugify } from '../_lib/content/slug'
import type { CategoryId, KnowledgeType } from '../_lib/content/types'
import { remarkEncyclopediaWikilinks } from '../_lib/mdx/remark-wikilinks'

function joinList(values: string[] | undefined): string {
  return (values ?? []).join(', ')
}

function toCategoryId(value: string): CategoryId {
  for (let i = 0; i < CATEGORY_DEFS.length; i += 1) {
    const c = CATEGORY_DEFS[i]!
    if (c.id === value) return c.id
  }
  return 'misc'
}

function toKnowledgeType(value: string): KnowledgeType {
  const v = value.trim().toLowerCase()
  if (v === 'ic' || v === 'ooc' || v === 'mixed') return v
  return 'mixed'
}

function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = React.useState(value)

  React.useEffect(() => {
    const id = window.setTimeout(() => setDebounced(value), delayMs)
    return () => window.clearTimeout(id)
  }, [delayMs, value])

  return debounced
}

type PreviewCalloutType = 'info' | 'warning' | 'lore'

function hastText(node: any): string {
  if (!node) return ''
  if (node.type === 'text') return String(node.value ?? '')
  const children = Array.isArray(node.children) ? node.children : []
  let out = ''
  for (let i = 0; i < children.length; i += 1) out += hastText(children[i])
  return out
}

function PreviewCallout(props: { type: PreviewCalloutType; title?: string; children?: React.ReactNode }) {
  const meta =
    props.type === 'warning'
      ? {
          label: 'Warnung',
          Icon: AlertTriangle,
          container: 'border-bloodstone/30 bg-bloodstone/12',
          iconWrap: 'border-bloodstone/25 bg-white/[0.03]',
          iconColor: 'text-bloodstone',
        }
      : props.type === 'lore'
        ? {
            label: 'Lore',
            Icon: BookOpen,
            container: 'border-moss-300/20 bg-moss-900/20',
            iconWrap: 'border-moss-300/20 bg-white/[0.03]',
            iconColor: 'text-moss-200',
          }
        : {
            label: 'Info',
            Icon: Info,
            container: 'border-sunbronze/25 bg-sunbronze/10',
            iconWrap: 'border-sunbronze/25 bg-white/[0.03]',
            iconColor: 'text-sunbronze',
          }

  const Icon = meta.Icon

  return (
    <section
      className={cn(
        'my-6 rounded-4xl border p-5 backdrop-blur-md sm:p-6',
        'shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_16px_60px_rgba(0,0,0,0.35)]',
        meta.container,
      )}
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            'mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border',
            meta.iconWrap,
          )}
        >
          <Icon className={cn('h-5 w-5', meta.iconColor)} strokeWidth={1.25} />
        </div>

        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-vellum-200/70">
            {props.title || meta.label}
          </p>
          <div className="mt-3 space-y-3 text-sm leading-relaxed text-vellum-200/80">{props.children}</div>
        </div>
      </div>
    </section>
  )
}

export interface ArticleEditorDefaults {
  slug?: string
  title?: string
  category?: CategoryId
  knowledgeType?: KnowledgeType
  tags?: string[]
  aliases?: string[]
  related?: string[]
  content?: string
  source?: 'local' | 'supabase' | 'new'
}

export interface ArticleEditorProps {
  nextPath: string
  defaults?: ArticleEditorDefaults
  error?: string
  wikilinkMapEntries?: Array<[string, string]>
}

export function ArticleEditor({ nextPath, defaults, error, wikilinkMapEntries }: ArticleEditorProps) {
  const isNew = (defaults?.source ?? 'new') === 'new'

  const [slug, setSlug] = React.useState(defaults?.slug ?? '')
  const [title, setTitle] = React.useState(defaults?.title ?? '')
  const [category, setCategory] = React.useState<CategoryId>(defaults?.category ?? 'misc')
  const [knowledgeType, setKnowledgeType] = React.useState<KnowledgeType>(defaults?.knowledgeType ?? 'mixed')
  const [tags, setTags] = React.useState(joinList(defaults?.tags))
  const [aliases, setAliases] = React.useState(joinList(defaults?.aliases))
  const [related, setRelated] = React.useState(joinList(defaults?.related))
  const [content, setContent] = React.useState(defaults?.content ?? '')
  const previewSource = useDebouncedValue(content, 120)

  const wikilinkMap = React.useMemo(() => new Map(wikilinkMapEntries ?? []), [wikilinkMapEntries])
  const remarkPlugins = React.useMemo(
    () => [
      remarkGfm,
      [
        remarkEncyclopediaWikilinks,
        {
          resolveHref(target: string) {
            const key = slugify(target)
            const resolved = wikilinkMap.get(key) ?? key
            return `/enzyklopaedie/article/${resolved}`
          },
        },
      ],
    ],
    [wikilinkMap],
  )

  const formRef = React.useRef<HTMLFormElement | null>(null)

  // Nice UX: Ctrl/Cmd+S saves.
  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const isSave = (e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')
      if (!isSave) return
      e.preventDefault()
      formRef.current?.requestSubmit()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  // For new entries, auto-suggest the slug from the title (until the user types a custom slug).
  const [slugTouched, setSlugTouched] = React.useState(false)
  React.useEffect(() => {
    if (!isNew) return
    if (slugTouched) return
    const next = slugify(title)
    if (next && next !== slug) setSlug(next)
  }, [isNew, slug, slugTouched, title])

  const isLocalSource = defaults?.source === 'local'

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <header className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.22em] text-vellum-200/60">Editor</p>
        <h1 className="mt-3 font-display text-3xl tracking-[-0.02em] text-vellum-50 sm:text-4xl">
          {isNew ? 'Neuer Eintrag' : 'Eintrag bearbeiten'}
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-vellum-200/80 sm:text-base">
          Speichert nach Supabase (Tabelle <span className="font-mono text-[0.95em]">encyclopedia_articles</span>).
        </p>

        {isLocalSource ? (
          <div className="mt-6 rounded-4xl border border-sunbronze/25 bg-sunbronze/10 p-5 text-sm text-vellum-200/85">
            Hinweis: Dieser Eintrag stammt aktuell aus einem <span className="font-medium text-vellum-50/90">lokalen Markdown-File</span>.
            Deine Änderungen werden in Supabase gespeichert und sind in Production sichtbar (oder sobald das lokale File entfernt wird).
          </div>
        ) : null}

        {error ? (
          <div className="mt-6 rounded-4xl border border-bloodstone/30 bg-bloodstone/10 p-5 text-sm text-vellum-50/90">
            {error}
          </div>
        ) : null}
      </header>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <form
            ref={formRef}
            action={saveEncyclopediaArticle}
            className="rounded-4xl border border-white/10 bg-void-900/35 p-6 backdrop-blur-md"
          >
            <input type="hidden" name="next" value={nextPath} />

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-xs font-medium text-vellum-200/70" htmlFor="title">
                  Titel
                </label>
                <input
                  id="title"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-void-950/40 px-4 py-3 text-sm text-vellum-50 outline-none transition focus-visible:ring-2 focus-visible:ring-sunbronze/50 focus-visible:ring-offset-2 focus-visible:ring-offset-void-950"
                  placeholder="z.B. Eldric Varn"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-vellum-200/70" htmlFor="slug">
                  Slug
                </label>
                <input
                  id="slug"
                  name="slug"
                  value={slug}
                  onChange={(e) => {
                    setSlugTouched(true)
                    setSlug(slugify(e.target.value))
                  }}
                  required
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-void-950/40 px-4 py-3 text-sm text-vellum-50 outline-none transition focus-visible:ring-2 focus-visible:ring-sunbronze/50 focus-visible:ring-offset-2 focus-visible:ring-offset-void-950"
                  placeholder="eldric-varn"
                />
                <p className="mt-2 text-[11px] leading-relaxed text-vellum-200/50">
                  URL: <span className="font-mono">/enzyklopaedie/article/{slug || '...'}</span>
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-vellum-200/70" htmlFor="category">
                    Kategorie
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={category}
                    onChange={(e) => setCategory(toCategoryId(e.target.value))}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-void-950/40 px-4 py-3 text-sm text-vellum-50 outline-none transition focus-visible:ring-2 focus-visible:ring-sunbronze/50 focus-visible:ring-offset-2 focus-visible:ring-offset-void-950"
                  >
                    {CATEGORY_DEFS.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-vellum-200/70" htmlFor="knowledge_type">
                    Wissen
                  </label>
                  <select
                    id="knowledge_type"
                    name="knowledge_type"
                    value={knowledgeType}
                    onChange={(e) => setKnowledgeType(toKnowledgeType(e.target.value))}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-void-950/40 px-4 py-3 text-sm text-vellum-50 outline-none transition focus-visible:ring-2 focus-visible:ring-sunbronze/50 focus-visible:ring-offset-2 focus-visible:ring-offset-void-950"
                  >
                    <option value="ic">IC</option>
                    <option value="ooc">OOC</option>
                    <option value="mixed">IC/OOC</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-vellum-200/70" htmlFor="tags">
                  Tags
                </label>
                <input
                  id="tags"
                  name="tags"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-void-950/40 px-4 py-3 text-sm text-vellum-50 outline-none transition focus-visible:ring-2 focus-visible:ring-sunbronze/50 focus-visible:ring-offset-2 focus-visible:ring-offset-void-950"
                  placeholder="character, arathor, warden"
                />
                <p className="mt-2 text-[11px] leading-relaxed text-vellum-200/50">
                  Komma- oder Leerzeichen-getrennt. <span className="font-mono">#inline-tags</span> im Text werden zusätzlich erkannt.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-vellum-200/70" htmlFor="aliases">
                    Aliase
                  </label>
                  <input
                    id="aliases"
                    name="aliases"
                    value={aliases}
                    onChange={(e) => setAliases(e.target.value)}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-void-950/40 px-4 py-3 text-sm text-vellum-50 outline-none transition focus-visible:ring-2 focus-visible:ring-sunbronze/50 focus-visible:ring-offset-2 focus-visible:ring-offset-void-950"
                    placeholder="Eldric, Der Eidläufer"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-vellum-200/70" htmlFor="related">
                    Related
                  </label>
                  <input
                    id="related"
                    name="related"
                    value={related}
                    onChange={(e) => setRelated(e.target.value)}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-void-950/40 px-4 py-3 text-sm text-vellum-50 outline-none transition focus-visible:ring-2 focus-visible:ring-sunbronze/50 focus-visible:ring-offset-2 focus-visible:ring-offset-void-950"
                    placeholder="[[Arathor]], [[Vael Tirin]]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-vellum-200/70" htmlFor="content">
                  Inhalt (Markdown)
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  rows={18}
                  className={cn(
                    'mt-2 w-full resize-y rounded-3xl border border-white/10 bg-void-950/40 px-4 py-3',
                    'font-mono text-[12px] leading-relaxed text-vellum-50 outline-none transition',
                    'focus-visible:ring-2 focus-visible:ring-sunbronze/50 focus-visible:ring-offset-2 focus-visible:ring-offset-void-950',
                  )}
                  placeholder={'# Überschrift\n\nText…\n\n> [!info] Hinweis\n> Inhalt…\n\nWikilinks: [[Arathor]]'}
                />
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-sunbronze/30 bg-sunbronze/10 px-5 py-2.5 text-sm font-medium text-sunbronze transition hover:border-sunbronze/50 hover:bg-sunbronze/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunbronze/50 focus-visible:ring-offset-2 focus-visible:ring-offset-void-950"
                >
                  <Save className="h-4 w-4" strokeWidth={1.5} />
                  Speichern
                </button>
                <Link
                  href={slug ? `/enzyklopaedie/article/${slug}` : '/enzyklopaedie'}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-vellum-50/90 transition hover:border-white/20 hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sunbronze/50 focus-visible:ring-offset-2 focus-visible:ring-offset-void-950"
                >
                  Abbrechen
                </Link>
              </div>

              <div className="text-[11px] text-vellum-200/55">
                Tipp: <span className="font-mono">Ctrl/⌘ + S</span> speichert.
              </div>
            </div>
          </form>
        </div>

        <aside className="lg:col-span-6">
          <div className="rounded-4xl border border-white/10 bg-void-900/35 p-6 backdrop-blur-md lg:sticky lg:top-24">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-vellum-200/60">Vorschau</p>
                <h2 className="mt-2 font-display text-xl tracking-[-0.02em] text-vellum-50">Wie es aussieht</h2>
              </div>
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-sunbronze">
                <Eye className="h-5 w-5" strokeWidth={1.25} />
              </div>
            </div>

            <div className="mt-5">
              {previewSource.trim() ? (
                <ReactMarkdown
                  remarkPlugins={remarkPlugins as any}
                  components={{
                    a: ({ href, children, ...props }: any) => {
                      const url = typeof href === 'string' ? href : ''
                      const className =
                        'underline underline-offset-4 decoration-white/20 transition hover:text-vellum-50 hover:decoration-white/40'

                      if (url.startsWith('/')) {
                        return (
                          <Link href={url} className={className}>
                            {children}
                          </Link>
                        )
                      }

                      return (
                        <a {...props} href={url} className={className} target="_blank" rel="noopener noreferrer">
                          {children}
                        </a>
                      )
                    },
                    h1: ({ children }: any) => (
                      <h1 className="mt-10 font-display text-3xl tracking-[-0.02em] text-vellum-50 sm:text-4xl">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }: any) => (
                      <h2 className="mt-10 font-display text-2xl tracking-[-0.02em] text-vellum-50 sm:text-3xl">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }: any) => (
                      <h3 className="mt-8 font-display text-xl text-vellum-50">{children}</h3>
                    ),
                    p: ({ children }: any) => (
                      <p className="mt-4 text-sm leading-relaxed text-vellum-200/80 sm:text-base">{children}</p>
                    ),
                    ul: ({ children }: any) => (
                      <ul className="mt-4 list-disc space-y-2 pl-6 text-sm text-vellum-200/80 sm:text-base">{children}</ul>
                    ),
                    ol: ({ children }: any) => (
                      <ol className="mt-4 list-decimal space-y-2 pl-6 text-sm text-vellum-200/80 sm:text-base">{children}</ol>
                    ),
                    li: ({ children }: any) => <li className="leading-relaxed">{children}</li>,
                    hr: () => <hr className="my-8 border-white/10" />,
                    strong: ({ children }: any) => <strong className="font-semibold text-vellum-50/90">{children}</strong>,
                    code: ({ inline, children }: any) =>
                      inline ? (
                        <code className="rounded border border-white/10 bg-void-950/40 px-1.5 py-0.5 font-mono text-[0.9em] text-vellum-50/90">
                          {children}
                        </code>
                      ) : (
                        <code className="font-mono text-[0.95em] text-vellum-50/90">{children}</code>
                      ),
                    pre: ({ children }: any) => (
                      <pre className="my-6 overflow-x-auto rounded-3xl border border-white/10 bg-void-950/40 p-4 text-sm text-vellum-50/90">
                        {children}
                      </pre>
                    ),
                    blockquote: ({ node, children }: any) => {
                      const first = node?.children?.[0]
                      const firstIsP = first && first.type === 'element' && first.tagName === 'p'
                      const marker = firstIsP ? hastText(first).trim() : ''
                      const m = marker.match(/^\[!\s*([a-zA-Z]+)\s*\]\s*(.*)$/)

                      if (m) {
                        const rawType = String(m[1] ?? '').toLowerCase()
                        const type: PreviewCalloutType =
                          rawType === 'warning' ? 'warning' : rawType === 'lore' ? 'lore' : 'info'
                        const title = String(m[2] ?? '').trim()
                        const parts = React.Children.toArray(children).slice(1)
                        return <PreviewCallout type={type} title={title}>{parts}</PreviewCallout>
                      }

                      return (
                        <blockquote className="my-6 rounded-3xl border border-white/10 bg-white/[0.02] p-5 text-vellum-200/80">
                          {children}
                        </blockquote>
                      )
                    },
                  }}
                >
                  {previewSource}
                </ReactMarkdown>
              ) : (
                <p className="text-sm leading-relaxed text-vellum-200/60">
                  Tippe Inhalt links, um eine Vorschau zu sehen.
                </p>
              )}
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}
