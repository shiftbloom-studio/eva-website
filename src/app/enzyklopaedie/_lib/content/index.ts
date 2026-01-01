import { loadLocalEncyclopediaIndex } from './local'
import { normalizeLookupKey, slugify } from './slug'
import type { ArticleRecord, CategoryId, EncyclopediaIndex } from './types'
import { loadSupabaseArticles } from './supabase'

function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
  )
}

function buildIndexFromArticles(articles: ArticleRecord[]): EncyclopediaIndex {
  const sorted = [...articles].sort((a, b) => a.title.localeCompare(b.title, 'de'))

  const bySlug = new Map<string, ArticleRecord>()
  const wikilinkMap = new Map<string, string>()
  const tagCounts = new Map<string, number>()

  for (const article of sorted) {
    bySlug.set(article.slug, article)

    wikilinkMap.set(normalizeLookupKey(article.slug), article.slug)
    wikilinkMap.set(normalizeLookupKey(article.title), article.slug)
    for (const alias of article.aliases) {
      wikilinkMap.set(normalizeLookupKey(alias), article.slug)
    }

    for (const tag of article.tags) {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1)
    }
  }

  return {
    articles: sorted,
    bySlug,
    wikilinkMap,
    tags: tagCounts,
  }
}

export async function getEncyclopediaIndex(): Promise<EncyclopediaIndex> {
  const local = await loadLocalEncyclopediaIndex()
  if (!isSupabaseConfigured()) return local

  let remote: ArticleRecord[] = []
  try {
    remote = await loadSupabaseArticles()
  } catch {
    // If Supabase is temporarily unavailable, fall back to local content.
    return local
  }

  const prefer = process.env.NODE_ENV === 'production' ? 'supabase' : 'local'
  const mergedBySlug = new Map<string, ArticleRecord>()

  if (prefer === 'supabase') {
    for (const article of remote) mergedBySlug.set(article.slug, article)
    for (const article of local.articles) {
      if (!mergedBySlug.has(article.slug)) mergedBySlug.set(article.slug, article)
    }
  } else {
    for (const article of local.articles) mergedBySlug.set(article.slug, article)
    for (const article of remote) {
      if (!mergedBySlug.has(article.slug)) mergedBySlug.set(article.slug, article)
    }
  }

  return buildIndexFromArticles(Array.from(mergedBySlug.values()))
}

export async function getArticleBySlug(slug: string): Promise<ArticleRecord | null> {
  const index = await getEncyclopediaIndex()
  return index.bySlug.get(slugify(slug)) ?? null
}

export function resolveWikilinkTargetToSlug(target: string, wikilinkMap: Map<string, string>): string {
  return wikilinkMap.get(normalizeLookupKey(target)) ?? slugify(target)
}

function includesCI(haystack: string, needle: string): boolean {
  return haystack.toLowerCase().includes(needle)
}

export function listArticlesFromIndex(
  index: EncyclopediaIndex,
  params?: {
    q?: string
    tags?: string[]
    category?: CategoryId
  },
): ArticleRecord[] {
  const q = params?.q?.trim().toLowerCase() ?? ''
  const tags = (params?.tags ?? []).map((t) => t.trim().replace(/^#/, '').toLowerCase()).filter(Boolean)
  const category = params?.category

  return index.articles.filter((a) => {
    if (category && a.category !== category) return false
    if (tags.length && !tags.every((t) => a.tags.includes(t))) return false

    if (!q) return true

    if (includesCI(a.title, q)) return true
    if (a.aliases.some((alias) => includesCI(alias, q))) return true
    if (a.tags.some((tag) => tag.includes(q))) return true
    if (includesCI(a.excerpt, q)) return true
    if (includesCI(a.content, q)) return true
    return false
  })
}

export async function listArticles(params?: {
  q?: string
  tags?: string[]
  category?: CategoryId
}): Promise<ArticleRecord[]> {
  const index = await getEncyclopediaIndex()
  return listArticlesFromIndex(index, params)
}
